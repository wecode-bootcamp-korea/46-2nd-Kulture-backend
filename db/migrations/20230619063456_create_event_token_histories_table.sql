-- migrate:up
CREATE TABLE event_token_histories (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  amount DECIMAL(20,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  CONSTRAINT event_token_histories_user_fkey FOREIGN KEY (user_id) REFERENCES users(id)
)

-- migrate:down
DROP TABLE event_token_histories;

