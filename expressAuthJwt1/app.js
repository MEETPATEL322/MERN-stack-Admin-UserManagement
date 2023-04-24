import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import AddDataRoutes from './routes/AddDataRoutes.js'
import cookieParser from 'cookie-parser';

import router from './routes/userRoutes.js';


const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// CORS Policy
app.use(cors())

// Database Connection
connectDB(DATABASE_URL)

// JSON
app.use(express.json())

app.use(router);

app.use(cookieParser());

// Load Routes
app.use("/api/user", userRoutes)


app.use("/data", AddDataRoutes)

app.use("/uploads",express.static("./uploads"));

app.use("/files",express.static("./public/files"))

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})