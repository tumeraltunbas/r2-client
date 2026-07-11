import { FastifyRequest } from 'fastify';
import { CloudflareService } from '../services/cloudflare.service';
import {
    CreateBucketResDto,
    ListBucketsResDto,
    ListObjectsResDto,
} from '../models/dtos/project/res/cloudflare';
import {
    CreateBucketReqDto,
    DeleteObjectReqDto,
    ListObjectsReqDto,
    RemoveBucketReqDto,
    UploadObjectReqDto,
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

    async listObjects(
        request: FastifyRequest<{ Params: ListObjectsReqDto }>,
    ): Promise<ListObjectsResDto> {
        return this.cloudflareService.listObjects(request);
    }

    async deleteObject(
        request: FastifyRequest<{ Params: DeleteObjectReqDto }>,
    ): Promise<void> {
        return this.cloudflareService.deleteObject(request);
    }

    async uploadObject(
        request: FastifyRequest<{ Params: UploadObjectReqDto }>,
    ): Promise<void> {
        return this.cloudflareService.uploadObject(request);
    }
}
