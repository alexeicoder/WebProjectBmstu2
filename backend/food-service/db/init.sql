-- DATA_BASE food_items
CREATE TABLE IF NOT EXISTS food_items (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    count integer NOT NULL,
    price integer NOT NULL,
    description text,
    img text,
    id_category integer NOT NULL
);

-- DATA_BASE food_items
CREATE TABLE IF NOT EXISTS food_categories (
    id SERIAL PRIMARY KEY,
    name text NOT NULL
);

ALTER TABLE ONLY food_items
    ADD CONSTRAINT food_items_id_category_fkey FOREIGN KEY (id_category) REFERENCES food_categories(id);
    
-- INSERT food_categories
INSERT INTO food_categories (id, name) VALUES 
(1, 'Пиццы'),
(2, 'Соусы'),
(3, 'Напитки');

-- INSERT food_items
INSERT INTO food_items (id, name, count, price, description, img, id_category) VALUES
(2, 'БАРСКАЯ', 20, 900, 'Бекон, ветчина, грудка куриная копченая, колбаски кабаносси, помидоры, соус чесночный, сыр моцарелла, шампиньоны.', NULL, 1),
(3, 'САНТЬЯГО', 20, 1050, 'Соус "Спайси", колбаса говяжья, сыр Моцарелла.', NULL, 1),
(4, 'КУБА', 25, 950, 'Ветчина, колбаски кабаносси, помидоры, свинина, соус тар-тар, сыр моцарелла, шампиньоны.', NULL, 1),
(5, 'БАТИСТА С КРЕВЕТКАМИ', 10, 1200, 'Креветки коктейльные, томаты, салат Айсберг, соус Цезарь, сухарики, сыр Моцарелла, сыр Пармезан', NULL, 1),
(1, 'САНЧЕС', 15, 1050, 'Базилик, соус сырный, сыр Моцарелла, сыр Пармезан, сыр Фета, сыр Чеддер.', NULL, 1),
(7, 'Сок Ананас', 50, 200, 'Ананас', NULL, 3),
(6, 'Томатный', 50, 40, NULL, NULL, 2),
(8, 'Кола Добрый', 50, 280, 'Кола Добрый', NULL, 3),
(9, 'Напиток Добрый Апельсин', 50, 280, 'Напиток Добрый Апельсин', NULL, 3),
(10, 'Чесночный', 50, 40, 'Чесночный соус', NULL, 2),
(11, 'Сырный', 50, 40, 'Сырный соус', NULL, 2);
