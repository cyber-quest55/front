import { useScreenHook } from '@/hooks/screen';
import { recoveryPassword } from '@/services/auth';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { PasswordRecoveryComponent } from './PasswordRecoveryComponent';
import { PasswordRecoveryMobile } from './PasswordRecoveryMobile';
import { PasswordRecoverySkeleton } from './PasswordRecoverySkeleton';

const PasswordRecoveryContainer: React.FC<any> = () => {
  /** hooks */
  const { xs } = useScreenHook();
  const [error, setError] = useState('');
  const intl = useIntl();

  /** Requests */
  const recoveryPasswordRequest = useRequest(recoveryPassword, { manual: true });

  /** Models */
  const handleSubmit = async (values: any, recaptchaRef: any) => {
    const { email } = values;
    const isEmail = yup.string().email();
    const isValidEmail = isEmail.isValidSync(email);
    let validateCredentials = { email: '' };

    const recaptcha = !!recaptchaRef.current.getValue();

    console.log(recaptcha)
    console.log(values.email, isValidEmail)

    if (recaptcha && isValidEmail) {
      validateCredentials = { email: values.email };
      recoveryPasswordRequest.runAsync(validateCredentials);
    }
  };

  useEffect(() => {

    console.log(recoveryPasswordRequest)
    const { error } = recoveryPasswordRequest;

    if (error) {
      setError(
        intl.formatMessage({
          id: 'pages.passwordRecovery.invalid',
          defaultMessage: 'Email não cadastrado',
        }),
      );
    }
  }, [recoveryPasswordRequest]);

  return (
    <>
      {false ? (
        <PasswordRecoverySkeleton />
      ) : xs ? (
        <PasswordRecoveryMobile
          handleSubmit={handleSubmit}
          loading={recoveryPasswordRequest.loading}
          error={error}
        />
      ) : (
        <PasswordRecoveryComponent
          handleSubmit={handleSubmit}
          loading={recoveryPasswordRequest.loading}
          error={error}
        />
      )}
    </>
  );
};

export { PasswordRecoveryContainer };
