import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from '../configs/app.config.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../configs/db.config.js';
import { APP_INTERCEPTOR } from '@nestjs/core';
import DataResponseInterceptor from '../common/interceptors/response.interceptor.js';
import { MailModule } from '../modules/mail/mail.module.js';
import { AuthModule } from '../modules/auth/auth.module.js';
import { UsersModule } from '../modules/users/users.module.js';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    MailModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}.local`,
      load: [appConfig, dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('dbConfig.host'),
        port: config.get<number>('dbConfig.port'),
        username: config.get<string>('dbConfig.user'),
        password: config.get<string>('dbConfig.password'),
        database: config.get<string>('dbConfig.database'),
        autoLoadEntities: config.get<boolean>('dbConfig.load'),
        synchronize: config.get<boolean>('dbConfig.host'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor
    }
  ],
})
export class AppModule {}
