import { Server } from 'http';
import prisma from '../prisma/index';
import config from './Config/env.config';
import logger from './Config/logger';
import app from './app';

let server: Server;

prisma.$connect().then(() => {
  logger.info('Connected to MySQL');
  server = app.listen(config.port, () => {
    logger.info(`Server is listening on port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server connection closed');
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(`Unexpected Error Handler: ${error}`);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
