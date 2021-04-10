import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import Task from '../infra/typeorm/entities/Tasks';
import ITasksRepository from '../repositories/ITasksRepository';
import IFindTasksDTO from '../dtos/IFindTasksDTO';

@injectable()
class ListTasksService {
  constructor(
    @inject('tasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute(data: IFindTasksDTO): Promise<Task[]> {
    const tasks = await this.tasksRepository.findTasks(data);

    return tasks;
  }
}

export default ListTasksService;
