import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import { v4 as uuid_v4 } from 'uuid';

import IFindCategoriesDTO from '@modules/categories/dtos/IFindCategoriesDTO';
import Category from '../../infra/typeorm/entities/Category';

class FakeCategoryRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findCategories(data: IFindCategoriesDTO): Promise<Category[]> {
    if (Object.keys(data).length >= 1) {
      const queriedCategories = this.categories.filter(
        category =>
          category.name === data.name,
      );

      return queriedCategories;
    }

    return this.categories;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.id === id);

    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.name === name);

    return category;
  }

  public async createCategory(categoryData: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid_v4() }, categoryData);

    this.categories.push(category);

    return category;
  }


  public async deleteCategory(category: Category): Promise<Category[]> {
    const toDeleteIndex = this.categories.indexOf(category);

    return this.categories.splice(toDeleteIndex, 1);
  }

  public async saveORM(category: Category): Promise<Category> {
    const findIndex = this.categories.findIndex(
      findCategory => findCategory.id === category.id,
    );

    this.categories[findIndex] = category;

    return category;
  }
}

export default FakeCategoryRepository;
