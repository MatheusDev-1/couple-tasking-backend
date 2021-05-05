import Category from '@modules/categories/infra/typeorm/entities/Category';

export default interface ICreateTaskDTO {
  name: string;
  observation: string;
  category: Category;
  difficulty: string;
  dueDate: string;
}
