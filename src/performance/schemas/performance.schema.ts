import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class PerformanceReview extends Document {
  @Prop({ required: true })
  employeeId: string; // ID de l'employé évalué

  @Prop({ required: true })
  employeeName: string; // Nom de l'employé évalué

  @Prop({ required: true })
  reviewerId: string; // ID du RH ou de l'évaluateur

  @Prop({ required: true })
  reviewerName: string; // Nom du RH ou de l'évaluateur

  @Prop({ required: true })
  reviewPeriod: string; // Période d'évaluation

  @Prop({ type: Map, of: Number }) // Notes sur différents critères
  scores: Map<string, number>; // Exemple : { "Travail d'équipe": 4, "Productivité": 5 }

  @Prop()
  comments: string; // Commentaires sur la performance

}

export const PerformanceSchema = SchemaFactory.createForClass(PerformanceReview);
