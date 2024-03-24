import { Order, OrderRecord } from '@/models/order';

export class OrdersController {
  private static ordersDB: Record<string, OrderRecord>;

  public static loadOrders(orders: Order[]): void {
    this.ordersDB = {};
    orders.forEach(order => {
      // Merge items
      const groupedItems: Record<string, number> = {};
      for (const item of order.items) {
        if (groupedItems[item.item_id]) {
          groupedItems[item.item_id] += item.quantity;
        } else {
          groupedItems[item.item_id] = item.quantity;
        }
      }
      const mergedItems: { item_id: string; quantity: number }[] =
        Object.entries(groupedItems).map(([item_id, quantity]) => ({
          item_id,
          quantity,
        }));

      // Map order
      this.ordersDB[order.id] = {
        date: order.date,
        items: mergedItems,
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
