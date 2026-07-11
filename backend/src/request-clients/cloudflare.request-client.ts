import configuration, {
    CloudflareConfig,
} from '../configuration/configuration';
import { CLOUDFLARE_R2_ENDPOINTS } from '../constants/cloudflare';
import { R2Client } from '../infrastructure/r2';
import {
    CreateBucketRequest,
    CreateBucketResponse,
    DeleteBucketResponse,
    ListBucketsResponse,
    ListObjectsResponse,
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

    async deleteBucket(bucketName: string): Promise<DeleteBucketResponse> {
        const deleteBucketInfo = CLOUDFLARE_R2_ENDPOINTS.bucket.delete;
        const method = deleteBucketInfo.method;
        const endpoint = deleteBucketInfo.endpoint(
            this.cloudflareConfig.accountId,
            bucketName,
        );

        const response: R2Response<DeleteBucketResponse> =
            await this.r2Client.request(endpoint, method);

        if (!response.success) {
            throw response.errors;
        }

        return response.result;
    }

    async listObjects(bucketName: string): Promise<ListObjectsResponse[]> {
        const listObjectsInfo = CLOUDFLARE_R2_ENDPOINTS.object.list;
        const method = listObjectsInfo.method;
        const endpoint = listObjectsInfo.endpoint(
            this.cloudflareConfig.accountId,
            bucketName,
        );

        const response: R2Response<ListObjectsResponse[]> =
            await this.r2Client.request(endpoint, method);

        if (!response.success) {
            throw response.errors;
        }

        return response.result;
    }
}
