import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeaveStatus = 'pending' | 'approved' | 'rejected';

@Schema({ timestamps: true })
export class LeaveRequest extends Document {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  type: string; // e.g., annual, sick, etc.

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: 'pending' })
  status: LeaveStatus;

  @Prop({ default: 0 })
  daysRequested: number;
}

export const LeaveRequestSchema = SchemaFactory.createForClass(LeaveRequest);
