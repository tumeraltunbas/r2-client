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

export class UploadObjectReqDto {
    name: string;
}

export class GetObjectReqDto {
    name: string;
    key: string;
}
