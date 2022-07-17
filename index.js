const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect("mongodb://prateek:mypass@mongoDB:27017/?authSource=admin"
).then(() => {
    console.log("connected to the database")
}).catch((error) => {
    console.log(error)
})

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("<h2>Hello there this is me hehe hello this is me. this is the boobie girl</h2>")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})