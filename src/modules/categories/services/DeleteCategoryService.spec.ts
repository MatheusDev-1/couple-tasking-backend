import AppError from '@shared/errors/AppError';
import { rejects } from 'assert';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import CreateCategoryService from './CreateCategoryService';
import DeleteCategoryService from './DeleteCategoryService';
import ListCategoriesService from './ListCategoriesService';

let fakeCategoryRepository: FakeCategoryRepository;
let listCategories: ListCategoriesService;
let createCategory: CreateCategoryService;
let deleteCategory: DeleteCategoryService;

describe('Delete category by id', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    listCategories = new ListCategoriesService(fakeCategoryRepository);
    createCategory = new CreateCategoryService(fakeCategoryRepository);
    deleteCategory = new DeleteCategoryService(fakeCategoryRepository);
  });

  it('should be able to delete category by its id', async () => {
    const firstCategory = await createCategory.execute({
      name: 'Cozinha',
    });

    const secondCategory = await createCategory.execute({
      name: 'Varanda',
    });

    if (firstCategory) {
      await deleteCategory.execute(firstCategory.id!);

      const categories = await listCategories.execute({});

      expect(categories).toEqual([secondCategory]);
    }
  });

  it('should not be able to delete a category by its id if the category does', async () => {
    await expect( async () => deleteCategory.execute('')).rejects.toBeInstanceOf(AppError);
  });
});
