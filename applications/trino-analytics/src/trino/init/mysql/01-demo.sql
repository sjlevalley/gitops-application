-- Sample data for Trino (catalog: mysql, schema: demo)
USE demo;

CREATE TABLE IF NOT EXISTS events (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL
);

INSERT INTO events (name, event_date)
VALUES ('Launch', '2024-01-15'),
       ('Milestone', '2024-06-01');
