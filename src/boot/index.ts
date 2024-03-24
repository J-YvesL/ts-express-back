import express from 'express';
import setupExpress from './express';
import { loadData } from './dataLoader';

function startApp() {
  // Load business data
  loadData();

  // Setup and start Express
  const app = express();

  setupExpress(app);

  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
}

export default startApp;
