export interface ItemRecord {
  name: string;
  weight: number;
}

export interface Item extends Omit<ItemRecord, 'weight'> {
  id: string;
  weight: string;
}
