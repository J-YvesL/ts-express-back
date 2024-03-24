import { Parcel } from '@/models/parcel';
import { createDeliveryRequest } from '@/services/carrier';
import { ItemsController } from './items';
import { OrdersController } from './orders';

export class ParcelsController {
  public static async buildParcels(): Promise<Parcel[]> {
    if (ItemsController.dbLength === 0 || OrdersController.dbLength === 0) {
      throw new Error('Database is not initialized');
    }
    const parcels: Parcel[] = [];
    const orders = OrdersController.orders;
    console.log(orders);

    try {
      const trackingId = await createDeliveryRequest();
      console.log(trackingId);

      return parcels;
    } catch (e) {
      throw new Error(`Unable to create delivery request: ${e}`);
    }
  }
}
