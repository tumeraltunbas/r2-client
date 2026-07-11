export class CreateBucketReqDto {
    name: string;
}

export class RemoveBucketReqDto {
    name: string;
}

export class ListObjectsReqDto {
    name: string;
}

export class DeleteObjectReqDto {
    name: string;
    key: string;
}
