const express = require('express')
const mongoose = require('mongoose')
const {
    MONGO_IP,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASSWORD
} = require('./config/config')

const app = express()

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}DB:${MONGO_PORT}/?authSource=admin`
).then(() => {
    console.log("connected to the database")
}).catch((error) => {
    console.log(error)
})

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("<h2>Hello there this is me hehe hello this is me. check</h2>")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})