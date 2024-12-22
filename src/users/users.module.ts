import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../auth/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Lier le schéma User
  ],
  controllers: [UsersController], // Lier le contrôleur Users
  providers: [UsersService], // Lier le service Users
  exports: [UsersService], // Exporter le service pour une utilisation dans d'autres modules si nécessaire
})
export class UsersModule {}
