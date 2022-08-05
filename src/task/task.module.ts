import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { ObjectiveEntity } from './entities/objective.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, ObjectiveEntity])],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
