import { FastifyRequest } from 'fastify';
import { ListBucketsResponse } from '../models/dtos/cloudflare/r2';
import { ListBucketsResDto } from '../models/dtos/project/cloudflare';
import { CloudflareRequestClient } from '../request-clients/cloudflare.request-client';

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
                `Cloudflare service - listBuckets - listBuckets: ${error}`,
            );
            throw error;
        }

        const listBucketsResDto: ListBucketsResDto = {
            buckets: listBucketsResponse.buckets?.map((b) => ({
                name: b.name,
                creationDate: b.creation_date,
            })),
        };

        return listBucketsResDto;
    }
}
