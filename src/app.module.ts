import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task/entities/task.entity';
import { ObjectiveEntity } from './task/entities/objective.entity';
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('POSTGRES_HOST'),
        port: configService.getOrThrow<number>('POSTGRES_PORT'),
        username: configService.getOrThrow<string>('POSTGRES_USER'),
        password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: configService.getOrThrow<string>('POSTGRES_DATABASE'),
        entities: [TaskEntity, ObjectiveEntity],
        synchronize: true,
        migrationsRun: false,
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
