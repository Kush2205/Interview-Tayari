import express from 'express';
import { authRouter } from './auth.route';
import { chatGptRouter } from './chatGPT.route';
const mainrouter = express.Router();

mainrouter.use("/auth", authRouter);
mainrouter.use("/sql-ai" , chatGptRouter);

export default mainrouter;
