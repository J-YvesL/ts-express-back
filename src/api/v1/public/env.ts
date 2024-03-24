import { Router } from 'express';

const router = Router();

router.get('/env', (req, res) => {
  res.json({ env: process.env.NODE_ENV || 'development' });
});

export default router;
