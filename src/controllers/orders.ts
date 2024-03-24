import { Order } from '@/models/order';
import { createDeliveryRequest } from '@/services/carrier';

export class OrdersController {
  private static ordersDB: Record<
    string,
    { date: Date; items: { item_id: string; quantity: number }[] }
  >;

  public static loadOrders(orders: Order[]): void {
    this.ordersDB = {};
    orders.forEach(order => {
      this.ordersDB[order.id] = {
        date: order.date,
        items: order.items,
      };
    });
    console.log(`${Object.keys(this.ordersDB).length} orders loaded.`);
  }

  public static async processOrders(): Promise<boolean> {
    try {
      const trackingId = await createDeliveryRequest();
      console.log(trackingId);

      return true;
    } catch (e) {
      throw new Error(`Unable to create delivery request: ${e}`);
    }
  }
}
