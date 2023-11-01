import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

//@Module({
//  imports: [TypeOrmModule.forRoot({
//      type: 'postgres',
//      host: process.env.POSTGRES_HOST || 'postgresql',
//      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
//      username: process.env.POSTGRES_USER,
//      password: process.env.POSTGRES_PASSWORD,
//      database: process.env.POSTGRES_DB,
//      entities: [UserEntity],
//      synchronize: true,
//    }), AuthModule, UserModule],
//  controllers: [AppController],
//  providers: [AppService],
//})
//export class AppModule {}


// Qd NestJS est en dehors de contenur
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // no need to import into other modules
  }),
  AuthModule,
  UserModule,
  MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
