// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetWeatherStationSummaryParams = {
    farmId: string;
    pivotId: string;
  };

  type GetWeatherStationSummaryResponse = APIModels.WeatherStationResume;

  type GetWeatherStationParams = {
    farmId: string;
    pivotId: string;
  };
  

  type GetWeatherStationResponse = APIModels.WeatherStationDavis | APIModels.WeatherStationPlugField;

  type GetWeatherForecastParams = {
    farmId: string;
    pivotId: string;
  };

  type GetWeatherForecastResponse = APIModels.WeatherForecast[];

  type GetWeatherStationChartsParams = {
    farmId: string;
    pivotId: string;
    period: string;
  };

  type GetWeatherStationChartsResponse = APIModels.WeatherStationCharts;

  type CreateWeatherStationParams = {
    farmId: string;
  };

  type CreateWeatherStationResponse = APIModels.CreateWeatherStationDavisPayload | APIModels.CreateWeatherStationPlugfieldPayload;


}
