import express from 'express';
import privateHelloRoute from './privateHello';
import { checkAuth } from '@/middlewares/private/auth';

const privateRouter = express.Router();

privateRouter.use(checkAuth); // All private routes require authentication
privateRouter.use(privateHelloRoute);

export default privateRouter;
