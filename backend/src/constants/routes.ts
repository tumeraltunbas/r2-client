import { JAVASCRIPT_DATA_TYPES } from './enums';

export const APP_ROUTES = {
    cloudflare: {
        listBuckets: {
            endpoint: '/buckets',
        },
        createBucket: {
            endpoint: '/buckets',
            requestDtoSchema: {
                body: {
                    type: JAVASCRIPT_DATA_TYPES.OBJECT,
                    properties: {
                        name: {
                            type: JAVASCRIPT_DATA_TYPES.STRING,
                            minLength: 1,
                        },
                    },
                    required: ['name'],
                },
            },
        },
        deleteBucket: {
            endpoint: '/buckets/:name',
            requestDtoSchema: {
                params: {
                    type: JAVASCRIPT_DATA_TYPES.OBJECT,
                    properties: {
                        name: {
                            type: JAVASCRIPT_DATA_TYPES.STRING,
                            minLength: 1,
                        },
                    },
                    required: ['name'],
                },
            },
        },
    },
} as const;
