import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeSheet } from './schemas/time-sheet.schema';

@Injectable()
export class TimeSheetService {
  constructor(
    @InjectModel(TimeSheet.name) private timeSheetModel: Model<TimeSheet>,
  ) {}

  async createTimeSheet(employeeId: string, date: Date, hoursWorked: number) {
    const newTimeSheet = new this.timeSheetModel({
      employeeId,
      date,
      hoursWorked,
    });
    return newTimeSheet.save();
  }

  async validateTimeSheet(id: string) {
    return this.timeSheetModel.findByIdAndUpdate(id, { validatedByHR: true });
  }

  async updateTimeSheet(id: string, hoursWorked: number) {
    return this.timeSheetModel.findByIdAndUpdate(id, { hoursWorked });
  }

  async getTimeSheetsByEmployee(employeeId: string) {
    return this.timeSheetModel.find({ employeeId });
  }
}
