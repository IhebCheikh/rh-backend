// src/users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { User } from '../auth/schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Créer un nouvel employé
  @Post('create-employee')
  createEmployee(@Body() createUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // Récupérer tous les employés
  @Get('employees')
  findAllEmployees(): Promise<User[]> {
    return this.usersService.findAllEmployees();
  }

  // Récupérer un employé par son ID
  @Get('employees/:id')
  findEmployeeById(@Param('id') id: string): Promise<User> {
    return this.usersService.findEmployeeById(id);
  }

  // Mettre à jour le département et la date de départ d'un employé
  @Put('employees/:id')
  updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<User> {
    return this.usersService.updateEmployee(id, updateEmployeeDto);
  }

  // Supprimer un employé
  @Delete('employees/:id')
  deleteEmployee(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteEmployee(id);
  }
}
