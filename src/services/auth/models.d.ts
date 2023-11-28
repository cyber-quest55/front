declare namespace APIModels {
  /** Model of login request */
  type Auth = {
    profile: number;
    reseller: boolean;
    resellers: any[];
    token: string;
    two_factor_authentication: boolean;
    farm_id: string;
    user: number;
  };

  type RegistrationToken = {
    email: string;
  };

  type UsernameValidation = {
    available: boolean;
  };

  type ResetPasswordValidation = {};

  type RegisterUser = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
}
