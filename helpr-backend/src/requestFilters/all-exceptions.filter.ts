import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggerService } from 'src/entities/logger/logger.service';
 
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    constructor(
        private readonly loggerService: LoggerService
    ){
        super();
    }

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let statusForLog = 0;
    
        const message = (exception instanceof Error) ? exception.message : exception.message.error;
    
        if (exception.status === HttpStatus.NOT_FOUND) {
            status = HttpStatus.NOT_FOUND;
            statusForLog = 404;
        }
    
        if (exception.status === HttpStatus.SERVICE_UNAVAILABLE) {
            status = HttpStatus.SERVICE_UNAVAILABLE;
            statusForLog = 503;
        }
    
        if (exception.status === HttpStatus.NOT_ACCEPTABLE) {
            status = HttpStatus.NOT_ACCEPTABLE;
            statusForLog = 406;
        }
    
        if (exception.status === HttpStatus.EXPECTATION_FAILED) {
            status = HttpStatus.EXPECTATION_FAILED;
            statusForLog = 417;
        }
    
        if (exception.status === HttpStatus.BAD_REQUEST) {
            status = HttpStatus.BAD_REQUEST;
            statusForLog = 400;
        }

        const logger = {
            success: false,
            message: message,
            httpStatusCode: statusForLog,
            isBackEnd: true,
            isFrontEnd: false,
            timestamp: new Date().toISOString()
        }

        this.loggerService.create(logger);
    
        response
        .status(status)
        .json({
            status,
            success: false,
            data: [],
            error: message,
            message: (status === HttpStatus.INTERNAL_SERVER_ERROR) ? 'Sorry we are experiencing technical problems.' : '',
        });
    }
}