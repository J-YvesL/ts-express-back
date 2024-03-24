import { Item, ItemRecord } from '@/models/item';

export class ItemsController {
  private static itemsDB: Record<string, ItemRecord>;

  public static loadItems(items: Item[]): void {
    ItemsController.itemsDB = {};
    items.forEach(item => {
      this.itemsDB[item.id] = {
        name: item.name,
        weight: parseFloat(item.weight) * 1000, // conver to grams to remove decimal part and use integer type
      };
    });
    console.log(`${this.dbLength} items loaded.`);
  }

  public static getItemWeight(itemId: string): number | undefined {
    const item = this.itemsDB[itemId];
    if (item === undefined) {
      return undefined;
    } else {
      return item.weight;
    }
  }

  public static get items(): Record<string, ItemRecord> {
    return this.itemsDB;
  }

  public static get dbLength(): number {
    return Object.keys(this.itemsDB).length;
  }
}
