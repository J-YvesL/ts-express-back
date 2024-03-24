import { Parcel } from '@/models/parcel';
import { CarrierService } from '@/services/carrier';
import { ItemsController } from './items';
import { OrdersController } from './orders';
import { OrderRecord } from '@/models/order';

export class ParcelsController {
  public static async buildParcels(): Promise<Parcel[]> {
    if (ItemsController.dbLength === 0 || OrdersController.dbLength === 0) {
      throw new Error('Database is not initialized');
    }
    console.log(
      `Starting to build parcels for ${OrdersController.dbLength} orders...`
    );
    const parcels: Parcel[] = [];
    const orders = OrdersController.orders;
    try {
      for (const [id, order] of Object.entries(orders)) {
        // Split order items into parcels.
        const parcel = this.processOrder(id, order);
        parcels.push(...parcel);
      }
      // Request tracking IDs
      const trackingIds = await CarrierService.createDeliveryRequest(
        parcels.length
      );
      trackingIds.forEach((trackingId, index) => {
        parcels[index].tracking_id = trackingId;
      });
      console.log('Done building parcels.');
      return parcels;
    } catch (e) {
      throw new Error(`Unable to create delivery request: ${e}`);
    }
  }

  private static processOrder(id: string, order: OrderRecord): Parcel[] {
    const parcel: Parcel = { order_id: id, items: [], weight: 0 };
    return [parcel];
  }
}
