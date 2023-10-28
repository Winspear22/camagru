import { UserEntity } from './auth/entities/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: '172.18.0.2',
          port: 5432,
          username: 'user',
          password: '1234',
          database: 'pong_db',
          entities: [UserEntity],
          synchronize: true,
        });
  
        return dataSource.initialize();
      },
    },
  ];