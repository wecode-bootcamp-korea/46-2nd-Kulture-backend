const appDataSource = require("./dataSource");
const CustomQueryBuilder = require("./queryBuilder");

const getEventList = async (
  categoryId,
  eventId,
  minPrice,
  maxPrice,
  ageRange,
  orderBy,
  limit,
  offset,
  countryId,
  eventStartDate,
  eventName
) => {
  try {
    let builder = new CustomQueryBuilder();
    builder
      .select(
        `
        e.id,
        ROUND(e.start_events_token, 0) as startToken,
        ROUND(e.highest_events_token, 0) as highestToken,
        e.name as eventName,
        DATE_FORMAT(e.event_start_date, '%Y%-%m-%d') as eventStartDate,
        e.location as locationName,
        e.remaining_quantity,
        e.thumbnail_images_url,
        c.name as categoryName,
        co.country as countryName,
        ar.age_group as ageRange
        `
      )
      .from(`events e`)
      .join(`INNER JOIN categories c ON e.category_id = c.id`)
      .join(`INNER JOIN countries co ON e.country_id = co.id`)
      .join(`LEFT JOIN age_ranges ar on e.age_range_id = ar.id `);

    if (eventId) {
      builder.where(`e.id = ${eventId}`);
    }
    if (categoryId) {
      builder.where(`c.id IN (${categoryId})`);
    }
    if (ageRange) {
      builder.where(`ar.id IN (${ageRange})`);
    }
    if (eventStartDate) {
      builder.whereDate("e.event_start_date", eventStartDate);
    }
    if (countryId) {
      builder.where(`e.country_id IN (${countryId})`);
    }
    if (eventName) {
      builder.whereLike("e.name", eventName);
    }

    if (minPrice && maxPrice) {
      builder.where(`e.start_events_token BETWEEN ${minPrice} AND ${maxPrice}`);
    } else if (minPrice) {
      builder.where(`e.start_events_token >= ${minPrice}`);
    } else if (maxPrice) {
      builder.where(`e.start_events_token <= ${maxPrice}`);
    }

    builder.orderBy(orderBy);

    builder.limit(limit, offset);

    const productQuery = builder.build();

    const products = await appDataSource.query(
      productQuery.query,
      productQuery.parameters
    );

    return products;
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_GET_DATA");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  getEventList,
};
