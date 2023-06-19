-- migrate:up
CREATE TABLE orders(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  bid_id INT NOT NULL,
  order_number VARCHAR(300) NOT NULL,
  total_event_token DECIMAL(20,2) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT orders_bid_id_fkey FOREIGN KEY (bid_id) REFERENCES bid(id)
)

-- migrate:down
DROP TABLE orders;