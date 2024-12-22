import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { PerformanceReview } from './schemas/performance.schema';

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  // Créer une nouvelle évaluation
  @Post()
  async createReview(@Body() reviewData: Partial<PerformanceReview>): Promise<PerformanceReview> {
    return this.performanceService.createReview(reviewData);
  }

  // Récupérer les évaluations d'un employé
  @Get(':employeeId')
  async getReviewsByEmployee(@Param('employeeId') employeeId: string): Promise<PerformanceReview[]> {
    return this.performanceService.getReviewsByEmployee(employeeId);
  }

  // Récupérer toutes les évaluations (pour les RH)
  @Get('reviews')
  async getAllReviews(): Promise<PerformanceReview[]> {
    return this.performanceService.getAllReviews();
  }

  // Mettre à jour une évaluation
  @Patch('reviews/:reviewId')
  async updateReview(
    @Param('reviewId') reviewId: string,
    @Body() updates: Partial<PerformanceReview>,
  ): Promise<PerformanceReview> {
    return this.performanceService.updateReview(reviewId, updates);
  }

  // Supprimer une évaluation
  @Delete(':reviewId')
  async deleteReview(@Param('reviewId') reviewId: string): Promise<void> {
    return this.performanceService.deleteReview(reviewId);
  }
}
