import express from 'express';
// import { db } from "./Config/db.config";
import { authRouter } from './Routes/auth.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1/auth', authRouter);

//db connection then server connection
app.listen(3000, () => console.log('Server is listening on port 3000'));
