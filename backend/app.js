const express = require('express')
const mongoose = require("mongoose")
const app= express()


app.use(express.json()) 

app.use('/api/incomes',require('./routes/incomeRoutes'))
app.use("/api/expenses", require("./routes/expenseRoutes"));







module.exports = app