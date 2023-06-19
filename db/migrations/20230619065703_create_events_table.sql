-- migrate:up
CREATE TABLE events (
  id INT NOT NULL AUTO_INCREMENT,
  category_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  thumbnail_images_url VARCHAR(500) NOT NULL,
  description VARCHAR(1000) NULL,
  start_events_token DECIMAL(10,2) NOT NULL,
  highest_events_token DECIMAL(10,2) NOT NULL,
  location VARCHAR(50) NOT NULL,
  latitude DECIMAL(20,10) NOT NULL,
  longitude DECIMAL(20,10) NOT NULL,
  age_range_id INT NOT NULL,
  country_id INT NOT NULL,
  event_start_date DATETIME NOT NULL,
  auction_start_date DATETIME NOT NULL,
  auction_end_date DATETIME NOT NULL,
  total_quantity INT NOT NULL,
  remaining_quantity INT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT events_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id),
  CONSTRAINT events_age_range_id_fkey FOREIGN KEY (age_range_id) REFERENCES age_ranges(id),
  CONSTRAINT events_country_id_fkey FOREIGN KEY (country_id) REFERENCES countries(id)
)

-- migrate:down
DROP TABLE events;

