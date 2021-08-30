import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './api/v1/common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './infrastructure/config/config.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoUrl(), config.mongoOptions()),
    InfrastructureModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
