import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategoryService = container.resolve(CreateCategoryService);

    const task = await createCategoryService.execute({
      name,
    });

    return response.json(task);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    let where = {};

    const listCategoriesService = container.resolve(ListCategoriesService);

    const categories = await listCategoriesService.execute(where);

    return response.json(categories);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteService = container.resolve(DeleteCategoryService);

    await deleteService.execute(id);

    return response.json({ message: 'Category data deleted' });
  }
}
