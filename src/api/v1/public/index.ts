import express from 'express';
import envRoute from './env';
import helloRoute from './hello';
import orderRoute from './orders';

const publicRouter = express.Router();

publicRouter.use(envRoute);
publicRouter.use(helloRoute);
publicRouter.use(orderRoute);

export default publicRouter;
