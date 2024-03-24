import axios from 'axios';

const CARRIER_API =
  'https://www.random.org/integers/?num=1&min=100000000&max=110000000&col=1&base=10&format=plain&rnd=new';

/**
 * Use carrier API to request a delivery and obtain a tracking ID
 * @returns tracking ID
 */
export function createDeliveryRequest(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    axios
      .get(CARRIER_API)
      .then(response => resolve(response.data))
      .catch(() => reject(new Error('Carrier API call failed.')));
  });
}
