import { CacheInterceptor, CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
	async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
		const key = this.trackBy(context);

		if (!key) {
			return next.handle();
		}
		try {
			const value = await this.cacheManager.get(key);
			if (value) {
				return of(value);
			}

			return next.handle().pipe(
				tap(response => {
				}),
			);
		} catch {
			return next.handle();
		}
	}

	trackBy(context: ExecutionContext): string | undefined {
		const request = context.getArgByIndex(0);
		const lang = request.headers['accept-language'] || 'en';
		const httpAdapter = this.httpAdapterHost.httpAdapter;
		if (httpAdapter.getRequestMethod(request) !== 'GET') {
			return undefined;
		}
		return httpAdapter.getRequestUrl(request) + '_' + lang;
	}
}
