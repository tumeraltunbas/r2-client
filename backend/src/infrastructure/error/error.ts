import { ERROR_CODES, ERROR_MESSAGES } from '../../constants/error';

export class ProcessFailureError extends Error {
    code: string;

    constructor() {
        super();
        this.code = ERROR_CODES.PROCESS_FAILURE_ERROR;
        this.message = ERROR_MESSAGES[ERROR_CODES.PROCESS_FAILURE_ERROR];
    }
}

export class BusinessRuleError extends ProcessFailureError {
    constructor(code: string) {
        super();
        this.code = code;
        this.message = ERROR_MESSAGES[code];
    }
}
