import express from 'express';
import helloRoute from './hello';

const publicRouter = express.Router();

publicRouter.use(helloRoute);

export default publicRouter;
