import { FastifyRequest } from 'fastify';
import { CloudflareService } from '../services/cloudflare.service';
import { ListBucketsResDto } from '../models/dtos/project/cloudflare';

export class CloudflareController {
    private readonly cloudflareService: CloudflareService;

    constructor() {
        this.cloudflareService = new CloudflareService();
    }

    async listBuckets(request: FastifyRequest): Promise<ListBucketsResDto> {
        return this.cloudflareService.listBuckets(request);
    }
}
