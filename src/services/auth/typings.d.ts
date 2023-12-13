// @ts-ignore
/* eslint-disable */

declare namespace API {
  type LoginParams = {};

  type LoginResult = {
    token: string;
    user: number;
    profile: number;
    reseller: boolean;
    resellers: Array<any>;
  };

  type ValidateRegisterTokenParam = {
    token: string;
  };

  type ValidateRegisterTokenResult = APIModels.RegistrationToken;

  type ValidateUsernameParam = {
    username: string;
  };

  type ValidateUsernameResult = APIModels.UsernameValidation;

  type RegisterUserParam = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };

  type RegisterUserResult = APIModels.RegisterUser;


  type RecoveryPasswordParam = {
    email: string;
  }

  type RecoveryPasswordResult = APIModels.RecoveryPasswordValidation;

  type ResetPasswordParam = {
    new_password1: string, 
    new_password2: string
  }

  type ResetPasswordResult = APIModels.ResetPasswordValidation;
}
