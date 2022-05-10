import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfig from '../config/env';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envConfig.path,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: ['dist/src/**/entities/*.entity{.ts,.js}'], // 按路径引入实体
        // autoLoadEntities: true, // 通过module中import()的TypeOrmModule.forFeature自动引入实体
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        timezone: configService.get('DB_TIMEZONE', '+08:00'),
        synchronize: configService.get('DB_SYNCHRONIZE', false),
      }),
    }),
    UserModule,
  ],
})
export class AppModule {}
