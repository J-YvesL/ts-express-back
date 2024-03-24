import express from 'express';
import envRoute from './env';
import helloRoute from './hello';

const publicRouter = express.Router();

publicRouter.use(envRoute);
publicRouter.use(helloRoute);

export default publicRouter;
