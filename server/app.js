import express from 'express';
import cors from "cors"
import http from 'http'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import connection from './Model/Connection.js';
import userRouter from './Routes/userRouter.js'
import { WebSocketServer} from 'ws';
import { getUserDetails } from './Model/Helpers/userHelper.js';
import Message from './Model/Schemas/messageSchema.js';
dotenv.config()


var app = express();

const server = http.createServer(app)
const wss=new WebSocketServer({server})

wss.on('connection',async(connection,req)=>{

    //used cookies for getting id of the connected users
    const cookies=req.headers.cookie
    if(cookies){
        const tokenCookieString=cookies.split(';').find(str=>str.startsWith('token='))
        const token=tokenCookieString.split('=')[1]
        if(token){
            try {
                const userData = jwt.verify(token, process.env.JWT_SECRET);
                const { userId } = userData;
                console.log(userId, 'id')

                const user = await getUserDetails(userId);
                if (user) {
                    connection.userId = userId;
                    connection.username = user.username;
                }
            } catch (err) {
                
                console.error(err);
            }

        }
        connection.on('message',async(message)=>{
            const messageData=JSON.parse(message)
            console.log(messageData,'dta')
            const {recipient,text}=messageData
            if(recipient && text){
                
             const messageDta=  await Message.create({
                sender:connection.userId,
                recipient,
                text
               })
            const clientsArray = [...wss.clients];
         clientsArray
  .filter(c => c.userId == recipient)
  .forEach(c => c.send(JSON.stringify({ text, sender: connection.userId,recipient,id:messageDta._id })));


            }
            })
    
       
    }

   
 

   
   [...wss.clients].forEach(client=>{
    client.send(JSON.stringify({
        online:[...wss.clients].map(c=>({userId:c.userId,username:c.username}))
    }
        
    ))
   })
   
})

app.use(cors({
    credentials: true,
    origin:true,
  }));
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