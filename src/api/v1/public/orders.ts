import { Router } from 'express';
import { ParcelsController } from '@/controllers/parcels';

const apiRoot = '/orders';
const router = Router();

router.get(`${apiRoot}/process`, (req, res) => {
  ParcelsController.processOrders()
    .then(success => {
      return res.status(200).json(success);
    })
    .catch(() => {
      return res.sendStatus(500);
    });
});

export default router;
