import winston, { LoggerOptions, Logger } from 'winston'

const options: LoggerOptions = {
    level: 'debug',
    format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
        }),
        new winston.transports.File({
            filename: 'debug.log',
            level: 'debug',
        }),
    ],
}

export const logger: Logger = winston.createLogger(options)

if (process.env.NODE_ENV !== 'production') {
    logger.debug('Logging analyzing in debug levels')
}
