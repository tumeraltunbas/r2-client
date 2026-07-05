export function buildCloudflareRequestUrl(
    apiUrl: string,
    version: string,
    endpoint: string,
): string {
    return `${apiUrl}/${version}/${endpoint}`;
}
