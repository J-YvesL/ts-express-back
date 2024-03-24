import path from 'path';
import fs from 'fs';
import { ItemsController } from '@/controllers/items';

export function loadData(): void {
  // Load items
  const dataPath = path.join(__dirname, '../../data/items.json');
  const rawData = fs.readFileSync(dataPath);
  const data = JSON.parse(rawData.toString());
  ItemsController.loadItems(data.items);
}
