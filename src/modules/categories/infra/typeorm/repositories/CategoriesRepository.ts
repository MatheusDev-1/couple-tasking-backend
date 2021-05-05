import { getRepository, Repository, EntityRepository } from 'typeorm';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';

import Category from '../entities/Category';
import IFindCategoriesDTO from '@modules/categories/dtos/IFindCategoriesDTO';

@EntityRepository(Category)
class CategorysRepository
  extends Repository<Category>
  implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    super();
    this.ormRepository = getRepository(Category);
  }

  public async findCategories(data: IFindCategoriesDTO): Promise<Category[]> {
    const categories = await this.ormRepository.find({
      where: data,
    })

    return categories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ name });

    if (category) {
      return category
    }

    return undefined;
  };

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ id });

    if (category) {
      return category;
    }

    return undefined;
  };

  public async createCategory({ name }: ICreateCategoryDTO): Promise<Category> {
    const newCategory = await this.ormRepository.create({
      name,
    });

    await this.saveORM(newCategory);

    return newCategory;
  }

  public async deleteCategory(Category: Category): Promise<void> {
    this.ormRepository.remove(Category);
  }

  public async saveORM(Category: Category): Promise<Category> {
    return this.ormRepository.save(Category);
  }
}

export default CategorysRepository;
