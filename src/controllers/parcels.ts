import { createDeliveryRequest } from '@/services/carrier';
import { ItemsController } from './items';
import { OrdersController } from './orders';

export class ParcelsController {
  public static async processOrders(): Promise<boolean> {
    if (ItemsController.dbLength === 0 || OrdersController.dbLength === 0) {
      throw new Error('Database is not initialized');
    }
    try {
      const trackingId = await createDeliveryRequest();
      console.log(trackingId);

      return true;
    } catch (e) {
      throw new Error(`Unable to create delivery request: ${e}`);
    }
  }
}
