import { FastifyReply, FastifyRequest } from 'fastify';
import { BusinessRuleError, ProcessFailureError } from './error';
import { HTTP_STATUS_CODES } from '../../constants/enums';

export function errorHandler(
    error: ProcessFailureError,
    request: FastifyRequest,
    reply: FastifyReply,
): void {
    if (!(error instanceof ProcessFailureError)) {
        error = new ProcessFailureError();
    }

    let statusCode: number = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

    if (error instanceof BusinessRuleError) {
        statusCode = HTTP_STATUS_CODES.UNPROCESSABLE_CONTENT;
    }

    const data = { code: error.code, message: error.message };
    reply.log.error({ ...data });
    reply.status(statusCode).send(data);
}
