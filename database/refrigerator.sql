/*
 * Script to add a refridgerator with products.
 */
# Single Storage
INSERT INTO storages(id,title,description,published) VALUES
    (1,'Refrigerator','Main household grocery storage unit', false);

# Add groceries to products database.
INSERT INTO products(id,name,size) VALUES
    (1,'Apple',10),
    (2,'Banana',5),
    (3,'Rice',3),
    (4,'Tortilla Chips',2),
    (5,'Steak',1),
    (6,'Gallon Milk',1),
    (7,'Tomato',8),
    (8,'Oatmeal',3),
    (9,'Flour',2),
    (10,'Sugar',1),
    (11,'chocolate',2);

# Link storage id and grocery id.
INSERT INTO storage_product(storage_id,product_id) VALUES
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (1,5),
    (1,6),
    (1,7),
    (1,8),
    (1,9),
    (1,10),
    (1,11);
