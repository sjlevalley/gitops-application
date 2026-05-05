-- Sample data for Trino (catalog: postgres, schema: public)
CREATE TABLE IF NOT EXISTS sales (
    id          SERIAL PRIMARY KEY,
    region      VARCHAR(50) NOT NULL,
    amount      DECIMAL(10, 2) NOT NULL
);

INSERT INTO sales (region, amount)
VALUES ('North', 100.00),
       ('South', 250.50),
       ('East', 175.25);
