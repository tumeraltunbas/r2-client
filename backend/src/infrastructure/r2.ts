import configuration, {
    CloudflareConfig,
} from '../configuration/configuration';
import { HTTP_HEADERS, HTTP_METHODS } from '../constants/enums';
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
                'Content-Type': 'application/json',
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
