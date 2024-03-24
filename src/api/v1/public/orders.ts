import { OrdersController } from '@/controllers/orders';
import { Router } from 'express';

const apiRoot = '/orders';
const router = Router();

router.get(`${apiRoot}/process`, (req, res) => {
  OrdersController.processOrders()
    .then(success => {
      return res.status(200).json(success);
    })
    .catch(() => {
      return res.sendStatus(500);
    });
});

export default router;
