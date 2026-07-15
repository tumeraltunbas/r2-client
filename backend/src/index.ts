import fastify, { type FastifyInstance } from 'fastify';
import configuration, {
    ApplicationConfig,
} from './configuration/configuration';
import { errorHandler } from './infrastructure/error/error-handler';
import { PINO_LOGGER_CONFIGURATION } from './constants/pino';
import { registerFastifyPlugins } from './utils/fastify';

const server: FastifyInstance = fastify({
    logger: {
        ...PINO_LOGGER_CONFIGURATION,
    },
    ajv: {
        plugins: [[require('ajv-keywords'), ['transform']]],
    },
});
const applicationConfig: ApplicationConfig = configuration().application;

registerFastifyPlugins(server);
server.setErrorHandler(errorHandler);

const bootstrap = async () => {
    try {
        await server.listen({ port: applicationConfig.port });
    } catch (error) {
        console.error('Failed to start fastify server:', error);
        process.exit(1);
    }
};

bootstrap();
