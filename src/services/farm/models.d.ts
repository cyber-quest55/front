declare namespace APIModels {
  type Farm = {
    id: number;
    name: string;
    timezone: string;
    is_administrator: boolean;
    payment_status: number;
  };

  type FarmConnection = {
    is_online: boolean;
  }
}
