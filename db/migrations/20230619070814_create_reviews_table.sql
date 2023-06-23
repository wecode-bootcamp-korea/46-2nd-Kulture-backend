-- migrate:up
CREATE TABLE reviews(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  content VARCHAR(300) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT reviews_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(id)
);

-- migrate:down
DROP TABLE reviews;