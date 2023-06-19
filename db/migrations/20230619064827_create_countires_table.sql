-- migrate:up
CREATE TABLE countries (
  id INT NOT NULL AUTO_INCREMENT,
  country VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
)

-- migrate:down
DROP TABLE countries;
