import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import {
    BusinessRuleError,
    ProcessFailureError,
    ValidationError,
} from './error';
import { HTTP_STATUS_CODES } from '../../constants/enums';
import { VALIDATION_ERRORS } from '../../constants/error';

export function errorHandler(
    error: ProcessFailureError | FastifyError,
    request: FastifyRequest,
    reply: FastifyReply,
): void {
    if (error.code === VALIDATION_ERRORS.FST_ERR_VALIDATION) {
        const validationErrorMessages: string[] = (
            error as FastifyError
        ).validation.map((v) => v.message);

        error = new ValidationError(validationErrorMessages);
    }

    if (!(error instanceof ProcessFailureError)) {
        error = new ProcessFailureError();
    }

    let data = {};

    if (!(error instanceof ValidationError)) {
        data = {
            code: error.code,
            message: error.message,
        };
    } else {
        data = {
            code: error.code,
            messages: error.messages,
        };
    }

    const statusCode: number = decideStatusCode(error);
    reply.log.error({ ...data });
    reply.status(statusCode).send(data);
}

export function decideStatusCode(error: ProcessFailureError): number {
    let statusCode: number = undefined;

    switch (error.constructor) {
        case BusinessRuleError:
            statusCode = HTTP_STATUS_CODES.UNPROCESSABLE_CONTENT;
            break;
        case ValidationError:
            statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
            break;
        default:
            statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
            break;
    }

    return statusCode;
}
