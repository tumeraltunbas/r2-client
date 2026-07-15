import { CONTENT_TYPES } from '../constants/enums';

export async function parseResponseBody(
    response: Response,
    contentType: CONTENT_TYPES,
): Promise<unknown> {
    if (!contentType) {
        return Buffer.from(await response.arrayBuffer());
    }

    switch (contentType) {
        case CONTENT_TYPES.APPLICATION_JSON:
            return await response.json();

        case CONTENT_TYPES.TEXT_PLAIN:
        case CONTENT_TYPES.IMAGE_SVG:
            return await response.text();

        case CONTENT_TYPES.IMAGE_JPEG:
        case CONTENT_TYPES.IMAGE_PNG:
        case CONTENT_TYPES.IMAGE_GIF:
        case CONTENT_TYPES.IMAGE_WEBP:
        case CONTENT_TYPES.APPLICATION_PDF:
        case CONTENT_TYPES.APPLICATION_OCTET_STREAM:
            return Buffer.from(await response.arrayBuffer());

        default:
            return Buffer.from(await response.arrayBuffer());
    }
}
