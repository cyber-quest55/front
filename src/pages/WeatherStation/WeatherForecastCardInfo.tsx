import React from "react";

interface WeatherForecastCardInfoProps {
  children: JSX.Element;
  icon: string;
  iconStyle?: React.CSSProperties;
}

const WeatherForecastCardInfo = ({
  children,
  icon,
  iconStyle,
}: WeatherForecastCardInfoProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
      <div>{children}</div>
      <div>
        <img src={icon} style={iconStyle} />
      </div>
    </div>
  );
};

export default WeatherForecastCardInfo;
