import configuration, {
    CloudflareConfig,
} from '../configuration/configuration';
import { CLOUDFLARE_R2_ENDPOINTS } from '../constants/cloudflare';
import { R2Client } from '../infrastructure/r2';
import {
    CreateBucketRequest,
    CreateBucketResponse,
    ListBucketsResponse,
    R2Response,
} from '../models/dtos/cloudflare/r2';

export class CloudflareRequestClient {
    private readonly r2Client: R2Client;
    private readonly cloudflareConfig: CloudflareConfig;

    constructor() {
        this.r2Client = new R2Client();
        this.cloudflareConfig = configuration().cloudflare;
    }

    async listBuckets(): Promise<ListBucketsResponse> {
        const listBucketsInfo = CLOUDFLARE_R2_ENDPOINTS.bucket.list;
        const method = listBucketsInfo.method;
        const endpoint = listBucketsInfo.endpoint(
            this.cloudflareConfig.accountId,
        );

        const response: R2Response<ListBucketsResponse> =
            await this.r2Client.request(endpoint, method);

        if (!response.success) {
            throw response.errors;
        }

        return response.result;
    }

    async createBucket(bucketName: string): Promise<CreateBucketResponse> {
        const createBucketInfo = CLOUDFLARE_R2_ENDPOINTS.bucket.create;
        const method = createBucketInfo.method;
        const endpoint = createBucketInfo.endpoint(
            this.cloudflareConfig.accountId,
        );

        const body: CreateBucketRequest = {
            name: bucketName,
        };

        const response: R2Response<CreateBucketResponse> =
            await this.r2Client.request(endpoint, method, body);

        if (!response.success) {
            throw response.errors;
        }

        return response.result;
    }
}
