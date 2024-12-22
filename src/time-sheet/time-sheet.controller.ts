import { Controller, Post, Body, Param, Put, Get } from '@nestjs/common';
import { TimeSheetService } from './time-sheet.service';

@Controller('time-sheets')
export class TimeSheetController {
  constructor(private readonly timeSheetService: TimeSheetService) {}

  @Post('create')
  create(@Body() { employeeId, date, hoursWorked }) {
    return this.timeSheetService.createTimeSheet(employeeId, date, hoursWorked);
  }

  @Put('validate/:id')
  validate(@Param('id') id: string) {
    return this.timeSheetService.validateTimeSheet(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() { hoursWorked }) {
    return this.timeSheetService.updateTimeSheet(id, hoursWorked);
  }

  @Get('employee/:employeeId')
  getTimeSheets(@Param('employeeId') employeeId: string) {
    return this.timeSheetService.getTimeSheetsByEmployee(employeeId);
  }
}
