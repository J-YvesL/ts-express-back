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
        const newParcels = this.processOrder(id, order);
        parcels.push(...newParcels);
      }
      // Request tracking IDs
      const trackingIds = await CarrierService.createDeliveryRequest(
        parcels.length
      );
      trackingIds.forEach((trackingId, index) => {
        parcels[index].trackingId = trackingId;
      });
      // Assign palette
      for (const [index, parcel] of parcels.entries()) {
        parcel.paletteNumber = Math.floor(index / 15) + 1;
      }
      console.log('Done building parcels.');
      return parcels;
    } catch (e) {
      throw new Error(`Unable to create delivery request: ${e}`);
    }
  }

  /**
   * Put all items of an order into parcels for delivery.
   * @param id Order ID
   * @param order Order content
   * @returns Parcels ready for delivery
   */
  private static processOrder(id: string, order: OrderRecord): Parcel[] {
    const itemsToPack = this.convertToPackingList(order);
    const parcels: Parcel[] = [];
    let heaviestItem: { id: string; weight: number } | undefined;
    while ((heaviestItem = itemsToPack.shift()) !== undefined) {
      let found = false;
      // Try to find a parcel that can accept this weight
      for (const parcel of parcels) {
        if (parcel.weight + heaviestItem.weight <= 30) {
          found = true;
          const existingItem = parcel.items.find(
            item => item.item_id === heaviestItem!.id
          );
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            parcel.items.push({ item_id: heaviestItem.id, quantity: 1 });
          }
          parcel.weight += heaviestItem.weight;
        }
      }
      // If no suitable parcel could be found, then create a new Parcel
      if (!found) {
        const parcel: Parcel = {
          orderId: id,
          items: [{ item_id: heaviestItem.id, quantity: 1 }],
          weight: heaviestItem.weight,
        };
        parcels.push(parcel);
      }
    }
    return parcels;
  }

  /**
   * Create a list of items from an Order. The list is ordered by weight DESC.
   * @param order An order to pack into parcels
   * @returns The list of items to pack
   */
  private static convertToPackingList(
    order: OrderRecord
  ): { id: string; weight: number }[] {
    const itemsToPack: { id: string; weight: number }[] = [];
    for (const item of order.items) {
      const weight = ItemsController.getItemWeight(item.item_id);
      if (weight === undefined) {
        throw new Error(
          `Item ID ${item.item_id}:Undefined item weight. Cannot build parcel.`
        );
      }

      for (let i = 0; i < item.quantity; i++) {
        itemsToPack.push({
          id: item.item_id,
          weight,
        });
      }
    }
    itemsToPack.sort((a, b) => b.weight - a.weight);
    return itemsToPack;
  }
}
