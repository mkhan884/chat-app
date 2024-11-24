const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/usersRoutes");
const friendsRouter = require("./routes/friendsRoutes");
const conversationsRouter = require("./routes/conversationsRoutes");
const messagesRouter = require("./routes/messagesRoutes");
const mysql = require("mysql2");
const dotenv = require("dotenv");

// Initialize Express app and environment variables
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

db.connect((err) => {
    if (err) {
        console.log(process.env.PASSWORD, process.env.DB_USER);
        console.error("Error connecting to MySQL" + err.stack);
        return;
    }
    console.log("Connected to MySQL database");
});

// Routes
app.use("/users", (req, res, next) => {
    req.db = db;
    next();
}, usersRouter);

app.use("/friends", (req, res, next) => {
    req.db = db;
    next();
}, friendsRouter);

app.use("/conversations", (req, res, next) => {
    req.db = db;
    next();
}, conversationsRouter);

app.use("/messages", (req, res, next) => {
    req.db = db;
    next();
}, messagesRouter);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
