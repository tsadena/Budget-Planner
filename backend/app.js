const express = require('express')
const mongoose = require("mongoose")
const app= express()
const cors = require("cors");

app.use(express.json()) 
app.use(cors());
app.use('/api/incomes',require('./routes/incomeRoutes'))
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));










module.exports = app