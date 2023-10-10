import { Geolocation } from '@capacitor/geolocation';
import { GeoStrategy } from './geolocation';

export class GeoCapacitorStrategy implements GeoStrategy {
  private async getLocation(): Promise<{ str: string; pure: { lat: number; lng: number } }> {
    const { coords } = await Geolocation.getCurrentPosition();
    const str = `${coords.latitude.toString()},${coords.longitude.toString()}`;
    return { str, pure: { lat: coords.latitude, lng: coords.longitude } };
  }

  public async getGeoLocation(): Promise<{ str: string; pure: { lat: number; lng: number } }> {
    const granted = await Geolocation.checkPermissions();

    /**
     * Case the user not provide the permissions for get location
     */
    if (granted.location === 'denied') {
      return { str: '', pure: { lat: 0, lng: 0 } };
    }

    /**
     *  Case we not request the permissions for the users, we need request again
     */
    if (granted.location === 'prompt' || granted.location === 'prompt-with-rationale') {
      const permission = await Geolocation.requestPermissions();
      if (permission.location === 'denied') {
        return { str: '', pure: { lat: 0, lng: 0 } };
      } else {
        return this.getLocation();
      }
    }

    return this.getLocation();
  }
}
