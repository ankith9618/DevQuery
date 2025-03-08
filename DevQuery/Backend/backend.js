import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';



import { signup, validateSignup } from './endpoints/Signup.js';
import { login, validateLogin } from './endpoints/login.js';
import { postQuery } from './endpoints/postQuery.js';
import { getUserQuery } from './endpoints/getUserQuery.js';
import { postReply } from './endpoints/postReply.js';
import { getRepliesToQuery } from './endpoints/getRepliesToQuery.js';
import { getRepliesToReply } from './endpoints/getRepliesToReply.js';
import { likeToQuery } from './endpoints/likeToQuery.js';
import {deleteQuery} from './endpoints/deleteQuery.js';
import { deleteReply } from './endpoints/deleteReply.js';
import { likeToReply } from './endpoints/likeToReply.js';
import { verifyToken } from './endpoints/verifyToken..js';
import { getTopQueries } from './endpoints/getTopQueries.js';
import { dashBoard } from './endpoints/dashBoard.js';
const app = express();
dotenv.config();
const PORT = 5000;
export const SECRET_KEY = "DevQuery_Ankith_Kumar";
export const salt = bcrypt.genSaltSync(10);

app.use(cookieParser());
app.use(express.json());
app.use(cors());

const DB_URL = process.env.DB_URL;
//connect to mongodb
mongoose.connect(`${DB_URL}`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


const validateUser = (req, res, next) => {
    const authHeader = req.headers["authorization"]; 

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided or invalid format" });
    }

    const token = authHeader.split(" ")[1];  

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        req.user = decoded;
        next();
    });
};


app.post("/api/signup", validateSignup, signup);

app.post("/api/login", validateLogin, login);

app.post("/postQuery", validateUser, postQuery);

app.post("/getUserQueries", validateUser, getUserQuery);

app.post("/postReply", validateUser, postReply);

app.post("/getRepliesToQuery", validateUser, getRepliesToQuery);

app.post("/getRepliesToReply", validateUser, getRepliesToReply);

app.post("/likeToQuery",validateUser,likeToQuery);

app.post("/likeToReply",validateUser,likeToReply);

app.post("/deleteQuery",validateUser,deleteQuery);

app.post("/deleteReply" , validateUser,deleteReply);

app.post("/verifyToken",validateUser,verifyToken);

app.post("/getTopQueries",validateUser,getTopQueries);

app.post("/dashBoard",validateUser,dashBoard);

app.listen(PORT, () => {
    console.log("server started at : http://localhost:5000");
});
