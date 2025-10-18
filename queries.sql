
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL
);


CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    UNIQUE (event_id, user_id) 
);


INSERT INTO events (name, total_seats) VALUES ('Концерт', 100);
INSERT INTO events (name, total_seats) VALUES ('Театр', 50);
INSERT INTO events (name, total_seats) VALUES ('Конференция', 2);