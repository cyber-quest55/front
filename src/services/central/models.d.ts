declare namespace Models {
  /** Model of Central request */
  export type Central = {
    id: number;
    users: Array<{
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      id: number;
      profile_id: number;
      pending: boolean;
    }>;
    is_administrator: boolean;
    administrators: Array<{
      id: number;
      username: string;
      name: string;
      email: string;
      pending: boolean;
    }>;
    temporary_administrator: any;
    temp_admin_up_to: any;
    base: {
      id: number;
      type: string;
      created: string;
      updated: string;
      radio_id: string;
      taken: any;
    };
    temp_admin_set_at: any;
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
    img: any;
    phone_chip_number: string;
    inicio_array: Array<any>;
    fim_array: Array<any>;
    tipo_horario_array: Array<any>;
    start_pivot_report_aggregate: number;
    start_irpd_report_aggregate: number;
    power_ranges: {
      '0': Array<{
        end: string;
        type: number;
        start: string;
      }>;
      '1': Array<{
        end: string;
        type: number;
        start: string;
      }>;
      '2': Array<{
        end: string;
        type: number;
        start: string;
      }>;
      '3': Array<{
        end: string;
        type: number;
        start: string;
      }>;
      '4': Array<{
        end: string;
        type: number;
        start: string;
      }>;
      '5': Array<{
        end: string;
        type: number;
        start: string;
      }>;
      '6': Array<{
        end: string;
        type: number;
        start: string;
      }>;
    };
    holidays_list: Array<{
      day: number;
      month: number;
    }>;
    timezone: string;
    cliente: string;
    payment_status: number;
    zendesk_organization_id: number;
    first_operation_date: string;
    administrator: number;
    maintainer: any;
    reseller: any;
    read_users: Array<number>;
    write_users: Array<number>;
    sms_users: Array<any>;
    repeaters: Array<any>;
  };
}
