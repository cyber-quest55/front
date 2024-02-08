import React from "react";
import TempreatureUpIcon from "@/icons/weatherstation/temperature-up-icon.svg";
import TempreatureDownIcon from "@/icons/weatherstation/temperature-down-icon.svg";
import WeatherForecastCardInfo from "./WeatherForecastCardInfo";
import { LuCloudRain } from 'react-icons/lu';
import { TbTemperature } from 'react-icons/tb';
import { ProCard } from "@ant-design/pro-components";

interface WeatherForecastCardProps {
  day: { name: string; date: string };
  temperature: { min: number | string; max: number | string };
  rain: { millimeters: string | undefined; percentage: number };
  isToday?: boolean;
  icon: JSX.Element;
}

const WeatherForecastCard = ({
  day,
  temperature,
  rain,
  isToday,
  icon,
}: WeatherForecastCardProps) => {
  return (
    <ProCard
      bordered
      bodyStyle={{
        padding: 0
      }}
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
        icon={<TbTemperature size={25} />}
        iconStyle={{ marginRight: 6 }}
      >
        <div>
          <div style={{ fontSize: 14, display: "flex", gap: 5, alignItems: 'center' }}>
            <img src={TempreatureUpIcon} width={12} height={12} />
            <div>{temperature.max} °C</div>
          </div>
          <div style={{ fontSize: 14, display: "flex", gap: 5, alignItems: 'center' }}>
            <img src={TempreatureDownIcon} width={12} height={12} />
            <div>{temperature.min} °C</div>
          </div>
        </div>
      </WeatherForecastCardInfo>
      <WeatherForecastCardInfo icon={<LuCloudRain size={25} />}>
        <div style={{ fontSize: 14, fontWeight: 400 }}>
          <div>{rain.millimeters}mm</div>
          <div>{rain.percentage}%</div>
        </div>
      </WeatherForecastCardInfo>
    </ProCard>
  );
};

export default WeatherForecastCard;
