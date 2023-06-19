-- migrate:up
CREATE TABLE wishlists(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT unique_user_id_event_id UNIQUE (user_id, event_id),
  CONSTRAINT wishlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT wishlists_product_id_fkey FOREIGN KEY (event_id) REFERENCES events(id)
);

-- migrate:down
DROP TABLE wishlists;
