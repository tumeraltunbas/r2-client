export class R2Response<T> {
    errors: R2Error[];
    messages: string[];
    result: T;
    success: boolean;
    result_info: {
        cursor: string;
        per_page: number;
    };
}

export class R2Error {
    code: number;
    message: string;
    documentation_url: string;
    source: {
        pointer: string;
    };
}

export class ListBucketsResponse {
    buckets: GetBucketResponse[];
}

export class GetBucketResponse {
    creation_date: string;
    jurisdiction: string;
    location: string;
    name: string;
    storage_class: string;
}
