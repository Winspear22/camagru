import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';



// Qd NestJS est en dehors de contenur
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  AuthModule,
  UserModule,
  MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
