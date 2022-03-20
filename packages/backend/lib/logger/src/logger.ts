import * as winston from 'winston';

export function Logger() {
  // Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
  return winston.createLogger({
    // To see more detailed errors, change this to 'debug'
    level: process.env.LOG_LEVEL,
    format: winston.format.combine(winston.format.splat(), winston.format.simple()),
    transports: [new winston.transports.Console()],
  });
}

export type Logger = ReturnType<typeof Logger>;
