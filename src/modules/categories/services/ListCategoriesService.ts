import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import IFindCategoriesDTO from '../dtos/IFindCategoriesDTO';

@injectable()
class ListCategoriesService {
  constructor(
    @inject('categoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(data: IFindCategoriesDTO): Promise<Category[]> {
    const categories = await this.categoriesRepository.findCategories(data);

    return categories;
  }
}

export default ListCategoriesService;
