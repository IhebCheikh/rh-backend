// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  // Créer un nouvel utilisateur avec le rôle 'employee' par défaut
  async create(createUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  // Récupérer tous les employés (utilisateurs avec le rôle 'employee')
  async findAllEmployees(): Promise<User[]> {
    return this.userModel.find({ role: 'employee' }).exec();
  }

  // Récupérer un employé par son ID
  async findEmployeeById(id: string): Promise<User> {
    const employee = await this.userModel.findOne({ _id: id, role: 'employee' });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  // Mettre à jour le département et la date de départ d'un employé
  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<User> {
    const updatedEmployee = await this.userModel.findOneAndUpdate(
      { _id: id, role: 'employee' },
      { $set: updateEmployeeDto },
      { new: true },
    );
    if (!updatedEmployee) throw new NotFoundException('Employee not found');
    return updatedEmployee;
  }

  // Supprimer un employé par son ID
  async deleteEmployee(id: string): Promise<User> {
    const deletedEmployee = await this.userModel.findOneAndDelete({ _id: id, role: 'employee' });
    if (!deletedEmployee) throw new NotFoundException('Employee not found');
    return deletedEmployee;
  }
}
