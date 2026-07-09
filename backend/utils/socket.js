import {Server} from "socket.io";

let io;
const userSockets = {};

export const initializeSocket = (server) => {
    io = new Server(server,{
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        }
    })

    io.on("connection", (socket) => {
        const {userId,role}= socket.handshake.query;
        if(role === "user"){
            socket.join("user");
        }
        if(role === "recruiter"){
            socket.join("recruiter");
        }
        // console.log("connect to socket",userId);

        socket.on("disconnect", () => {
            delete userSockets[userId];
        });
    });
};

export const getReceiverSocketId = (userId) => {
    return userSockets[userId];
};

export {io};