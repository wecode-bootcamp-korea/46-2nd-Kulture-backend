-- migrate:up
ALTER TABLE event_token_histories ADD COLUMN type VARCHAR(30);

-- migrate:down
ALTER TABLE event_token_histories DROP COLUMN type;
