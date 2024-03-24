export interface Parcel {
  orderId: string;
  items: { item_id: string; quantity: number }[];
  weight: number;
  trackingId?: number;
  paletteNumber?: number;
}
