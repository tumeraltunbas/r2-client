import {
    FastifyInstance,
    FastifyPluginAsync,
    FastifyReply,
    FastifyRequest,
} from 'fastify';
import { CloudflareController } from '../controllers/cloudflare';

export const CloudflareRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance,
): Promise<void> => {
    const cloudflareController = new CloudflareController();

    fastify.get(
        '/buckets',
        async (request: FastifyRequest, reply: FastifyReply) => {
            const response = await cloudflareController.listBuckets(request);
            reply.send({ success: true, data: response });
        },
    );
};
