import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { IntraStrategy } from './strategies/42.strategy';
import { UserProviders } from './entities/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module'; // Assurez-vous d'importer UserModule ici
import { UserService } from 'src/user/user.service';

@Module({
    imports: [UserModule, DatabaseModule], // Ajoutez UserModule ici
    controllers: [AuthController],
    providers: [AuthService, ...UserProviders],
	exports: [AuthService] 
})
export class AuthModule {}