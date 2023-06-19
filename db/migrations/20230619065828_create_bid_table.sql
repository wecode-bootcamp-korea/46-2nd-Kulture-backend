-- migrate:up
CREATE TABLE bid (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  bidding_events_token DECIMAL(20,2) NOT NULL,
  bid_status_code VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  CONSTRAINT bid_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT bid_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(id)
)

-- migrate:down
DROP TABLE bid;

