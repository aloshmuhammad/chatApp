import express from 'express';
import cors from "cors"
import http from 'http'
import dotenv from 'dotenv'
import connection from './Model/Connection.js';
dotenv.config()


var app = express();

const server = http.createServer(app)


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

connection()



const PORT = process.env.PORT || 3000;
 server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});