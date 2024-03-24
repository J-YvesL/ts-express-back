import path from 'path';
import fs from 'fs';
import { Item } from '@/models/item';
import { Order } from '@/models/order';
import { ItemsController } from '@/controllers/items';
import { OrdersController } from '@/controllers/orders';

export function loadData(): void {
  // Load items
  const dataItem = loadJsonContent('../../data/items.json') as {
    items: Item[];
  };
  ItemsController.loadItems(dataItem.items);

  // Load orders
  const dataOrder = loadJsonContent('../../data/orders.json') as {
    orders: Order[];
  };
  OrdersController.loadOrders(dataOrder.orders);
}

function loadJsonContent(filePath: string): unknown {
  const dataPath = path.join(__dirname, filePath);
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData.toString());
}
