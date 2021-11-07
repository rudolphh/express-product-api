const mysql = require('mysql2/promise');

// using environment variables injected from .env file
// create a connection pool to the mysql server
const pool = mysql.createPool({
    connectionLimit: 30,// in Jesus' age, Amen ;)
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    //database: process.env.DB_NAME,// necessary if schema is already created in db
    
    // in case different from mysql default 3306
    // port: process.env.DB_PORT, 
});

const getConnection = async () => {
    // get a connection from the pool
    const connection = await pool.getConnection();
    connection.config.namedPlaceholders = true;
    
    await connection.query(`SET SESSION sql_mode = "TRADITIONAL"`);
    await connection.query(`SET time_zone = '-7:00'`);
    await connection.query(`USE ${process.env.DB_NAME}`);
    
    //return connection;
    return connection;
};

module.exports = { getConnection };