import { Controller, Post, Get, Patch, Body, Param, UseGuards, Req, Query } from "@nestjs/common";
import { LeaveRequestsService } from './leave-requests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LeaveRequest } from './schemas/leave-request.schema';

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
    return this.leaveRequestsService.getUserLeaveRequests(userId);
  }
  @Get('search')
  async searchLeaveRequests(
    @Query('type') type?: string,
    @Query('status') status?: string,
  ): Promise<LeaveRequest[]> {
    const query = { type, status };
    return this.leaveRequestsService.searchLeaveRequests(query);
  }
  @Get('searchU')
  async searchUserLeaveRequests(
    @Query('userId') userId: string,
    @Query('type') type?: string,
    @Query('status') status?: string,
  ): Promise<LeaveRequest[]> {
    const query: any = { userId }; // Filtrer par utilisateur connecté
    if (type) query.type = type;
    if (status) query.status = status;

    return this.leaveRequestsService.searchUserLeaveRequests(query);
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
