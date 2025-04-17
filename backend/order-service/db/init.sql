CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total_price INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL, 
    order_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    id_order INTEGER NOT NULL,
    id_food_item INTEGER NOT NULL,
    count INTEGER NOT NULL,
    price INTEGER NOT NULL
);

ALTER TABLE ONLY order_items
    ADD CONSTRAINT order_items_id_order_fkey FOREIGN KEY (id_order) REFERENCES orders(id);
