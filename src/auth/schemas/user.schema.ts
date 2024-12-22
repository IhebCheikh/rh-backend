import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from '@nestjs/class-validator';

export type UserRole = 'admin' | 'RH' | 'employee';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'employee' })
  role: UserRole;

  @IsOptional()
  @Prop({ default: 'employee' })
  department: string;

  @IsOptional()
  @Prop()
  startDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
