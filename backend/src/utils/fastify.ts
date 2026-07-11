import fastifyMultipart from '@fastify/multipart';
import { CloudflareRoutes } from '../routes/cloudflare.route';
import { FastifyInstance } from 'fastify';
import { GLOBAL_PREFIX } from '../constants/routes';
import configuration, { FormDataConfig } from '../configuration/configuration';

export function registerFastifyPlugins(server: FastifyInstance): void {
    const formDataConfig: FormDataConfig = configuration().formData;

    server.register(fastifyMultipart, {
        limits: {
            fileSize: formDataConfig.maxFileSize,
            files: formDataConfig.maxFileCount,
        },
    });

    server.register(CloudflareRoutes, { prefix: GLOBAL_PREFIX });
}
