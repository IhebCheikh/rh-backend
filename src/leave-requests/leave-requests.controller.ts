import { Controller, Post, Get, Patch, Body, Param, UseGuards, Req } from "@nestjs/common";
import { LeaveRequestsService } from './leave-requests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('leave-requests')

export class LeaveRequestsController {
  constructor(private readonly leaveRequestsService: LeaveRequestsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createLeaveRequest(@Body() createLeaveDto: { employeeId: string; type: string; startDate: Date; endDate: Date }) {
    return this.leaveRequestsService.createLeaveRequest(
      createLeaveDto.employeeId,
      createLeaveDto.type,
      createLeaveDto.startDate,
      createLeaveDto.endDate,
    );
  }

  @Get()
  getAllLeaveRequests() {
    return this.leaveRequestsService.getLeaveRequests();
  }
  @Get('my-requests/:userId')
  async getMyLeaveRequests(@Param('userId') userId: string) {
    console.log(this.leaveRequestsService.getUserLeaveRequests(userId));
    return this.leaveRequestsService.getUserLeaveRequests(userId);
  }
  @Patch(':id/approve')
  approveLeaveRequest(@Param('id') id: string) {
    return this.leaveRequestsService.approveLeaveRequest(id);
  }

  @Patch(':id/reject')
  rejectLeaveRequest(@Param('id') id: string) {
    return this.leaveRequestsService.rejectLeaveRequest(id);
  }
}
