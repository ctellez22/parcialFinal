import { Module } from '@nestjs/common';
import { AppintmentsService } from './appintments.service';
import { AppintmentsController } from './appintments.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Appintment } from './entities/appintment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appintment])],
  controllers: [AppintmentsController],
  providers: [AppintmentsService],
  exports: [AppintmentsService],
})
export class AppintmentsModule {}
