import express,  { type Express } from 'express';
import { userRouter } from './Routes/user.routes';
import { profileRouter } from './Routes/profile.routes';
import cors from 'cors';
import httpStatus from 'http-status';
import ApiError from './utils/ApiError';
import { errors } from './middlewares/error';


const app: Express = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/profile', profileRouter);



app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});


app.use(errors);

export default app;
