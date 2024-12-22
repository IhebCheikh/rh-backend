import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { PerformanceModule } from './performance/performance.module';
import { LeaveRequestsModule } from './leave-requests/leave-requests.module';
import { TimeSheetModule } from './time-sheet/time-sheet.module';

@Module({
  imports: [
    PerformanceModule,
    LeaveRequestsModule,
    UsersModule,
    TimeSheetModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://iheb:iheb@cluster0.eja8elm.mongodb.net/GrhDB',
    ),
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
