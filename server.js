require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3131;

// created this function to seed our mysql database with some user data
const { seedDatabase } = require("./seeder/seeder");
seedDatabase();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { dbConnection, connectionRelease } = require('./middlewares/db-connection');
app.use(dbConnection); // req.db connection attached to all requests
app.use(connectionRelease);// release after response
  
// routers
const authRouter = require("./routes/auth");
app.use("/", authRouter);

const productRouter = require("./routes/product");
app.use("/", productRouter);

const userRouter = require("./routes/user");
app.use("/", userRouter);

// start server
app.listen(port, (err) => {
  if (err) console.log("Error in server setup");
  console.log(`Server listening on port ${port}`);
});
