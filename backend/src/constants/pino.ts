import { FastifyLoggerOptions } from 'fastify';

export const PINO_LOGGER_CONFIGURATION = {
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
            singleLine: true,
        },
    },
};
