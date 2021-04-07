import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import TasksController from '../controllers/TasksController';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get(
  '/',
  // celebrate({
  //   [Segments.QUERY]: {
  //     name: Joi.string().optional().allow('').max(256),
  //     cpf: Joi.string().optional().allow('').max(14),
  //     createdDate: Joi.string().optional().allow(''),
  //     role: Joi.string().max(256).optional().allow(''),
  //     minSalary: Joi.number().optional().allow(''),
  //     maxSalary: Joi.number().optional().allow(''),
  //     uf: Joi.string().optional().allow(''),
  //     status: Joi.string().optional().allow(''),
  //   },
  // }),
  tasksController.index,
);

tasksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().max(256),
      observation: Joi.string().optional().allow('').default('').max(256),
      category: Joi.string().required().max(25),
      difficulty: Joi.string().required().max(25),
      dueDate: Joi.date().required(),
    },
  }),
  tasksController.create,
);

tasksRouter.delete('/:id', tasksController.delete);

export default tasksRouter;
