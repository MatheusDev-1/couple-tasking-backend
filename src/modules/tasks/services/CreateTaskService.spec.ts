import FakeTaskRepository from '../repositories/fakes/FakeTaskRepository';
import CreateTaskService from './CreateTaskService';

let fakeTaskRepository: FakeTaskRepository;
let createTask: CreateTaskService;

describe('Create Task', () => {
  beforeEach(() => {
    fakeTaskRepository = new FakeTaskRepository();

    createTask = new CreateTaskService(fakeTaskRepository);
  });

  it('should be able to create a new task', async () => {
    const task = await createTask.execute({
      name: 'Lavar louça',
      observation: 'Lavar bem as panelas e não esquecer de limpar a pia',
      category: 'Cozinha',
      difficulty: 'Fácil',
      dueDate: new Date(),
    });

    expect(task).toHaveProperty('name');
    expect(task).toHaveProperty('category');
    expect(task).toHaveProperty('dueDate');
  });
});
