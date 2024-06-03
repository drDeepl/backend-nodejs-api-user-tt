import winston from 'winston';
import config from './env.config';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.DEV_STATUS === 'develop' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.DEV_STATUS === 'develop'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    winston.format.splat(),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
    ),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;
