import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/index.js';
import router from './routes/user.routes.js';
import companyRouter from './routes/company.route.js';
import jobRouter from './routes/job.route.js';
import applicationRouter from './routes/application.route.js';
import {initializeSocket} from "./utils/socket.js"
import http from 'http';
const app = express();
dotenv.config({
    path: "./.env"
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use('/api/users',router);
app.use('/api/company',companyRouter);
app.use('/api/job',jobRouter);
app.use('/api/application',applicationRouter);
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initializeSocket(server);
connectDB();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});