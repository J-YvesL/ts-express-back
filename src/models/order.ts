export interface OrderRecord {
  date: Date;
  items: { item_id: string; quantity: number }[];
}

export interface Order extends OrderRecord {
  id: string;
}
