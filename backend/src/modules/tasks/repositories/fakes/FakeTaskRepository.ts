import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import ICreateUserDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import { v4 as uuid_v4 } from 'uuid';

import IFindTasksDTO from '@modules/tasks/dtos/IFindTasksDTO';
import Task from '../../infra/typeorm/entities/Tasks';

class FakeTaskRepository implements ITasksRepository {
  private tasks: Task[] = [];

  public async findTasks(data: IFindTasksDTO): Promise<Task[]> {
    if (Object.keys(data).length >= 1) {
      const queriedTasks = this.tasks.filter(
        task =>
          task.category === data.category ||
          task.difficulty === data.difficulty ||
          task.dueDate === data.dueDate
      );

      return queriedTasks;
    }

    return this.tasks;
  }

  public async findById(id: string): Promise<Task | undefined> {
    const task = this.tasks.find(task => task.id === id);

    return task;
  }

  public async createTask(taskData: ICreateUserDTO): Promise<Task> {
    const task = new Task();

    Object.assign(task, { id: uuid_v4() }, taskData);

    this.tasks.push(task);

    return task;
  }


  public async deleteTask(task: Task): Promise<Task[]> {
    const toDeleteIndex = this.tasks.indexOf(task);

    return this.tasks.splice(toDeleteIndex, 1);
  }

  public async saveORM(task: Task): Promise<Task> {
    const findIndex = this.tasks.findIndex(
      findTask => findTask.id === task.id,
    );

    this.tasks[findIndex] = task;

    return task;
  }
}

export default FakeTaskRepository;
