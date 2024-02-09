import React from "react";

interface WeatherInfoProps {
  title: string;
  infoSize?: number;
  info: string | JSX.Element;
  subInfo?: string | JSX.Element;
  breakTitleWords?: boolean;
  titleWidth?: number;
}

const WeatherInfo = ({
  title,
  info,
  subInfo,
  infoSize = 16,
  breakTitleWords = true,
  titleWidth,
}: WeatherInfoProps) => {
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          display: breakTitleWords ? "table-caption" : "",
          width: titleWidth ? titleWidth : "auto",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: infoSize, fontWeight: 600 }}>{info ?? "-"}</div>
      <div style={{ fontSize: 12 }}>{info ? subInfo : ""}</div>
    </div>
  );
};

export default WeatherInfo;
