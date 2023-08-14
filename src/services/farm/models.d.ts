declare namespace Models {
  /** Model of Farm */
  type Farm = {
    id: number
    name: string
    timezone: string
    is_administrator: boolean
    payment_status: number
  };

  type FarmConnection = {
    is_online: boolean;
  };
}
