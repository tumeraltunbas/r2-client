import fastify, { type FastifyInstance } from 'fastify';
import configuration, {
    ApplicationConfig,
} from './configuration/configuration';
import { CloudflareRoutes } from './routes/cloudflare.route';
import { errorHandler } from './infrastructure/error/error-handler';
import { PINO_LOGGER_CONFIGURATION } from './constants/pino';

const server: FastifyInstance = fastify({
    logger: {
        ...PINO_LOGGER_CONFIGURATION,
    },
});
const applicationConfig: ApplicationConfig = configuration().application;

server.register(CloudflareRoutes, { prefix: '/cloudflare' });
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
