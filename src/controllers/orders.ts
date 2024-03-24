import { Order, OrderRecord } from '@/models/order';

export class OrdersController {
  private static ordersDB: Record<string, OrderRecord>;

  public static loadOrders(orders: Order[]): void {
    this.ordersDB = {};
    orders.forEach(order => {
      this.ordersDB[order.id] = {
        date: order.date,
        items: order.items,
      };
    });
    console.log(`${this.dbLength} orders loaded.`);
  }

  public static get orders(): Record<string, OrderRecord> {
    return this.ordersDB;
  }

  public static get dbLength(): number {
    return Object.keys(this.ordersDB).length;
  }
}
