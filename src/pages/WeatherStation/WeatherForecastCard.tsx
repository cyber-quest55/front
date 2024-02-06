import React from "react";
import TemperatureIcon from "@/icons/weatherstation/temperature-icon.svg";
import TempreatureUpIcon from "@/icons/weatherstation/temperature-up-icon.svg";
import TempreatureDownIcon from "@/icons/weatherstation/temperature-down-icon.svg";
import RainIcon from "@/icons/weatherstation/rain-icon.svg";
import WeatherForecastCardInfo from "./WeatherForecastCardInfo";

interface WeatherForecastCardProps {
  day: { name: string; date: string };
  temperature: { min: number | string; max: number | string };
  rain: { millimeters: string | undefined; percentage: number };
  isToday?: boolean;
  icon: string;
}

const WeatherForecastCard = ({
  day,
  temperature,
  rain,
  isToday,
  icon,
}: WeatherForecastCardProps) => {
  return (
    <div
      style={{
        borderRadius: 8,
        minWidth: 152,
        // border: `1px solid ${isToday ? "#143616" : "#2F3D45"}`,
        // backgroundColor: isToday ? "#F5FCF5" : "",
      }}
    >
      <WeatherForecastCardInfo icon={icon}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 400 }}>{day.name}</div>
          <div style={{ color: "#828A8F", fontSize: 10 }}>{day.date}</div>
        </div>
      </WeatherForecastCardInfo>
      <WeatherForecastCardInfo
        icon={TemperatureIcon}
        iconStyle={{ marginRight: 6 }}
      >
        <div>
          <div style={{ fontSize: 14, display: "flex", gap: 5 }}>
            <img src={TempreatureUpIcon} />
            <div>{temperature.max} °C</div>
          </div>
          <div style={{ fontSize: 14, display: "flex", gap: 5 }}>
            <img src={TempreatureDownIcon} />
            <div>{temperature.min} °C</div>
          </div>
        </div>
      </WeatherForecastCardInfo>
      <WeatherForecastCardInfo icon={RainIcon}>
        <div style={{ fontSize: 14, fontWeight: 400 }}>
          <div>{rain.millimeters}mm</div>
          <div>{rain.percentage}%</div>
        </div>
      </WeatherForecastCardInfo>
    </div>
  );
};

export default WeatherForecastCard;
