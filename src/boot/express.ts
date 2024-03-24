import express, { Express } from 'express';
import path from 'path';
import publicRouterV1 from '@/api/v1/public';
import privateRouterV1 from '@/api/v1/private';

export default function setupExpress(app: Express) {
  app.use(express.json());
  app.use('/api/v1', publicRouterV1);
  app.use('/api/v1/private', privateRouterV1);
  app.use(express.static(path.join(__dirname, '../../public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
}
