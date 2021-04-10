import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import ITasksRepository from '../repositories/ITasksRepository';

@injectable()
class DeleteTaskService {
  constructor(
    @inject('tasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute(id: string): Promise<any> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found');
    }
    
    await this.tasksRepository.deleteTask(task);
  }
}

export default DeleteTaskService;
