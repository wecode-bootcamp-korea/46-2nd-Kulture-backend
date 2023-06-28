-- migrate:up
ALTER TABLE event_token_payments MODIFY information_json JSON NOT NULL;

-- migrate:down
ALTER TABLE event_token_payments MODIFY information_json VARCHAR(2000) NOT NULL;
