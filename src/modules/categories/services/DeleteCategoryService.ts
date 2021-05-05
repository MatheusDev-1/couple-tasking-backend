import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('categoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(id: string): Promise<any> {
    const task = await this.categoriesRepository.findById(id);

    if (!task) {
      throw new AppError('Category not found');
    }

    await this.categoriesRepository.deleteCategory(task);
  }
}

export default DeleteCategoryService;
