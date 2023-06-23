-- migrate:up
CREATE TABLE order_events(
  id INT NOT NULL AUTO_INCREMENT,
  event_id INT NOT NULL,
  quantity INT NOT NULL,
  order_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT order_events_orderid_fkey FOREIGN KEY (order_id) REFERENCES orders(id),
  CONSTRAINT order_events_eventid_fkey FOREIGN KEY (event_id) REFERENCES events(id)
);

-- migrate:down
DROP TABLE order_events;
