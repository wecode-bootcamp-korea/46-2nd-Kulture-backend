-- migrate:up
CREATE TABLE order_status_code(
  id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL, 
  code_type VARCHAR(30) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT order_status_code_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id)
)

-- migrate:down
DROP TABLE order_status_code;