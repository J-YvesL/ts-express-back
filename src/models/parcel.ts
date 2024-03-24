export interface Parcel {
  order_id: string;
  items: { item_id: string; quantity: number }[];
  weight: number;
  tracking_id?: number;
  palette_number?: number;
}
