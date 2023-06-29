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

const createReview = async (userId, eventId, content, imageUrls) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const reviewId = await appDataSource.query(
      `
    INSERT INTO reviews
      (user_id,
      event_id,
      content)
    VALUES (?, ?, ?) 
    `,
      [userId, eventId, content]
    );

    for (const imageUrl of imageUrls) {
      await appDataSource.query(
        `INSERT INTO review_images
        (review_id,
          image_url)
        VALUES(?,?)`,
        [reviewId.insertId, imageUrl]
      );
    }

    await queryRunner.commitTransaction();
    return reviewId.insertId;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

const deleteReview = async(reviewId, userId) => {
  const queryRunner = appDataSource.createQueryRunner()

  await queryRunner.connect()
  await queryRunner.startTransaction()

  try {
    await queryRunner.query(`
      DELETE
      FROM review_images
      WHERE review_id = ?
      `, [reviewId]
    );
    
    await queryRunner.query(`
      DELETE FROM reviews
      WHERE id = ? AND user_id = ?
      `, [reviewId, userId]
      );

    await queryRunner.commitTransaction();

      return;
  } catch (err) {
    await queryRunner.rollbackTransaction()
    throw err
  } finally {
    await queryRunner.release()
  }
}

const getReviewById = async (reviewId) => {
  const review = await appDataSource.query(`
    SELECT
      id,
      event_id,
      user_id
    FROM reviews
    WHERE id = ?`, [id]
  );

  return review;
};

module.exports = {
  getReview,
  createReview,
  deleteReview,
  getReviewById,
};
