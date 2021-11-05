const mysqlPool = require("../database/db-pool");
const bcrypt = require("bcrypt");
const createTableSql = require('./create-table-sql');
const insertSql = require('./insert-record-sql');



const createBrand = async () => {

};

const createCategory = async () => {

};



const createProduct = async (connection, name, description, brandId, categoryId) => {

  try {
    let now = nowDateToTimestamp();

    const [results] = await connection.query(
      `INSERT INTO product (name, description, brand_id, category_id, created_date, updated_date) 
        VALUES (:name, :description, :brandId, :categoryId, :now, :now)`,
      { name, description, brandId, categoryId, now }
    );

    return results.insertId;
  } catch (err) {
    console.error(err);
  }
};




/// insert record helpers

const nowDateToTimestamp = () => {
  let now = new Date(); // get current date time
  
  //adjust for timezone
  //now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  
  //convert to timestamp format (utc when not adjusted)
  now = now.toISOString().slice(0, 19).replace("T", " ");
  return now;
};

const insertRecord = async (connection, sql, record) => {
  try {
    record.now = nowDateToTimestamp();
    const [results] = await connection.query(sql, record);
    return results.insertId;
  } catch (err) {
    console.error(err);
  }
};

const hashedPassword = async (password) => {
  try {
    return hashedPassword;
  } catch (err) {
    console.error(err);
  }
};

const createUser = async (connection, record) => {
  try {
    const hashedPassword = await bcrypt.hash(record.password, 10);
    record.password = hashedPassword;
    
    return insertRecord(connection, insertSql.user, record);
  } catch (err) {
    console.error(err);
  }
};



/// droo/create table helpers

const dropTable = async (connection, name) => {
  await connection.query(`
    DROP TABLE IF EXISTS ${name};`);
};

const createTable = async (connection, sql) => {
  try {
    // create table in database
    await connection.query(sql);

  } catch (err) {
    console.error(err);
  }
};



/// seeder

const seedDatabase = async () => {

  try {
    const connection = await mysqlPool.getConnection();
    // enable mysql2 named placeholders syntax
    connection.config.namedPlaceholders = true;
    
    // create database schema
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.query(`USE ${process.env.DB_NAME}`);
    
    // drop all tables if exists
    dropTable(connection, 'user_favorite');
    dropTable(connection, 'user');
    dropTable(connection, 'product');
    dropTable(connection, 'brand');
    dropTable(connection, 'category');

    // create all tables (brand/category before product)
    createTable(connection, createTableSql.user);
    createTable(connection, createTableSql.brand);
    createTable(connection, createTableSql.category);
    createTable(connection, createTableSql.product);
    createTable(connection, createTableSql.user_favorite);
    
    // add records to user table

    createUser(connection, {
      username: "imi", email: "imi@rudyah.com", 
      password: "loveDaddy3"
    });

    createUser(connection, {
      username: "rudy", email: "dev@rudyah.com", 
      password: "loveGod1"
    });
    
    createUser(connection, {
      username: "honey", email: "sammi@rudyah.com", 
      password: "loveLove33"
    });


    // add records to product table
    insertRecord(connection, insertSql.product, {
      name: "soup", description: "cheddar broccoli" });

    // add record to brand table
    insertRecord(connection, insertSql.brand, {
      name: "clamato"
    });

    // add records to category table
    insertRecord(connection, insertSql.category, {
      name: 'juices'
    })

    // add records to product table
    insertRecord(connection, insertSql.product, {
      name: "tomato juice", description: "for sunday mary mix", 
      brand_id: 1, category_id: 1 });

    // use a delay so that the users are created by now
    setTimeout(() => {
      insertRecord(connection, insertSql.user_favorite, {
        note: "so good with green olives", user_id: 2, product_id: 1
      });
    }, 1000);

  } catch (err) {
    console.error(err);
  }
  
};

module.exports = { seedDatabase, createUser };
