import { Item } from '@/models/item';

export class ItemsController {
  private static itemsDB: Record<string, { name: string; weight: number }>;

  public static loadItems(items: Item[]): void {
    ItemsController.itemsDB = {};
    items.forEach(item => {
      this.itemsDB[item.id] = {
        name: item.name,
        weight: parseFloat(item.weight),
      };
    });
  }

  public static getItemWeight(itemId: string): number | undefined {
    const item = this.itemsDB[itemId];
    if (item === undefined) {
      return undefined;
    } else {
      return item.weight;
    }
  }
}
