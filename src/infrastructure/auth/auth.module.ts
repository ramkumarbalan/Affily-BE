import { HttpModule, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { UnauthorizedExceptionFilter } from '../exception-filter/unauthorized-exception-filter';

@Module({
    imports: [HttpModule],
    providers: [
        {
			provide: APP_FILTER,
			useClass: UnauthorizedExceptionFilter,
		}
    ]
})
export class AuthModule {}
