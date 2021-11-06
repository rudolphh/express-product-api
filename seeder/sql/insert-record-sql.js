const user = 
    `INSERT INTO user (username, email, password, created_date, updated_date) 
    VALUES (:username, :email, :password, :now, :now)`;

const product = 
    `INSERT INTO product (name, description, brand_id, category_id, created_date, updated_date) 
    VALUES (:name, :description, :brand_id, :category_id, :now, :now)`

const brand = 
    `INSERT INTO brand (name, created_date, updated_date) 
    VALUES (:name, :now, :now)`;

const category = 
    `INSERT INTO category (name, created_date, updated_date) 
    VALUES (:name, :now, :now)`;

const user_favorite = 
    `INSERT INTO user_favorite (note, user_id, product_id, created_date, updated_date) 
    VALUES (:note, :user_id, :product_id, :now, :now)`;

module.exports = { user, product, brand, category, user_favorite };