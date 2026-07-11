import { JAVASCRIPT_DATA_TYPES } from './enums';

export const GLOBAL_PREFIX = '/cloudflare';

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
        listObjects: {
            endpoint: '/buckets/:name/objects',
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
        deleteObject: {
            endpoint: '/buckets/:name/objects/:key',
            requestDtoSchema: {
                params: {
                    type: JAVASCRIPT_DATA_TYPES.OBJECT,
                    properties: {
                        name: {
                            type: JAVASCRIPT_DATA_TYPES.STRING,
                            minLength: 1,
                        },
                        key: {
                            type: JAVASCRIPT_DATA_TYPES.STRING,
                            minLength: 1,
                        },
                    },
                    required: ['name', 'key'],
                },
            },
        },
        uploadObject: {
            endpoint: '/buckets/:name/objects',
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
