import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import Task from '../infra/typeorm/entities/Tasks';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import ITasksRepository from '../repositories/ITasksRepository';
import ICategoriesRepository from '../../categories/repositories/ICategoriesRepository';

@injectable()
class CreateTaskService {
  constructor(
    @inject('tasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('categoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    name,
    observation,
    category: {
      name: category_name
    },
    difficulty,
    dueDate
  }: ICreateTaskDTO): Promise<Task | undefined> {

    let category = await this.categoriesRepository.findByName(category_name);

    if (!category) {
      category = await this.categoriesRepository.createCategory({ name: category_name });
    }

    const task = await this.tasksRepository.createTask({
      name,
      observation,
      category,
      difficulty,
      dueDate,
    });

    return task;
  }
}

export default CreateTaskService;
