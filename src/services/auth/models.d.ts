declare namespace Models {
  /** Model of login request */
  type Auth = {
    profile: number;
    reseller: boolean;
    resellers: any[];
    token: string;
    two_factor_authentication: boolean;
    user: number;
  };
}
