import express from 'express';
import { userRouter } from './Routes/user.routes';
import cors from 'cors';
import { errorConverter, errorHandler } from './middlewares/error';
import httpStatus from 'http-status';
import ApiError from './utils/ApiError';

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);

app.use(errorHandler);

export default app;
