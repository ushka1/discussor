import winston from 'winston';

const customFormat = winston.format.printf(({ level, message }) => {
  return `${level}: ${message}`;
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: customFormat }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
