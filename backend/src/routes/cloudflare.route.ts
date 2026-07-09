import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';
import { CloudflareController } from '../controllers/cloudflare';
import {
    CreateBucketResDto,
    ListBucketsResDto,
} from '../models/dtos/project/res/cloudflare';
import { APP_ROUTES } from '../constants/routes';
import { CreateBucketReqDto } from '../models/dtos/project/req/cloudflare';

export const CloudflareRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance,
): Promise<void> => {
    const cloudflareController = new CloudflareController();

    fastify.get(
        APP_ROUTES.cloudflare.listBuckets.endpoint,
        async (request: FastifyRequest): Promise<ListBucketsResDto> =>
            cloudflareController.listBuckets(request),
    );

    fastify.post(
        APP_ROUTES.cloudflare.createBucket.endpoint,
        { schema: APP_ROUTES.cloudflare.createBucket.requestDtoSchema },
        async (
            request: FastifyRequest<{ Body: CreateBucketReqDto }>,
        ): Promise<CreateBucketResDto> =>
            cloudflareController.createBucket(request),
    );
};
