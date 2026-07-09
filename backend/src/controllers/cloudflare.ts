import { FastifyRequest } from 'fastify';
import { CloudflareService } from '../services/cloudflare.service';
import {
    CreateBucketResDto,
    ListBucketsResDto,
} from '../models/dtos/project/res/cloudflare';
import {
    CreateBucketReqDto,
    RemoveBucketReqDto,
} from '../models/dtos/project/req/cloudflare';

export class CloudflareController {
    private readonly cloudflareService: CloudflareService;

    constructor() {
        this.cloudflareService = new CloudflareService();
    }

    async listBuckets(request: FastifyRequest): Promise<ListBucketsResDto> {
        return this.cloudflareService.listBuckets(request);
    }

    async createBucket(
        request: FastifyRequest<{ Body: CreateBucketReqDto }>,
    ): Promise<CreateBucketResDto> {
        return this.cloudflareService.createBucket(request);
    }

    async deleteBucket(
        request: FastifyRequest<{ Params: RemoveBucketReqDto }>,
    ): Promise<void> {
        return this.cloudflareService.deleteBucket(request);
    }
}
