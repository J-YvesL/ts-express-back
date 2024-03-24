import { Router } from 'express';
import { ItemsController } from '@/controllers/items';

const apiRoot = '/items';
const router = Router();

router.get(`${apiRoot}`, (req, res) => {
  if (ItemsController.dbLength > 0) {
    const items = ItemsController.items;
    return res.status(200).json(items);
  } else {
    return res.status(404).send();
  }
});

export default router;
