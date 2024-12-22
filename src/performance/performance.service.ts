import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PerformanceReview } from './schemas/performance.schema';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectModel(PerformanceReview.name) private readonly performanceModel: Model<PerformanceReview>,
  ) {}

  // Créer une nouvelle évaluation
  async createReview(data: Partial<PerformanceReview>): Promise<PerformanceReview> {
    const newReview = new this.performanceModel(data);
    return await newReview.save();
  }

  // Récupérer les évaluations d'un employé
  async getReviewsByEmployee(employeeId: string): Promise<PerformanceReview[]> {
    return this.performanceModel.find({ employeeId }).exec();
  }

  // Récupérer toutes les évaluations pour les RH
  async getAllReviews(): Promise<PerformanceReview[]> {
    return this.performanceModel.find().exec();
  }

  // Mettre à jour une évaluation existante
  async updateReview(reviewId: string, updates: Partial<PerformanceReview>): Promise<PerformanceReview> {
    const updatedReview = await this.performanceModel
      .findByIdAndUpdate(reviewId, updates, { new: true })
      .exec();
    if (!updatedReview) {
      throw new NotFoundException(`Évaluation avec l'ID ${reviewId} introuvable`);
    }
    return updatedReview;
  }

  // Supprimer une évaluation (si nécessaire)
  async deleteReview(reviewId: string): Promise<void> {
    const result = await this.performanceModel.findByIdAndDelete(reviewId).exec();
    if (!result) {
      throw new NotFoundException(`Évaluation avec l'ID ${reviewId} introuvable`);
    }
  }
}
