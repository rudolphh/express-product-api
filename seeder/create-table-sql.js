

const user = `
    CREATE TABLE IF NOT EXISTS user (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(15) UNIQUE NOT NULL,
        email VARCHAR(254) UNIQUE NOT NULL,
        password CHAR(60) NOT NULL,
        created_date TIMESTAMP,
        updated_date TIMESTAMP,
        PRIMARY KEY ( id )
    );`;

const brand = `
    CREATE TABLE IF NOT EXISTS brand (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(254) UNIQUE NOT NULL,
        created_date TIMESTAMP,
        updated_date TIMESTAMP,
        PRIMARY KEY ( id )
    );`;

const category = `
    CREATE TABLE IF NOT EXISTS category (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(254) UNIQUE NOT NULL,
        created_date TIMESTAMP,
        updated_date TIMESTAMP,
        PRIMARY KEY ( id )
    );`;

const product = `
    CREATE TABLE IF NOT EXISTS product (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(254) UNIQUE NOT NULL,
        description TEXT,
        brand_id INT,
        category_id INT,
        created_date TIMESTAMP,
        updated_date TIMESTAMP,
        PRIMARY KEY ( id ),
        CONSTRAINT fk_brand_id FOREIGN KEY ( brand_id ) REFERENCES brand(id),
        CONSTRAINT fk_category_id FOREIGN KEY ( category_id ) REFERENCES category(id)
    );`;

const user_favorite = `
    CREATE TABLE IF NOT EXISTS user_favorite (
        id INT NOT NULL AUTO_INCREMENT,
        note TEXT,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        created_date TIMESTAMP,
        updated_date TIMESTAMP,
        PRIMARY KEY ( id ),
        CONSTRAINT fk_user_id FOREIGN KEY ( user_id ) REFERENCES user(id),
        CONSTRAINT fk_product_id FOREIGN KEY ( product_id ) REFERENCES product(id),
        CONSTRAINT unq_userId_productId unique(user_id, product_id)
    );`;
    
module.exports = { user, brand, category, product, user_favorite };