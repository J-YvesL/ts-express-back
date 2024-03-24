import express, { Express } from 'express';
import publicRouter from '@/api/public';
import privateRouter from '@/api/private';

export default function setupExpress(app: Express) {
  app.use(express.json());
  app.use('/api', publicRouter);
  app.use('/api/private', privateRouter);
}
