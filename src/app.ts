import express,  { type Express } from 'express';
import { userRouter } from './Routes/user.routes';
import { profileRouter } from './Routes/profile.routes';
import cors from 'cors';
import passport from 'passport';
// import { errorConverter, errorHandler } from './middlewares/error';
import httpStatus from 'http-status';
import ApiError from './utils/ApiError';
import { errors } from './middlewares/error';
// import { jwtStrategy } from './Config/passport.config';

const app: Express = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/profile', profileRouter);

// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// app.use(errorConverter);

// app.use(errorHandler);

app.use(errors);

export default app;
