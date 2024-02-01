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

}
