import { Router } from 'express';
import { HelloController } from '@/controllers/helloController';

const router = Router();

router.get('/hello', (req, res) => {
  res.send(`Private: ${HelloController.helloMessage}`);
});

export default router;
