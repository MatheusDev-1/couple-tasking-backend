import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import Task from '../infra/typeorm/entities/Tasks';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import ITasksRepository from '../repositories/ITasksRepository';

@injectable()
class CreateTaskService {
  constructor(
    @inject('tasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({
    name,
    observation,
    category,
    difficulty,
    dueDate
  }: ICreateTaskDTO): Promise<Task | undefined> {
    const newTask = await this.tasksRepository.createTask({
      name,
      observation,
      category,
      difficulty,
      dueDate
    });

    return newTask;
  }
}

export default CreateTaskService;
