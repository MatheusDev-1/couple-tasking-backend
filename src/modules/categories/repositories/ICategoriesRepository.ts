import Category from '../infra/typeorm/entities/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import IFindCategoriesDTO from '../dtos/IFindCategoriesDTO';

export default interface ICategoriesRepository {
  findCategories({ name }: IFindCategoriesDTO): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
  findById(id: string): Promise<Category | undefined>;
  createCategory(data: ICreateCategoryDTO): Promise<Category>;
  deleteCategory(task: Category): Promise<any>;
  saveORM(task: Category): Promise<Category>;
}
