import { CONTENT_TYPES } from '../../../../constants/enums';

export class ListBucketsResDto {
    buckets: {
        name: string;
        creationDate: string;
    }[];
}

export class CreateBucketResDto {
    name: string;
}

export class ListObjectsResDto {
    objects: {
        key: string;
        size: number;
        lastModified: Date;
    }[];
}

export class GetObjectResDto {
    body: unknown;
    contentType: CONTENT_TYPES;
}
