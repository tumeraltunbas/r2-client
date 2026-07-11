import { HTTP_METHODS } from './enums';

export const CLOUDFLARE_R2_ENDPOINTS = {
    bucket: {
        list: {
            method: HTTP_METHODS.GET,
            endpoint: (accountId: string): string =>
                `accounts/${accountId}/r2/buckets`,
        },
        get: {
            method: HTTP_METHODS.GET,
            endpoint: (accountId: string, bucketName: string): string =>
                `accounts/${accountId}/r2/buckets/${bucketName}`,
        },
        create: {
            method: HTTP_METHODS.POST,
            endpoint: (accountId: string): string =>
                `accounts/${accountId}/r2/buckets`,
        },
        delete: {
            method: HTTP_METHODS.DELETE,
            endpoint: (accountId: string, bucketName: string): string =>
                `accounts/${accountId}/r2/buckets/${bucketName}`,
        },
    },
    object: {
        list: {
            method: HTTP_METHODS.GET,
            endpoint: (accountId: string, bucketName: string): string =>
                `accounts/${accountId}/r2/buckets/${bucketName}/objects`,
        },
    },
} as const;
