-- migrate:up
CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT,
  kakao_id BIGINT NOT NUll,
  nickname VARCHAR(30) NOT NULL,
  profile_image_url VARCHAR(300) NULL,
  email VARCHAR(255) NULL,
  age_range VARCHAR(30) NULL,
  gender VARCHAR(20) NULL,
  event_token DECIMAL(20,2) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE users;

