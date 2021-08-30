import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule,
		AuthModule,
	],
	providers: [],
	exports: [],
})
export class InfrastructureModule {
}
