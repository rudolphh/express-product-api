require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3131;

// created this function to seed our mysql database with some user data
const { seedDatabase } = require('./seeder/seeder');
seedDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require('./routes/auth');
app.use('/', authRouter);

const verifyJwt = require('./middlewares/verify-jwt');
// you can use the middleware like this for all routes below app.use
// app.use(verifyJwt);
app.use(require('./middlewares/db-connection'));
// or by providing the middleware function before the route handler
// to signify the middleware function to be used on this route only
app.get('/users', verifyJwt, async (req, res) => {
    // if the token is valid the middleware allowed us to reach the route
    // and we have access to the userId for queries
    console.log('the user id is : ', req.userId);
    try {
        const [results] = await req.db.query("SELECT * FROM user");
        res.send(results);
    } catch (err) {
        console.error(err);
        res.send({ error: err.message });
    }
});

app.listen(port, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`Server listening on port ${port}`);
});