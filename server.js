require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3131;

// created this function to seed our mysql database with some user data
const { seedDatabase } = require("./seeder/seeder");
seedDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./middlewares/db-connection")); // req.db connection attached to all requests

// const mysqlPool = require("./database/db-pool");

// (async () => {
//   try {
//     // get a connection from the pool
//     req.db = await mysqlPool.getConnection();
//     req.db.config.namedPlaceholders = true;

//     await req.db.query(`SET SESSION sql_mode = "TRADITIONAL"`);
//     await req.db.query(`SET time_zone = '-7:00'`);
//     await req.db.query(`USE ${process.env.DB_NAME}`);
//   } catch (err) {
//     console.error(err);
//   }
// })();

const authRouter = require("./routes/auth");
app.use("/", authRouter);

const productRouter = require("./routes/product");
app.use("/", productRouter);

const userRouter = require("./routes/user");
app.use("/", userRouter);

app.listen(port, (err) => {
  if (err) console.log("Error in server setup");
  console.log(`Server listening on port ${port}`);
});
