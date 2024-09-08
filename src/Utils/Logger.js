import winston from 'winston';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const { combine, timestamp, printf, simple } = winston.format;

const __dirname = dirname(fileURLToPath(import.meta.url));
const logsDirectory = `${__dirname}/../../logs`;
const logFilePath = `${logsDirectory}/testLogs.txt`;
const errorLogFilePath = `${logsDirectory}/testErrorLogs.txt`;
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

/**
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({filename: errorLogFilePath, level: 'error'}),
    new winston.transports.File({filename: logFilePath}),
  ]
})

 By default, the function looks like the above
**/
export const logger = winston.createLogger(
  {
    level: 'info',
    format: combine(
      timestamp(),
      myFormat
    ),
    transports: [
      new winston. transports. File({filename: errorLogFilePath, level: 'error'}),
      new winston. transports. File({filename: logFilePath}),
    ]
  }
);


// Conditionally add console logging
if (process.env.CONSOLE_LOGGING !== 'false') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
    })
  );
}