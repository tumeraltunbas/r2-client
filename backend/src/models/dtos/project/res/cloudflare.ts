export class ListBucketsResDto {
    buckets: {
        name: string;
        creationDate: string;
    }[];
}

export class CreateBucketResDto {
    name: string;
}
