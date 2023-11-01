import { UserEntity } from 'src/auth/entities/user.entity';
import { DataSource } from 'typeorm';

/*export const databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: '172.18.0.2',
          port: 5432,
          username: 'user',
          password: '1234',
          database: 'camagru_db',
          entities: [UserEntity],
          synchronize: true,
        });
  
        return dataSource.initialize();
      },
    },
  ];*/

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: '172.19.0.2',//process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10),
        username: process.env.POSTGRES_USER,//'user',
        password: process.env.POSTGRES_PASSWORD,//'1234',
        database: 'camagru_db',//process.env.POSTGRES_DB,//'camagru_db',
        entities: [UserEntity],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];