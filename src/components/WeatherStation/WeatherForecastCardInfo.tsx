import React from "react";

interface WeatherForecastCardInfoProps {
  children: JSX.Element;
  icon: JSX.Element;
  iconStyle?: React.CSSProperties;
}

const WeatherForecastCardInfo = ({
  children,
  icon,
}: WeatherForecastCardInfoProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: '6px 10px',
      }}
    >
      <div>{children}</div>
      <div>
        {icon}
      </div>
    </div>
  );
};

export default WeatherForecastCardInfo;
