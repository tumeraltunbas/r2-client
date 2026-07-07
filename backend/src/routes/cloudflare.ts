import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';
import { CloudflareController } from '../controllers/cloudflare';
import { ListBucketsResDto } from '../models/dtos/project/cloudflare';

export const CloudflareRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance,
): Promise<void> => {
    const cloudflareController = new CloudflareController();

    fastify.get(
        '/buckets',
        async (request: FastifyRequest): Promise<ListBucketsResDto> =>
            cloudflareController.listBuckets(request),
    );
};
