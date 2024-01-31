declare namespace APIModels {
  type WeatherStationResume = {
    lastCommunication: number;
    stationName: string;
    temperature: number;
    humidity: number;
    wind: number;
    windDirection: number;
    rain: number;
  }

  type WeatherStationCharts = {
    labels: number[];
    temperature: { temperature: number[]; deltaT: number[]; dewPoint: number[] };
    rain: { rain: number[]; accumulatedRain: number[] };
    humidity: { humidity: number[] };
    wind: { wind: number[]; gustOfWind: number[] };
    luminosity: { luminosity: number[]; uv: number[] };
    pressure: { pressure: number[] };
  }

  type WeatherForecastHours = {
    dt: number;
    temperature: {
      min: number;
      max: number;
    };
    humidity: number;
    wind: number;
    rain: number;
  }
  
  type WeatherForecast = {
    dt: number;
    temperature: {
      min: number;
      max: number;
    };
    humidity: number;
    wind: number;
    rain: number;
    dewPoint: number;
    hours?: WeatherForecastHours[];
    weather: "Thunderstorm" | "Drizzle" | "Rain" | "Snow" | "Clear" | "Clouds";
  }
  
  type WeatherStationPlugField = {
    lastCommunication: number;
    stationName: string;
    brand: WeatherStationBrand;
    temperature: {
      current: number;
      min: number;
      max: number;
      dewPoint: number;
      thermalFeel: number;
      deltaT: {
        current: number;
        min: number;
        max: number;
      };
      humidity: number;
    };
    wind: {
      averageWind: number;
      windDirection: number;
      pressure: number;
    };
    rain: {
      day: number;
      month: number;
      year: number;
    };
    luminosity: {
      uv: number;
      luminosity: number;
      altitude: number;
    };
  }
  
  type WeatherStationDavis = {
    lastCommunication: number;
    brand: WeatherStationBrand;
    stationName: string;
    temperature: {
      current: number;
      dewPoint: number;
      humidity: number;
    };
    wind: {
      windNow: number;
      averageWind: number;
      windDirection: number;
    };
    rain: {
      day: number;
      month: number;
      year: number;
    };
    luminosity: {
      uv: number;
      luminosity: number;
    };
  }
}
