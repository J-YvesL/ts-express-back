import { Router } from 'express';
import { ParcelsController } from '@/controllers/parcels';

const apiRoot = '/parcels';
const router = Router();

router.get(`${apiRoot}/build`, (req, res) => {
  ParcelsController.buildParcels()
    .then(success => {
      return res.status(200).json(success);
    })
    .catch(() => {
      return res.sendStatus(500);
    });
});

export default router;
