const mysqlPool = require('../database/db-pool');

const dbConnection = async (req, res, next) => {
    // get a connection from the pool
    const connection = await mysqlPool.getConnection();
    connection.config.namedPlaceholders = true;
    
    await connection.query(`SET SESSION sql_mode = "TRADITIONAL"`);
    await connection.query(`SET time_zone = '-7:00'`);
    await connection.query(`USE ${process.env.DB_NAME}`);
    
    req.db = connection;

    // next is used to pass execution to the next function 
    // in the middleware stack. to skip the rest of the middleware 
    // functions use next('route') to jump to the route function
    next();
};

module.exports = dbConnection;
