import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { BackofficeController } from './backoffice.controller';
import { BackofficeService } from './backoffice.service';

@Module({
    imports: [CommonModule],
    controllers: [BackofficeController],
    providers: [BackofficeService]
})
export class BackofficeModule {}
