import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import CreateCategoryService from './CreateCategoryService';
import ListCategoriesService from './ListCategoriesService';

let fakeCategoryRepository: FakeCategoryRepository;
let createCategory: CreateCategoryService;
let listCategories: ListCategoriesService;

describe('List all categories without query parameters', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    createCategory = new CreateCategoryService(fakeCategoryRepository);
    listCategories = new ListCategoriesService(fakeCategoryRepository);
  });

  it('should be able to list all categories', async () => {
    const firstCategory = await createCategory.execute({
      name: 'Lavar louça',
    });

    const secondCategory = await createCategory.execute({
      name: 'Lavar louça',
    });

    const thirdCategory = await createCategory.execute({
      name: 'Lavar louça',
    });

    const allCategories = await listCategories.execute({});

    expect(allCategories).toEqual([firstCategory, secondCategory, thirdCategory]);
  });
});
