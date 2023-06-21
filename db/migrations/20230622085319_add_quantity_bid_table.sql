-- migrate:up
ALTER TABLE bid ADD quantity int NULL;

-- migrate:down
ALTER TABLE bid DROP COLUMN quantity;
