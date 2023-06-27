-- migrate:up
CREATE TABLE review_images(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(2000) NOT NULL,
  review_id INT NOT NULL,
  CONSTRAINT review_images_review_id_FK FOREIGN KEY(review_id) REFERENCES reviews(id)
);


-- migrate:down
DROP TABLE review_images;