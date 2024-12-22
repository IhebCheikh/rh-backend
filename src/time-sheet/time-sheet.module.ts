import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeSheetService } from './time-sheet.service';
import { TimeSheetController } from './time-sheet.controller';
import { TimeSheet, TimeSheetSchema } from './schemas/time-sheet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeSheet.name, schema: TimeSheetSchema }]),
  ],
  controllers: [TimeSheetController],
  providers: [TimeSheetService],
  exports: [TimeSheetService],
})
export class TimeSheetModule {}
