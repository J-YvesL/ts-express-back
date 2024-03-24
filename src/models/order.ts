export interface Order {
  id: string;
  date: Date;
  items: { item_id: string; quantity: number }[];
}
