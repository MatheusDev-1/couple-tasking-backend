import { getRepository, Repository, EntityRepository } from 'typeorm';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

import Task from '../entities/Tasks';
import IFindTasksDTO from '@modules/tasks/dtos/IFindTasksDTO';

@EntityRepository(Task)
class TasksRepository
  extends Repository<Task>
  implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    super();
    this.ormRepository = getRepository(Task);
  }

  public async findTasks(data: IFindTasksDTO): Promise<Task[]> {
    const tasks = await this.ormRepository.find({
      where: data,
      relations: ['category'],
    })

    return tasks;
  }

  public async findById(id: string): Promise<Task | undefined> {
    const task = await this.ormRepository.findOne({ id });

    if (task) {
      return task;
    }

    return undefined;
  };

  public async createTask({ name, observation, category, difficulty, dueDate }: ICreateTaskDTO): Promise<Task> {
    const newTask = await this.ormRepository.create({
      name,
      observation,
      category,
      difficulty,
      dueDate
    });

    await this.saveORM(newTask);

    return newTask;
  }

  public async deleteTask(task: Task): Promise<void> {
    this.ormRepository.remove(task);
  }

  public async saveORM(task: Task): Promise<Task> {
    return this.ormRepository.save(task);
  }
}

export default TasksRepository;
