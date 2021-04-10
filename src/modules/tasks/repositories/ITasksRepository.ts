import Task from '../infra/typeorm/entities/Tasks';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import IFindTasksDTO from '../dtos/IFindTasksDTO';

export default interface ITasksRepository {
  findTasks({ difficulty, category, dueDate }: IFindTasksDTO): Promise<Task[]>;
  findById(id: string): Promise<Task | undefined>;
  deleteTask(task: Task): Promise<any>;
  createTask(data: ICreateTaskDTO): Promise<Task>;
  saveORM(task: Task): Promise<Task>;
}
