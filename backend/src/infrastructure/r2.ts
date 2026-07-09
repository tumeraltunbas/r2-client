import configuration, {
    CloudflareConfig,
} from '../configuration/configuration';
import { CONTENT_TYPES, HTTP_HEADERS, HTTP_METHODS } from '../constants/enums';
import { buildCloudflareRequestUrl } from '../utils/str';

export class R2Client {
    async request<T>(
        endpoint: string,
        method: HTTP_METHODS,
        body?: any,
    ): Promise<T> {
        const cloudflareConfig: CloudflareConfig = configuration().cloudflare;

        const fetchOptions: RequestInit = {
            method,
            headers: {
                [HTTP_HEADERS.AUTHORIZATION]: `Bearer ${cloudflareConfig.apiToken}`,
                [HTTP_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.APPLICATION_JSON,
            },
        };

        const httpMethodsWithoutBody = [HTTP_METHODS.GET, HTTP_METHODS.DELETE];

        if (body && !httpMethodsWithoutBody.includes(method)) {
            fetchOptions.body = body;
        }

        const url = buildCloudflareRequestUrl(
            cloudflareConfig.apiUrl,
            cloudflareConfig.apiVersion,
            endpoint,
        );

        const response = await fetch(url, fetchOptions);
        return await response.json();
    }
}
