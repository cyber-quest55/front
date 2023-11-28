
export interface GeoStrategy {
  getGeoLocation(): Promise<{ str: string; pure: { lat: number; lng: number } }>;
}

export class GeoLocationContext {
  private strategy: GeoStrategy;
  private location: string = '';

  /**
   * Usually, the Context accepts a strategy through the constructor, but also
   * provides a setter to change it at runtime.
   */
  constructor(strategy: GeoStrategy) {
    this.strategy = strategy;
  }

  /**
   * Usually, the Context allows replacing a Strategy object at runtime.
   */
  public setStrategy(strategy: GeoStrategy) {
    this.strategy = strategy;
  }

  /**
   * The Context delegates some work to the Strategy object instead of
   * implementing multiple versions of the algorithm on its own.
   */
  public async execute(): Promise<{ str: string; pure: { lat: number; lng: number } }> {
    const result = await this.strategy.getGeoLocation();
    return result;
  }
}



