import axios from 'axios';

export class CarrierService {
  private static CARRIER_API_URL = 'https://www.random.org/integers/';

  /**
   * Use carrier API to request a delivery and obtain a tracking ID
   * @returns tracking ID
   */
  public static createDeliveryRequest(num: number): Promise<number[]> {
    const params = {
      num,
      min: 100000000,
      max: 110000000,
      col: 1,
      base: 10,
      format: 'plain',
      rnd: 'new',
    };

    return new Promise<number[]>((resolve, reject) => {
      axios
        .get(this.CARRIER_API_URL, { params })
        .then(response => {
          const randomNumbers = response.data;
          const ids: number[] = randomNumbers
            .split('\n')
            .filter((s: string) => s.length > 0)
            .map(Number);
          resolve(ids);
        })
        .catch(() => reject(new Error('Carrier API call failed.')));
    });
  }
}
