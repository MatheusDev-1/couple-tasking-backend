import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().optional().allow('').max(50),
    },
  }),
  categoriesController.index,
);

categoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().max(50),
    },
  }),
  categoriesController.create,
);

categoriesRouter.delete('/:id', categoriesController.delete);

export default categoriesRouter;
