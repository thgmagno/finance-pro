CREATE TABLE registration_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    hash VARCHAR(255),
    key VARCHAR(50),
    expires_at TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT,
    role SMALLINT,
    created_at TIMESTAMP
);

CREATE TABLE logs (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    level SMALLINT,
    message TEXT NOT NULL,
    origin VARCHAR(100),
    user_id INTEGER,
    username VARCHAR(100),
    stack_trace TEXT,
    ip_address VARCHAR(45),
    additional_data JSON
);

CREATE INDEX idx_level ON logs(level);
CREATE INDEX idx_timestamp ON logs(timestamp);
CREATE INDEX idx_user_id ON logs(user_id);
CREATE INDEX idx_origin ON logs(origin);
