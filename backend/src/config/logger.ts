import { createLogger, format, transports } from 'winston';

const customFormat = format.printf(({ level, message, stack }) => {
  if (stack) {
    return `${level}: ${message} - ${stack}`;
  }

  return `${level}: ${message}`;
});

export const logger = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.colorize(),
    format.prettyPrint(),
  ),
  transports: [
    new transports.Console({
      format: customFormat,
    }),
    new transports.File({ filename: 'combined.log' }),
  ],
});
