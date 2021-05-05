import FakeCategoryRepository from '@modules/categories/repositories/fakes/FakeCategoryRepository';
import FakeTaskRepository from '../repositories/fakes/FakeTaskRepository';
import CreateTaskService from './CreateTaskService';

let fakeTaskRepository: FakeTaskRepository;
let fakeCategoryRepository: FakeCategoryRepository;
let createTask: CreateTaskService;

describe('Create Task', () => {
  beforeEach(() => {
    fakeTaskRepository = new FakeTaskRepository();
    fakeCategoryRepository = new FakeCategoryRepository();
    createTask = new CreateTaskService(fakeTaskRepository, fakeCategoryRepository);
  });

  it('should be able to create a new task', async () => {
    const task = await createTask.execute({
      name: 'Lavar louça',
      observation: 'Lavar bem as panelas e não esquecer de limpar a pia',
      category: {
        name: 'Cozinha',
      },
      difficulty: 'Fácil',
      dueDate: new Date().toISOString(),
    });

    expect(task).toHaveProperty('name');
    expect(task).toHaveProperty('category');
    expect(task).toHaveProperty('dueDate');
  });
});
