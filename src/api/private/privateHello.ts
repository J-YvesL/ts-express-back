import { Router } from 'express';

const router = Router();

router.get('/hello', (req, res) => {
  res.send('Example private route');
});

export default router;
