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

  type FarmUser = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    id: number;
    profile_id: number;
    pending: boolean;
  }

  type FarmFull = {
    id: number;
    users: FarmUser[];
    is_administrator: boolean;
    administrators: {
      id: number;
      username: string;
      name: string;
      email: string;
      pending: boolean;
    }[];
    temporary_administrator: null;
    temp_admin_up_to: null;
    base: {
      id: number;
      type: string;
      created: string;
      updated: string;
      radio_id: string;
      taken: null;
    };
    temp_admin_set_at: null;
    created: string;
    updated: string;
    name: string;
    old_name: string;
    country: string;
    state: string;
    city: string;
    address: string;
    postal_code: string;
    phone: string;
    location: string;
    billing_date: number;
    water_billing_date: number;
    img: null;
    phone_chip_number: string;
    inicio_array: any[];
    fim_array: any[];
    tipo_horario_array: any[];
    start_pivot_report_aggregate: number;
    start_irpd_report_aggregate: number;
    power_ranges: {
      [key: string]: {
        end: string;
        type: number;
        start: string;
      }[];
    };
    holidays_list: {
      day: number;
      month: number;
    }[];
    timezone: string;
    cliente: string;
    payment_status: number;
    zendesk_organization_id: number;
    first_operation_date: string;
    administrator: number;
    maintainer: null;
    reseller: null;
    read_users: number[];
    write_users: number[];
    sms_users: any[];
  };

  type UpdateFarmPayload = {
    // General tab
    billing_date?: number;
    name?: string;
    timezone?: string;
    water_billing_date?: number;
    // Location tab
    location?: string;
    // Contact tab
    address?: string;
    city?: string;
    country?: string;
    phone?: string;
    postal_code?: string;
    state?: string;
  } 
}
