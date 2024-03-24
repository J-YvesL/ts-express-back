import express from 'express';
import envRoute from './env';
import helloRoute from './hello';
import ordersRoute from './orders';
import parcelsRoute from './parcels';

const publicRouter = express.Router();

publicRouter.use(envRoute);
publicRouter.use(helloRoute);
publicRouter.use(ordersRoute);
publicRouter.use(parcelsRoute);

export default publicRouter;
