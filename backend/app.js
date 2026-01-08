const express = require('express')
const mongoose = require("mongoose")
const Joi = require('joi')
const app= express()

// const Home = require('./Routes/Home')
// const genres = require('./Routes/genres')
// const customers = require('./Routes/customers')
// const movies = require("./Routes/movie")

app.use(express.json()) 
app.use('/api/income',require('./routes/incomeRoutes'))
// app.use('/api/customers', customers)
// app.use('/api/movies',movies)


mongoose.connect("mongodb://localhost/Expense-Tracker")
.then(()=> console.log("Connected successfully..."))
.catch((err) => console.log(err))



const PORT =  process.env.PORT || 3000
app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);})