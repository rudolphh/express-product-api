const user = 
    `INSERT INTO user (username, email, password, created_date, updated_date) 
    VALUES (:username, :email, :hashedPassword, :now, :now)`;

const product = 
    `INSERT INTO product (name, description, brand_id, category_id, created_date, updated_date) 
    VALUES (:name, :description, :brandId, :categoryId, :now, :now)`

const brand = 
    `INSERT INTO brand (name, created_date, updated_date) 
    VALUES (:name, :now, :now)`;

const category = 
    `INSERT INTO category (name, created_date, updated_date) 
    VALUES (:name, :now, :now)`;

module.exports = { user, product, brand, category }