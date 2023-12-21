import { useScreenHook } from '@/hooks/screen';
import { checkUsername, registerUser, validateRegisterToken } from '@/services/auth';
import { history, useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { RegisterComponent } from './RegisterComponent';
import { RegisterSkeleton } from './RegisterSkeleton';
import { RegisterMobile } from './RegisterMobile';

const RegisterFormContainer: React.FC<any> = () => {
  /** hooks */
  const intl = useIntl();
  const params = useParams();
  const { xs } = useScreenHook();
  const [error, setError] = useState<string[]>([]);
  const [isSubmitAble, setIsSubmitAble] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  /** Requisitions */
  const validateTokenReq = useRequest(validateRegisterToken, {
    defaultParams: [{ token: params.token as string }],
  });
  const checkUsernameReq = useRequest(checkUsername, { manual: true });
  const registerUserReq = useRequest(registerUser, { manual: true });

  useEffect(() => {
     if (validateTokenReq.error) {
      setIsSubmitAble(false);
      setError(['component.forms.register.invalid.token'])
    } else { 
      setIsSubmitAble(true)
    }
  }, [validateTokenReq.error]);

  const handleSubmit = async (values: any) => {
    try {
      setIsSubmiting(true);

      const submitErrors: string[] = [];

      /** Validate if passwords match */
      if (values.password !== values.confirmPassword) {
        submitErrors.push('component.forms.register.password.unmatch');
      }

      /** Validate if username is already in use */
      if (!checkUsernameReq.data?.available) {
        submitErrors.push('component.forms.register.username.used');
      }

      if (submitErrors.length > 0) {
        setError(submitErrors);
        return;
      }

      delete values.confirmPassword;

      setError([]);

      await registerUserReq.runAsync(values, { token: params.token as string });

      message.success({
        type: 'success',
        content: intl.formatMessage({
          id: 'component.forms.register.success',
          defaultMessage: 'Sucesso 😊',
        }),
        duration: 3,
      });
      return history.push('/user/login');
    } catch (err) {
      message.error({
        type: 'error',
        content: intl.formatMessage({
          id: 'component.forms.register.fail',
          defaultMessage: 'Falha ao Registrar',
        }),
        duration: 3,
      });
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <>
      {validateTokenReq.loading ? (
        <RegisterSkeleton type={xs ? 'mobile' : 'web'} />
      ) : xs ? (
        <RegisterMobile
          handleSubmit={handleSubmit}
          isSubmitAble={isSubmitAble}
          isSubmiting={isSubmiting}
          email={validateTokenReq.data?.email || ''}
          checkUsernameReq={checkUsernameReq}
          error={error}
        />
      ) : (
        <RegisterComponent
          handleSubmit={handleSubmit}
          isSubmitAble={isSubmitAble}
          isSubmiting={isSubmiting}
          email={validateTokenReq.data?.email || ''}
          checkUsernameReq={checkUsernameReq}
          error={error}
        />
      )}
    </>
  );
};

export { RegisterFormContainer };
