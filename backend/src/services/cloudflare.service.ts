import { FastifyRequest } from 'fastify';
import {
    CreateBucketResponse,
    ListBucketsResponse,
} from '../models/dtos/cloudflare/r2';
import {
    CreateBucketResDto,
    ListBucketsResDto,
} from '../models/dtos/project/res/cloudflare';
import { CloudflareRequestClient } from '../request-clients/cloudflare.request-client';
import { ProcessFailureError } from '../infrastructure/error/error';
import { CreateBucketReqDto } from '../models/dtos/project/req/cloudflare';

export class CloudflareService {
    private readonly cloudflareRequestClient: CloudflareRequestClient;

    constructor() {
        this.cloudflareRequestClient = new CloudflareRequestClient();
    }

    async listBuckets(request: FastifyRequest): Promise<ListBucketsResDto> {
        let listBucketsResponse: ListBucketsResponse = null;

        try {
            listBucketsResponse =
                await this.cloudflareRequestClient.listBuckets();
        } catch (error) {
            request.log.error(
                { error },
                'Cloudflare service - listBuckets - listBuckets',
            );
            throw new ProcessFailureError();
        }

        const listBucketsResDto: ListBucketsResDto = {
            buckets: listBucketsResponse.buckets.map((b) => ({
                name: b.name,
                creationDate: b.creation_date,
            })),
        };

        return listBucketsResDto;
    }

    async createBucket(
        request: FastifyRequest<{ Body: CreateBucketReqDto }>,
    ): Promise<CreateBucketResDto> {
        const { body } = request;

        const trimmedBucketName: string = body.bucketName.trim();
        let createBucketResponse: CreateBucketResponse = null;

        try {
            createBucketResponse =
                await this.cloudflareRequestClient.createBucket(
                    trimmedBucketName,
                );
        } catch (error) {
            request.log.error(
                { error },
                'Cloudflare service - createBucket - createBucket',
            );
            throw new ProcessFailureError();
        }

        const createBucketResDto: CreateBucketResDto = {
            name: createBucketResponse.name,
        };

        return createBucketResDto;
    }
}
