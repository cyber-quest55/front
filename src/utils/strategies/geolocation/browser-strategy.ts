import { GeoStrategy } from "./geolocation";

export class GeoBrowserStrategy implements GeoStrategy {
    public async getGeoLocation(): Promise<{ str: string; pure: { lat: number; lng: number } }> {
      const promise = new Promise<{ str: string; pure: { lat: number; lng: number } }>(function (
        resolve,
      ) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;
          const str = `${latitude.toString()},${longitude.toString()}`;
          resolve({ str, pure: { lat: latitude, lng: longitude } });
        });
      });
  
      return promise;
    }
  }