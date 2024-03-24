import { Router } from 'express';
import { OrdersController } from '@/controllers/orders';

const apiRoot = '/orders';
const router = Router();

router.get(`${apiRoot}`, (req, res) => {
  if (OrdersController.dbLength > 0) {
    const orders = OrdersController.orders;
    return res.status(200).json(orders);
  } else {
    return res.status(404).send();
  }
});

export default router;
