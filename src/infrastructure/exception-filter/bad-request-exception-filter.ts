import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter, Logger} from '@nestjs/common';
import {Response} from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // @ts-ignore
        const i18n = ctx.args[0].i18nService;
        // @ts-ignore
        const lang = ctx.args[0].i18nLang;
        const status = exception.getStatus();
        Logger.log(exception);
        let errors = [];

        response.status(status).json({
            status,
            message: exception.message,
            errors,
        });
    }
}
