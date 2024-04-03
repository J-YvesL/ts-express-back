import { Router } from 'express';
import { EnvController } from '@/controllers/envController';

const router = Router();

router.get('/env', (req, res) => {
  res.json({ env: EnvController.envName });
});

export default router;
