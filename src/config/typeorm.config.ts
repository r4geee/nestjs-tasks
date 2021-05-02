import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 6543,
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs',
  autoLoadEntities: true,
  synchronize: true,
};
