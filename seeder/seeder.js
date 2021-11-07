const { getConnection } = require("../database/db-pool");
const bcrypt = require("bcrypt");
const createTableSql = require("./sql/create-table-sql");
const insertSql = require("./sql/insert-record-sql");

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
    return err; // so we can get err code down the line
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
    const connection = await getConnection();
    // enable mysql2 named placeholders syntax
    connection.config.namedPlaceholders = true;

    // create database schema
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    await connection.query(`USE ${process.env.DB_NAME}`);

    // drop all tables if exists
    dropTable(connection, "user_favorite");
    dropTable(connection, "user");
    dropTable(connection, "product");
    dropTable(connection, "brand");
    dropTable(connection, "category");

    // create all tables (brand/category before product)
    createTable(connection, createTableSql.user);
    createTable(connection, createTableSql.brand);
    createTable(connection, createTableSql.category);
    createTable(connection, createTableSql.product);
    createTable(connection, createTableSql.user_favorite);

    // unique index of product table foreign keys as optional query parameters
    await connection.query(`
      CREATE INDEX brand_category_id ON product (brand_id, category_id);`);


    // add records to user table
    const users = require('./data/users.json');
    for ( let i = 0; i < users.length; i++ ){
      createUser(connection, users[i]);
    }

    // add records to brand table
    const brands = require('./data/brands.json');
    for ( let i = 0; i < brands.length; i++ ){
      insertRecord(connection, insertSql.brand, brands[i]);
    }

    // add records to category table
    const categories = require('./data/categories.json');
    for ( let i = 0; i < categories.length; i++ ){
      insertRecord(connection, insertSql.category, categories[i]);
    }

    // add records to product table
    const products = require('./data/products.json');
    for ( let i = 0; i < products.length; i++ ){
      insertRecord(connection, insertSql.product, products[i]);
    }

    // use a delay so that the users are created by now
    setTimeout(() => {
      insertRecord(connection, insertSql.user_favorite, {
        note: "so good with green olives",
        user_id: 2,
        product_id: 2,
      });
    }, 1000);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { seedDatabase, createUser, insertRecord };
