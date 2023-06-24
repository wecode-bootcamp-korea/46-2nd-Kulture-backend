const appDataSource = require("./dataSource");

const getReview = async (eventId, orderBy) => {
    let sortQuery = ""
    let whereQuery = "";

    if (eventId) {
      whereQuery = `WHERE reviews.event_id = ${eventId}`;
    }  

      switch (orderBy) {
        case "createdASC":
          sortQuery = `ORDER BY reviews.created_at ASC`
          break;
        default:
          sortQuery = `ORDER BY reviews.created_at DESC`;
          break;
    }

    const list = await appDataSource.query(`
      SELECT
        reviews.id,
        reviews.event_id,
        reviews.user_id,
        users.nickname,
        reviews.content,
        review_images.image_url
      FROM reviews
      INNER JOIN users ON users.id = reviews.user_id
      INNER JOIN review_images ON reviews.id = review_images.id
      ${whereQuery}
      ${sortQuery}
      `);

      return list
};

module.exports = {
  getReview,
};
