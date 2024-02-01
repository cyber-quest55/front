import React from "react";
import moment from "moment";
import { Badge, Button, Skeleton } from "antd";
import { CloseCircleOutline } from "antd-mobile-icons";
import { ProCard } from "@ant-design/pro-components";

const WeatherNameCard = ({
  name,
  isOffline = false,
  lastCommunication,
  onClose,
  loading = false,
}: any) => {
  const lastCommunicationDate = () => {
    return lastCommunication
      ? moment(lastCommunication).format("DD MMM - HH:mm")
      : "";
  };

  return (
    <ProCard>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {!loading ? (
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              display: "flex",
            }}
          >
            {"STATION"} {name}
          </div>
        ) : (
          <Skeleton style={{ width: 120, height: 40 }} />
        )}
        <div>
          <Button
            onClick={onClose}
            style={{
              padding: "0 5px",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              border: "1px solid #D4D4D4",
              boxShadow: "none",
              cursor: "pointer",
            }}
          >
            <CloseCircleOutline style={{ width: 16 }} />
            {"CLOSE"}
          </Button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{isOffline ? <Badge color="red" /> : null}</div>
        {!loading ? (
          lastCommunication ? (
            <div style={{ color: "#808080", fontSize: 12, textAlign: "right" }}>
              {"LAST_COMMUNICATION"}:
              <br /> {lastCommunicationDate()}
            </div>
          ) : null
        ) : (
          <Skeleton style={{ width: 120, height: 40 }} />
        )}
      </div>
    </ProCard>
  );
};

export default WeatherNameCard;
