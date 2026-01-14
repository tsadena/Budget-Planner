require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");


const app = express();

app.use(express.json());
app.use(cors());

connectDB();


app.use("/api/auth", require("./routes/auth"));

app.use('/api/incomes',require('./routes/incomeRoutes'))
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));




module.exports = app

