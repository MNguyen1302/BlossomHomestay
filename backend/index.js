import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes/index.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use("/api/v1", routes)

const PORT = 3000
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Connect port ${PORT} successfully`))
    })
    .catch((err) => console.log(`${err} did not connect`))