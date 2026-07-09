import { io } from "socket.io-client";
let socket = null;

export const connectSocket = (userId,role) => {
    if (!socket && userId) {
        socket = io("http://localhost:5000", {
            query: {
                userId,
                role
            },
            withCredentials: true,
        });
        socket.on("connect", () => {
            console.log("Socket connected");
        });
    }

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};