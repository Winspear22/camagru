import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { IntraStrategy } from './strategies/42.strategy';
import { UserProviders } from './entities/user.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	imports: [PassportModule.register({ defaultStrategy: '42' }), DatabaseModule],
	controllers: [AuthController],
	providers: [AuthService, IntraStrategy, ...UserProviders], // Ajoutez votre stratégie aux providers
  })
  export class AuthModule {}
  