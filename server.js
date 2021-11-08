require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3131;

// server-level database connection
const { getConnection } = require("./database/db");
let connection;
(async () => {
  connection = await getConnection();
})();

// seed our mysql database with some user data
const { seedDatabase } = require("./seeder/seeder");
seedDatabase();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.db = connection; // attach db connection on request
  next();
});

// routers
const authRouter = require("./routes/auth");
app.use("/", authRouter);

const productRouter = require("./routes/product");
app.use("/", productRouter);

const userRouter = require("./routes/user");
app.use("/", userRouter);


// custom error handling
app.use(require('./middlewares/error-handler'));


// start server
app.listen(port, (err) => {
  if (err) console.log("Error in server setup");
  console.log(`Server listening on port ${port}`);
});
