const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const userRoute = require('./routes/user.route')
const port = process.env.PORT || 5001;

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// route
app.get('/', function (req, res) {
  res.send('Mini application for manage user with authentication jwt')
})

app.use('/api/users', userRoute);

mongoose
  .connect(
    "mongodb+srv://developerrizki:6Fi0cOlTrKW5K2kU@backenddb.d8korc3.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to database!");

    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log("Connection failed to database"));