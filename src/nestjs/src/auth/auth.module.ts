import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { IntraStrategy } from './strategies/42.strategy';

@Module({
	imports: [PassportModule.register({ defaultStrategy: '42' })],
	controllers: [AuthController],
	providers: [AuthService, IntraStrategy], // Ajoutez votre stratégie aux providers
  })
  export class AuthModule {}
  