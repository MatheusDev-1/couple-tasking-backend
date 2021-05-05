import { container } from 'tsyringe';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import TasksRepository from '@modules/tasks/infra/typeorm/repositories/TasksRepository';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository'

container.registerSingleton<ITasksRepository>(
  'tasksRepository',
  TasksRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'categoriesRepository',
  CategoriesRepository,
);
