import express from 'express';
// import { db } from "./Config/db.config";
import { userRouter } from './Routes/user.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);

export default app;
