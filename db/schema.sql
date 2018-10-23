CREATE DATABASE eat_da_burger_db;
USE eat_da_burger_db;

-- Create the table tasks.
CREATE TABLE burgers
(
id int NOT NULL AUTO_INCREMENT,
burger varchar(255) NOT NULL,
devoured BOOLEAN DEFAULT false,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO burgers (burger) VALUES ('CheeseBurger');
INSERT INTO burgers (burger) VALUES ('Mushroom Burger');
INSERT INTO burgers (burger) VALUES ('California Burger');

