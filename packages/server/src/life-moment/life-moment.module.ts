import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LifeMomentController } from './life-moment.controller';
import { LifeMomentService } from './life-moment.service';
import { LifeMoment, LifeMomentSchema } from './schemas/life-moment.schema';

/**
 * 生活片段模块
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LifeMoment.name, schema: LifeMomentSchema }
    ])
  ],
  controllers: [LifeMomentController],
  providers: [LifeMomentService],
  exports: [LifeMomentService]
})
export class LifeMomentModule {}
