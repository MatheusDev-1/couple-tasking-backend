import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import CreateCategoryService from './CreateCategoryService';

let fakeCategoryRepository: FakeCategoryRepository;
let createCategory: CreateCategoryService;

describe('Create Category', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();

    createCategory = new CreateCategoryService(fakeCategoryRepository);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategory.execute({
      name: 'Lavar louça',
    });

    expect(category).toHaveProperty('name');
  });
});
