CREATE DATABASE IF NOT EXISTS codeplus_db;
USE codeplus_db;

CREATE TABLE IF NOT EXISTS customer_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(255),
    customer_name VARCHAR(255),
    phone VARCHAR(255),
    address VARCHAR(1000),
    payment VARCHAR(255),
    items LONGTEXT,
    subtotal DOUBLE,
    delivery DOUBLE,
    total DOUBLE,
    status VARCHAR(255),
    date VARCHAR(255),
    user_email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS grocery_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    category VARCHAR(255),
    price DOUBLE,
    quantity INT
);
