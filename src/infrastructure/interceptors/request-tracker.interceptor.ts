import { NestInterceptor, ExecutionContext, CallHandler, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServerResponse } from 'http';
import * as Express from 'express';
export class RequestTrackerInterceptor implements NestInterceptor {
    private readonly logger = new Logger(RequestTrackerInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const start = new Date();
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<Express.Request>();
        const res = ctx.getResponse<ServerResponse>();
        const method = req.method;
        const url = req.url;
        const route = req.route ? req.route.path : '';

        const data: { [key: string]: any } = {
            method,
            url,
            route,
        };
        data.ip = req.connection ? req.connection.remoteAddress : '';
        // data.headers = { ...req.headers };

        this.logger.log(JSON.stringify({ request: 'start', ...data }), 'RequestSTART');

        return next
            .handle()
            .pipe(
                tap(() => {

                    const ms = (new Date()).valueOf() - start.valueOf();
                    this.logger.log(JSON.stringify({
                        request: 'end',
                        code: res.statusCode,
                        ms,
                        method,
                        route,
                        url,
                    }), 'RequestEND');
                }),
            );
    }
}