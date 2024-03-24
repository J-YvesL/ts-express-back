import { ParcelsController } from '@/controllers/parcels';
import { OrderRecord } from '@/models/order';

jest.mock('@/controllers/items', () => ({
  ItemsController: {
    ...jest.requireActual('@/controllers/items').ItemsController,
    dbLength: jest.fn().mockReturnValue(1),
    getItemWeight: jest.fn().mockReturnValue(1),
  },
}));

jest.mock('@/controllers/orders', () => ({
  OrdersController: {
    ...jest.requireActual('@/controllers/orders').OrdersController,
    dbLength: jest.fn().mockReturnValue(1),
  },
}));

jest.mock('@/services/carrier', () => ({
  CarrierService: {
    ...jest.requireActual('@/services/carrier').CarrierService,
    createDeliveryRequest: jest.fn().mockReturnValue([123456]),
  },
}));

test('it should put an item into a parcel', () => {
  // GIVEN
  const orders: Record<string, OrderRecord> = {
    '5bb61dfd3741808151aa413b': {
      date: new Date(),
      items: [
        {
          item_id: '5bb619e49593e5d3cbaa0b52',
          quantity: 2,
        },
      ],
    },
  };
  // WHEN
  return (
    ParcelsController.buildParcels(orders)
      // THEN
      .then(parcels => {
        console.log(JSON.stringify(parcels));
        expect(parcels.length).toBe(1);
      })
      .catch(e => {
        throw new Error('buildParcels failed: ' + e);
      })
  );
});
