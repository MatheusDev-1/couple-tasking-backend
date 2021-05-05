import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import Category from '../infra/typeorm/entities/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
class CreateCategoryService {
  constructor(
    @inject('categoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    name,
  }: ICreateCategoryDTO): Promise<Category | undefined> {
    const newCategory = await this.categoriesRepository.createCategory({
      name,
    });

    return newCategory;
  }
}

export default CreateCategoryService;
