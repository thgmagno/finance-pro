CREATE TABLE registration_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    hash VARCHAR(255),
    token VARCHAR(255),
    expires_at TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT,
    role INT2,
    created_at TIMESTAMP
);
