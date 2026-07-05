import configuration, {
    CloudflareConfig,
} from '../configuration/configuration';
import { CloudflareR2Endpoints } from '../constants/cloudflare';
import { R2Client } from '../infrastructure/r2';
import { ListBucketsResponse, R2Response } from '../models/dtos/cloudflare/r2';

export class CloudflareRequestClient {
    private readonly r2Client: R2Client;
    private readonly cloudflareConfig: CloudflareConfig;

    constructor() {
        this.r2Client = new R2Client();
        this.cloudflareConfig = configuration().cloudflare;
    }

    async listBuckets(): Promise<ListBucketsResponse> {
        const listBucketsInfo = CloudflareR2Endpoints.bucket.list;
        const method = listBucketsInfo.method;
        const endpoint = listBucketsInfo.endpoint(
            this.cloudflareConfig.accountId,
        );

        const response: R2Response<ListBucketsResponse> =
            await this.r2Client.request(endpoint, method);

        return response.result;
    }
}
