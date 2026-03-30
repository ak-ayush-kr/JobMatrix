import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/index.js';
import router from './routes/user.routes.js';
import companyRouter from './routes/company.route.js'
const app = express();
dotenv.config({
    path: "./.env"
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use('/api/users',router);
app.use('/api/company',companyRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});