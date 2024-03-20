declare namespace APIModels {
  type Notification = {
    id?: number;
    farm: number;
    devices: number[];
    enable: boolean;
    name: string;
    start: string;
    end: string;
    created?: string;
    updated?: string;
    user: number;
    reasons: number[];
    critical_reasons: number[];
  };

  type NotificationReason = {
    id: number;
    type: number;
    protocol: number | string;
    reason_number: number;
    label: string;
    critical: boolean;
  };
  
}
