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
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSockets[userId] = socket.id;
        }
        console.log("connect to socket",userId);

        socket.on("disconnect", () => {
            delete userSockets[userId];
        });
    });
};

export const getReceiverSocketId = (userId) => {
    return userSockets[userId];
};

export {io};