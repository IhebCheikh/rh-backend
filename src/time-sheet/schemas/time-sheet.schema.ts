import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class TimeSheet extends Document {
  @Prop({ type: String, required: true })
  employeeId: string; // ID de l'employé

  @Prop({ type: String, required: true })
  employeeName: string; // Nom de l'employé

  @Prop({ type: Date, required: true })
  date: Date; // Date de la journée de travail

  @Prop({ type: Boolean, default: false })
  session1: boolean; // Première séance de travail

  @Prop({ type: Boolean, default: false })
  session2: boolean; // Deuxième séance de travail

  @Prop({ type: Boolean, default: false })
  session3: boolean; // Troisième séance de travail

  @Prop({ type: Boolean, default: false })
  session4: boolean; // Quatrième séance de travail

  @Prop({ type: Boolean, default: false })
  validatedByHR: boolean; // Statut de validation par les RH
}

export const TimeSheetSchema = SchemaFactory.createForClass(TimeSheet);
