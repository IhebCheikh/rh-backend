import { Controller, Post, Body, Param, Put, Get, BadRequestException, Query } from "@nestjs/common";
import { TimeSheetService } from './time-sheet.service';

@Controller('time-sheets')
export class TimeSheetController {
  constructor(private readonly timeSheetService: TimeSheetService) {}

  // Méthode pour créer une feuille de temps
  @Post('create')
  async create(@Body() body: any) {
    const { employeeId, employeeName, date, session1 , session2 , session3 , session4 } = body;
    console.log("body");
    console.log(body);
    console.log("champs");
    console.log({ employeeId, employeeName, date, session1 , session2 , session3 , session4  });
    console.log("champs 1/1");
    console.log(employeeId, employeeName, date, session1 , session2 , session3 , session4  );

    return await this.timeSheetService.createTimeSheet(employeeId, employeeName, date,  session1 ,session2 , session3 , session4 );
  }

  // Méthode pour valider une feuille de temps
  @Put('validate/:id')
  validate(@Param('id') id: string) {
    return this.timeSheetService.validateTimeSheet(id);
  }

  // Méthode pour mettre à jour une feuille de temps
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() { session1, session2, session3, session4 }: { session1: boolean; session2: boolean; session3: boolean; session4: boolean },
  ) {
    console.log(session1, session2, session3, session4 );
    return this.timeSheetService.updateTimeSheet(id, { session1, session2, session3, session4 });
  }

  // Méthode pour récupérer les feuilles de temps d'un employé
  @Get('employee/:employeeId')
  getTimeSheets(@Param('employeeId') employeeId: string) {
    return this.timeSheetService.getTimeSheetsByEmployee(employeeId);
  }

  // Méthode pour récupérer les feuilles de temps d'un employé pour un mois donné
  @Get()
  async getTimeSheetsByEmployeeAndMonth(
    @Query('employeeId') employeeId: string,
    @Query('month') month: string,
  ) {
    console.log('Query Parameters:', { employeeId, month });
    if (!employeeId || !month) {
      throw new BadRequestException('Ctrlr employeeId et month sont requis.');
    }
    return this.timeSheetService.getTimeSheetsByEmployeeAndMonth(employeeId, month);
  }
}
