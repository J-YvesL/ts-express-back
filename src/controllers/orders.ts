import { createDeliveryRequest } from '@/services/carrier';

export class OrdersController {
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
