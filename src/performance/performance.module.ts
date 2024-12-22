import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PerformanceService } from './performance.service';
import { PerformanceController } from './performance.controller';
import { PerformanceReview, PerformanceSchema } from "./schemas/performance.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PerformanceReview.name, schema: PerformanceSchema }]),
  ],
  controllers: [PerformanceController],
  providers: [PerformanceService],
  exports: [PerformanceService],
})
export class PerformanceModule {}
