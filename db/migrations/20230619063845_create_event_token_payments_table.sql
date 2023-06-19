-- migrate:up
CREATE TABLE event_token_payments (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  payment_status_code VARCHAR(30) NOT NULL,
  information_json VARCHAR(1000) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  CONSTRAINT event_token_payments_user_fkey FOREIGN KEY (user_id) REFERENCES users(id)
)

-- migrate:down
DROP TABLE event_token_payments;

