declare namespace APIModels {
  /** Model of User */
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type ProfileData = {
    id: number;
    birth: any;
    country: string;
    state: any;
    city: any;
    district: any;
    address_1: any;
    address_2: any;
    number: any;
    postal_code: any;
    prefix_cell_phone: any;
    cell_phone: any;
    phone: any;
    cpf: any;
    updated: string;
    language: string;
    is_accept_policy: boolean;
    accept_policy_date: string;
    zendesk_customer_id: any;
    reset_password: boolean;
    user: number;
    accept_policy_version: number;
    email: string;
  };

  type PostProfilePayload = {
    name: string;
    email: string;
    birth: string;
    country: string;
    state: string;
    city: string;
    district: string;
    address_1: string;
    address_2: string;
    number: string;
    postal_code: string;
    phone: string;
    prefix_cell_phone: string;
    cell_phone: string;
    cpf: string;
    language: string;
    role: any;
  };

  type PatchUserInfoPayload = {
    first_name: string;
    last_name: string;
    email: string;
  };

  type FindByUsernameOrEmailPayload = {
    username_or_email: string;
  };

  type UserPermissionData = {
    id: number;
    irpd?: {
      id: number,
      name: string
    };
    equipment?: {
      id: number;
      type: string;
      name: string;
      position: string;
      created: string;
      updated: string;
      farm: number;
      base: numbe;
    };
    level: number;
    created: string;
    updated: string;
    user: string;
    pivot?: {
      id: number;
      name: string;
      protocol: number;
      automation_type: number;
      form_status: boolean;
      permission_level: number;
    };
  }

  type FindAccountData = {
    user__email: string;
    user__username: string;
    full_name: string;
  };

  type PostChangePasswordPayload = {
    current_password: string;
    new_password: string;
  };
}
