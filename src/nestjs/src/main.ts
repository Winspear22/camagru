import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv'; // Importez dotenv
dotenv.config({ path: '/home/adnen/Desktop/camagru/.env' });


dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log(process.env.POSTGRES_HOST);
  console.log(process.env.POSTGRES_PORT);
  console.log(process.env.POSTGRES_USER);
  console.log(process.env.POSTGRES_PASSWORD);
  console.log(process.env.POSTGRES_DB);
  const myVariable = process.env.POSTGRES_DB;
  console.log(myVariable);

  await app.listen(3000);
}
bootstrap();
