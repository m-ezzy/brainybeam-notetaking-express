import dotenv from 'dotenv'
import { createServer } from 'http'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes.js'

dotenv.config()

const port = process.env.PORT || 8000

const app = express()
const server = createServer(app)

// Middlewares
app.use(cors(
  {
    origin: ['localhost:5173', 'localhost:3000'],
    methods: "*",
    allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type", "X-CSRFToken"],
    credentials: true,
  }
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', routes)

app.listen(port, () => {
  console.log(`----- app running on port ${port} -----`)
})

mongoose
  .connect(process.env.MONGO_URI)
  .catch((err) => console.log(err))

export default app
