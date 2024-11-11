import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeaveRequest, LeaveStatus } from './schemas/leave-request.schema';

@Injectable()
export class LeaveRequestsService {
  constructor(
    @InjectModel(LeaveRequest.name)
    private leaveRequestModel: Model<LeaveRequest>,
  ) {}

  async createLeaveRequestt(
    employeeId: string,
    type: string,
    startDate: Date,
    endDate: Date,
  ): Promise<LeaveRequest> {
    const daysRequested =
      Math.ceil((+endDate - +startDate) / (1000 * 60 * 60 * 24)) + 1;
    const leaveRequest = new this.leaveRequestModel({
      employeeId,
      type,
      startDate,
      endDate,
      daysRequested,
    });
    return await leaveRequest.save();
  }
  async createLeaveRequest0(
    employeeId: string,
    type: string,
    startDate: Date,
    endDate: Date,
  ): Promise<LeaveRequest> {
    const daysRequested =
      Math.ceil((+endDate - +startDate) / (1000 * 60 * 60 * 24)) + 1;
    const leaveRequest = new this.leaveRequestModel({
      employeeId,
      type,
      startDate,
      endDate,
      daysRequested,
    });
    return await leaveRequest.save();
  }

  async createLeaveRequest(
    employeeId: string,
    type: string,
    startDate: Date,
    endDate: Date,
  ) {
    // Calcul des jours demandés
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysRequested = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    // Crée une nouvelle demande de congé
    const leaveRequest = new this.leaveRequestModel({
      employeeId,
      type,
      startDate,
      endDate,
      daysRequested,
    });

    return await leaveRequest.save();
  }

  async getLeaveRequests(): Promise<LeaveRequest[]> {
    return await this.leaveRequestModel.find();
  }
  async getUserLeaveRequests(employeeId: string): Promise<LeaveRequest[]> {
    console.log(this.leaveRequestModel.find({ employeeId }));
    return await this.leaveRequestModel.find({ employeeId });
  }
  async approveLeaveRequest(id: string): Promise<LeaveRequest> {
    const leaveRequest = await this.leaveRequestModel.findById(id);
    if (!leaveRequest) throw new NotFoundException('Request not found');
    leaveRequest.status = 'approved';
    return leaveRequest.save();
  }

  async rejectLeaveRequest(id: string): Promise<LeaveRequest> {
    const leaveRequest = await this.leaveRequestModel.findById(id);
    if (!leaveRequest) throw new NotFoundException('Request not found');
    leaveRequest.status = 'rejected';
    return leaveRequest.save();
  }
}
