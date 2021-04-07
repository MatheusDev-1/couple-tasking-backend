import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import DeleteTaskService from '@modules/tasks/services/DeleteTaskService';
import ListTasksService from '@modules/tasks/services/ListTasksService';
import { Between } from 'typeorm';

export default class TasksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, observation, category, difficulty, dueDate } = request.body;

    const createTaskService = container.resolve(CreateTaskService);

    const task = await createTaskService.execute({
      name,
      observation,
      category,
      difficulty,
      dueDate
    });

    return response.json(task);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      category,
      difficulty,
      dueDate,
    } = request.query;

    let where = {};

    if (category) {
      Object.assign(where, { category });
    }

    if (difficulty) {
      Object.assign(where, { difficulty });
    }

    if (dueDate) {
      Object.assign(where, { Between: [dueDate, dueDate] });
    }

    const listTasksService = container.resolve(ListTasksService);

    const tasks = await listTasksService.execute(where);

    return response.json(tasks);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const deleteService = container.resolve(DeleteTaskService);

    await deleteService.execute(cpf);

    return response.json({ message: 'Task data deleted' });
  }
}
