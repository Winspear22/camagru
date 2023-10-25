import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv'; // Importez dotenv
dotenv.config({ path: '/home/adnen/Desktop/camagru/.env' });
dotenv.config();

async function bootstrap() 
{
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);
}
bootstrap();
