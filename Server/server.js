import express from "express"
import "dotenv/config";
import cors from "cors"
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./Routes/userRoutes.js";
import messageRouter from "./Routes/messageRoutes.js";
import { Server } from "socket.io";

const app  = express();
const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
    cors : {origin : "*"}
})

export const userSocketMap = {}; // {usr id , soc(ket id}

io.on("connection", (socket) =>{
    const userId = socket.handshake.query.userId;
    console.log("user connected" , userId);

    if(userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers" , Object.keys(userSocketMap));

    socket.on("disconnect" , () =>{
        console.log("user disconnected", userId);
        delete userSocketMap[userId];

        io.emit("getOnlineUsers" , Object.keys(userSocketMap))
        
    })
})

app.use(express.json({limit : "4mb"}));
app.use(cors());

app.use("/api/status",(req,res)=>res.send("server is live"));
app.use("/api/auth",userRouter)
app.use("/api/message" , messageRouter)

//mongodb

await connectDB ();

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT , ()=> console.log("Server is running on PORT : "+ PORT));


