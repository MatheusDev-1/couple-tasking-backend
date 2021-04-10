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
      dueDate: new Date(),
    });

    const secondTask = await createTask.execute({
      name: 'Limpar sofá',
      observation: '',
      category: 'Sala de Estar',
      difficulty: 'Fácil',
      dueDate: new Date(),
    });

    if (firstTask) {
      await deleteTask.execute(firstTask.id);

      const tasks = await listTasks.execute({});

      expect(tasks).toEqual([secondTask]);
    }
  });
});
