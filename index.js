const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const redis = require('redis')
let RedisStore = require('connect-redis')(session)

const {
    MONGO_IP,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASSWORD,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET,
} = require('./config/config')

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
})

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}DB:${MONGO_PORT}/?authSource=admin`

const connectDB = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    }).then(() => {
        console.log("connected to the database...")
    }).catch((error) => {
        console.log(error)
        setTimeout(connectDB, 5000)
    })

}

connectDB()

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge: 30000
        }

    }))

app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/api/v1", (req, res) => {
    res.send("<h2>Hello there this is me hehe hello this is me and that is how we do it</h2>")
})

app.use("/api/v1/posts", postRouter)

app.use("/api/v1/user", userRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})