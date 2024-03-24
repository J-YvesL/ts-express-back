import { Router } from 'express';
import { OrdersController } from '@/controllers/orders';
import { ParcelsController } from '@/controllers/parcels';

const apiRoot = '/parcels';
const router = Router();

router.get(`${apiRoot}/build`, (req, res) => {
  const orders = OrdersController.orders;
  ParcelsController.buildParcels(orders)
    .then(parcels => {
      return res.status(200).json(parcels);
    })
    .catch(e => {
      const err = e as Error;
      return res.status(500).json(err.message);
    });
});

export default router;
