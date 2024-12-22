import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class TimeSheet extends Document {
  @Prop({ type: String, required: true })
  employeeId: string; // ID de l'employé

  @Prop({ type: Date, required: true })
  date: Date; // Date de la journée de travail

  @Prop({ type: Number, required: true })
  hoursWorked: number; // Nombre d'heures travaillées

  @Prop({ type: Boolean, default: false })
  validatedByHR: boolean; // Statut de validation par les RH
}

export const TimeSheetSchema = SchemaFactory.createForClass(TimeSheet);
