import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeSheet } from './schemas/time-sheet.schema';

@Injectable()
export class TimeSheetService {
  constructor(
    @InjectModel(TimeSheet.name)
    private readonly timeSheetModel: Model<TimeSheet>,
  ) {}

  // Méthode pour créer une nouvelle feuille de temps
  async createTimeSheet1(
    employeeId: string,
    employeeName: string,
    date: Date,
    sessions: boolean[],
  ) {
    const newTimeSheet = new this.timeSheetModel({
      employeeId,
      employeeName,
      date,
      sessions,
    });

    return await newTimeSheet.save();
  }
  async createTimeSheet(
    employeeId: string,
    employeeName: string,
    date: Date,
    session1: boolean,
    session2: boolean,
    session3: boolean,
    session4: boolean,
  ) {
    const newTimeSheet = new this.timeSheetModel({
      employeeId,
      employeeName,
      date,
      session1,
      session2,
      session3,
      session4,
    });

    return await newTimeSheet.save();
  }

  // Méthode pour valider une feuille de temps
  async validateTimeSheet(id: string) {
    const timeSheet = await this.timeSheetModel.findById(id);
    if (!timeSheet) {
      throw new Error('Feuille de temps non trouvée');
    }
    timeSheet.validatedByHR = true;
    return await timeSheet.save();
  }

  // Méthode pour mettre à jour une feuille de temps
  async updateTimeSheet(
    id: string,
    sessions: {
      session1: boolean;
      session2: boolean;
      session3: boolean;
      session4: boolean;
    },
  ) {
    const timeSheet = await this.timeSheetModel.findById(id);
    if (!timeSheet) {
      throw new Error('Feuille de temps non trouvée');
    }
    console.log("update service");
    console.log(sessions);

    // Mise à jour des sessions
    timeSheet.session1 = sessions.session1 ?? timeSheet.session1;
    timeSheet.session2 = sessions.session2 ?? timeSheet.session2;
    timeSheet.session3 = sessions.session3 ?? timeSheet.session3;
    timeSheet.session4 = sessions.session4 ?? timeSheet.session4;

    return await timeSheet.save();
  }

  // Récupérer les feuilles de temps d'un employé pour un mois donné
  async getTimeSheetsByEmployeeAndMonth(
    employeeId: string,
    month: string,
  ): Promise<TimeSheet[]> {
    const startOfMonth = new Date(`${month}-01`);
    const endOfMonth = new Date(`${month}-01`);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    console.log("service",employeeId, month );

    return await this.timeSheetModel
      .find({
        employeeId,
        date: {
          $gte: startOfMonth.toISOString().split('T')[0],
          $lt: endOfMonth.toISOString().split('T')[0],
        },
      })
      .exec();
  }

  // Récupérer toutes les feuilles de temps d'un employé
  async getTimeSheetsByEmployee(employeeId: string): Promise<TimeSheet[]> {
    return await this.timeSheetModel.find({ employeeId }).exec();
  }
}
