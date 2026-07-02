import fastify, { type FastifyInstance } from 'fastify';
import configuration, {
    ApplicationConfig,
} from './configuration/configuration';

const server: FastifyInstance = fastify({ logger: true });
const applicationConfig: ApplicationConfig = configuration().application;

const bootstrap = async () => {
    try {
        await server.listen({ port: applicationConfig.port });
    } catch (error) {
        console.error('Failed to start fastify server:', error);
        process.exit(1);
    }
};

bootstrap();
