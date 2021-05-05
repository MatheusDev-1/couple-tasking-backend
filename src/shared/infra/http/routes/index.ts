import { Router } from 'express';
import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';

const routes = Router();

routes.use('/tasks', tasksRouter);
routes.use('/categories', categoriesRouter);

export default routes;
