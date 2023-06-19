-- migrate:up
CREATE TABLE age_ranges (
  id INT NOT NULL AUTO_INCREMENT,
  age_group VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
)

-- migrate:down
DROP TABLE age_ranges;

