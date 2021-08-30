import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './infrastructure/config/config.service';
import { RequestTrackerInterceptor } from './infrastructure/interceptors/request-tracker.interceptor';
import { ResponseTransformInterceptor } from './infrastructure/interceptors/response-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new RequestTrackerInterceptor(), new ResponseTransformInterceptor());
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
