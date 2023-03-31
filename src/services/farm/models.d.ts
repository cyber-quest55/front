declare namespace Models {
  /** Model of Farm */
  type Farm = {
    id: number;
    name: string;
    is_administrator: boolean;
    payment_status: number;
    timezone: string
    pivots: Models.Pivot[]
  }; 
}
