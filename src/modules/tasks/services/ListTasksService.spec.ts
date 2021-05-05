import FakeCategoryRepository from '@modules/categories/repositories/fakes/FakeCategoryRepository';
import FakeTaskRepository from '../repositories/fakes/FakeTaskRepository';
import CreateTaskService from './CreateTaskService';
import ListTasksService from './ListTasksService';

let fakeTaskRepository: FakeTaskRepository;
let fakeCategoryRepository: FakeCategoryRepository;
let createTask: CreateTaskService;
let listTasks: ListTasksService;

describe('List all tasks without query parameters', () => {
  beforeEach(() => {
    fakeTaskRepository = new FakeTaskRepository();
    fakeCategoryRepository = new FakeCategoryRepository();
    createTask = new CreateTaskService(fakeTaskRepository, fakeCategoryRepository);
    listTasks = new ListTasksService(fakeTaskRepository);
  });

  it('should be able to list all tasks', async () => {
    const firstTask = await createTask.execute({
      name: 'Lavar louça',
      observation: 'Lavar bem as panelas e não esquecer de limpar a pia',
      category: {
         name: 'Cozinha'
        },
      difficulty: 'Fácil',
      dueDate: new Date().toISOString(),
    });

    const secondTask = await createTask.execute({
      name: 'Lavar louça',
      observation: 'Lavar bem as panelas e não esquecer de limpar a pia',
      category: {
        name: 'Cozinha',
      },
      difficulty: 'Fácil',
      dueDate: new Date().toISOString(),
    });

    const thirdTask = await createTask.execute({
      name: 'Lavar louça',
      observation: 'Lavar bem as panelas e não esquecer de limpar a pia',
      category: {
        name: 'Cozinha',
      },
      difficulty: 'Fácil',
      dueDate: new Date().toISOString(),
    });

    const allTasks = await listTasks.execute({});

    expect(allTasks).toEqual([firstTask, secondTask, thirdTask]);
  });

  it('should be able to list by difficulty', async () => {
    const firstTask = await createTask.execute({
      name: 'Lavar louça',
      observation: 'Lavar bem as panelas e não esquecer de limpar a pia',
      category: {
        name: 'Cozinha',
      },
      difficulty: 'Fácil',
      dueDate: new Date().toISOString(),
    });

    await createTask.execute({
      name: 'Lavar carro',
      observation: '',
      category: {
        name: 'Garagem',
      },
      difficulty: 'Difícil',
      dueDate: new Date().toISOString(),
    });

    const thirdTask = await createTask.execute({
      name: 'Lavar louça',
      observation: 'Lavar bem as panelas e não esquecer de limpar a pia',
      category: {
        name: 'Cozinha',
      },
      difficulty: 'Fácil',
      dueDate: new Date().toISOString(),
    });

    const allTasks = await listTasks.execute({
      difficulty: 'Fácil',
    });

    expect(allTasks).toEqual([firstTask, thirdTask]);
  });

  it('should be able to list by category', async () => {
    const firstTask = await createTask.execute({
      name: 'Lavar louça',
      observation: 'Lavar bem as panelas e não esquecer de limpar a pia',
      category: {
        name: 'Cozinha',
      },
      difficulty: 'Fácil',
      dueDate: new Date().toISOString(),
    });

    const secondTask = await createTask.execute({
      name: 'Aspirar sala',
      observation: '',
      category: {
        name: 'Cozinha',
      },
      difficulty: 'Fácil',
      dueDate: new Date().toISOString(),
    });

    await createTask.execute({
      name: 'Limpar chão',
      observation: '',
      category: {
        name: 'Sala de Estar',
      },
      difficulty: 'Fácil',
      dueDate: new Date().toISOString(),
    });

    const allTasks = await listTasks.execute({
      category: 'Cozinha',
    });

    expect(allTasks).toEqual([firstTask, secondTask]);
  });

  it('should be able to list by due date', async () => {
    const firstTask = await createTask.execute({
      name: 'Lavar louça',
      observation: 'Lavar bem as panelas e não esquecer de limpar a pia',
      category: {
        name: 'Cozinha',
      },
      difficulty: 'Fácil',
      dueDate: new Date('10/01/2021').toISOString(),
    });

    const secondTask = await createTask.execute({
      name: 'Aspirar sala',
      observation: '',
      category: {
        name: 'Sala de Estar',
      },
      difficulty: 'Fácil',
      dueDate: new Date('10/01/2021').toISOString(),
    });

    await createTask.execute({
      name: 'Lavar louça',
      observation: 'Lavar bem as panelas e não esquecer de limpar a pia',
      category: {
        name: 'Cozinha',
      },
      difficulty: 'Fácil',
      dueDate: new Date().toISOString(),
    });

    const allTasks = await listTasks.execute({
      dueDate: new Date('10/01/2021').toISOString(),
    });

    expect(allTasks).toEqual([firstTask, secondTask]);
  });
});
