import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';
import { CloudflareController } from '../controllers/cloudflare.controller';
import {
    CreateBucketResDto,
    ListBucketsResDto,
    ListObjectsResDto,
} from '../models/dtos/project/res/cloudflare';
import { APP_ROUTES } from '../constants/routes';
import {
    CreateBucketReqDto,
    DeleteObjectReqDto,
    ListObjectsReqDto,
    RemoveBucketReqDto,
    UploadObjectReqDto,
} from '../models/dtos/project/req/cloudflare';

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

    fastify.delete(
        APP_ROUTES.cloudflare.deleteBucket.endpoint,
        {
            schema: APP_ROUTES.cloudflare.deleteBucket.requestDtoSchema,
        },
        async (
            request: FastifyRequest<{ Params: RemoveBucketReqDto }>,
        ): Promise<void> => cloudflareController.deleteBucket(request),
    );

    fastify.get(
        APP_ROUTES.cloudflare.listObjects.endpoint,
        {
            schema: APP_ROUTES.cloudflare.listObjects.requestDtoSchema,
        },
        async (
            request: FastifyRequest<{ Params: ListObjectsReqDto }>,
        ): Promise<ListObjectsResDto> =>
            cloudflareController.listObjects(request),
    );

    fastify.delete(
        APP_ROUTES.cloudflare.deleteObject.endpoint,
        {
            schema: APP_ROUTES.cloudflare.deleteObject.requestDtoSchema,
        },
        async (
            request: FastifyRequest<{ Params: DeleteObjectReqDto }>,
        ): Promise<void> => cloudflareController.deleteObject(request),
    );

    fastify.post(
        APP_ROUTES.cloudflare.uploadObject.endpoint,
        {
            schema: APP_ROUTES.cloudflare.uploadObject.requestDtoSchema,
        },
        async (
            request: FastifyRequest<{ Params: UploadObjectReqDto }>,
        ): Promise<void> => cloudflareController.uploadObject(request),
    );
};
