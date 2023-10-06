import express from 'express';
import cors from "cors"
import http from 'http'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connection from './Model/Connection.js';
import userRouter from './Routes/userRouter.js'
dotenv.config()


var app = express();

const server = http.createServer(app)


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

connection()

//routes
app.use('/user',userRouter)



const PORT = process.env.PORT || 3000;
 server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});