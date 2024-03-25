import { Parcel } from '@/models/parcel';
import { CarrierService } from '@/services/carrier';
import { ItemsController } from './items';
import { OrdersController } from './orders';
import { OrderRecord } from '@/models/order';

export class ParcelsController {
  private static PARCEL_MAX_WEIGHT = 30000; // 30kg in grams

  public static async buildParcels(
    orders: Record<string, OrderRecord>
  ): Promise<Parcel[]> {
    if (ItemsController.dbLength === 0 || OrdersController.dbLength === 0) {
      throw new Error('Database is not initialized');
    }
    console.log(
      `Starting to build parcels for ${OrdersController.dbLength} orders...`
    );
    const parcels: Parcel[] = [];
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
      // Compute total profit
      const profit = this.computeProfit(parcels);
      console.log(`Done building parcels. Total profit: ${profit}€`);
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
        if (parcel.weight + heaviestItem.weight <= this.PARCEL_MAX_WEIGHT) {
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
          break;
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

  /**
   * Compute profit based on business rules :
   * From 0 to 1kg = 1€
   * From 1kg to 5kg = 2€
   * From 5kg to 10kg = 3€
   * From 10kg to 20kg = 5€
   * More than 20kg = 10€
   * @param parcels
   */
  private static computeProfit(parcels: Parcel[]) {
    let totalProfit = 0;

    parcels.forEach(parcel => {
      const weightInKg = parcel.weight / 1000;

      if (weightInKg <= 1) {
        totalProfit += 1;
      } else if (weightInKg > 1 && weightInKg <= 5) {
        totalProfit += 2;
      } else if (weightInKg > 5 && weightInKg <= 10) {
        totalProfit += 3;
      } else if (weightInKg > 10 && weightInKg <= 20) {
        totalProfit += 5;
      } else if (weightInKg > 20) {
        totalProfit += 10;
      }
    });

    return totalProfit;
  }
}
