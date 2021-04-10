import AppError from '@shared/errors/AppError';
import { rejects } from 'assert';
import FakeTaskRepository from '../repositories/fakes/FakeTaskRepository';
import CreateTaskService from './CreateTaskService';
import DeleteTaskService from './DeleteTaskService';
import ListTasksService from './ListTasksService';

let fakeTaskRepository: FakeTaskRepository;
let listTasks: ListTasksService;
let createTask: CreateTaskService;
let deleteTask: DeleteTaskService;

describe('Delete task by id', () => {
  beforeEach(() => {
    fakeTaskRepository = new FakeTaskRepository();
    listTasks = new ListTasksService(fakeTaskRepository);
    createTask = new CreateTaskService(fakeTaskRepository);
    deleteTask = new DeleteTaskService(fakeTaskRepository);
  });

  it('should be able to delete task by its id', async () => {
    const firstTask = await createTask.execute({
      name: 'Lavar louça',
      observation: 'Lavar bem as panelas e não esquecer de limpar a pia',
      category: 'Cozinha',
      difficulty: 'Fácil',
      dueDate: new Date().toLocaleDateString(),
    });

    const secondTask = await createTask.execute({
      name: 'Limpar sofá',
      observation: '',
      category: 'Sala de Estar',
      difficulty: 'Fácil',
      dueDate: new Date().toLocaleDateString(),
    });

    if (firstTask) {
      await deleteTask.execute(firstTask.id);

      const tasks = await listTasks.execute({});

      expect(tasks).toEqual([secondTask]);
    }
  });

  it('should not be able to delete a task by its id if the task does', async () => {
    await expect( async () => deleteTask.execute('')).rejects.toBeInstanceOf(AppError);
  });
});
