import { container } from 'tsyringe';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import TasksRepository from '@modules/tasks/infra/typeorm/repositories/TasksRepository';

container.registerSingleton<ITasksRepository>(
  'tasksRepository',
  TasksRepository,
);
