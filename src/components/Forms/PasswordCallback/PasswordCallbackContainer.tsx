import { useScreenHook } from '@/hooks/screen';
import { recoveryPassword } from '@/services/auth';
import { useIntl, history } from '@umijs/max';
import { useRequest } from 'ahooks';
import { useState } from 'react';
import * as yup from 'yup';
import { message } from 'antd';
import { PasswordCallbackSkeleton } from './PasswordCallbackSkeleton';
import { PasswordCallbackMobile } from './PasswordCallbackMobile';

const PasswordCallbackContainer: React.FC<any> = () => {
  /** hooks */
  const { xs } = useScreenHook();
  const [error, setError] = useState('');
  const intl = useIntl();

  /** Requests */
  const recoveryPasswordReq = useRequest(recoveryPassword, { manual: true });

  /** Models */
  const handleSubmit = async (values: any) => {
    const { email } = values;
    const isEmail = yup.string().email();
    const isValidEmail = isEmail.isValidSync(email);
    let validateCredentials = { email: 'ariadne.vieira@irricontrol.com.br' };

    if (isValidEmail) {
      validateCredentials = { email: values.email };
      try {
        recoveryPasswordReq.runAsync(validateCredentials);
      } catch (error) {
        message.error({
          type: 'error',
          content: intl.formatMessage({
            id: 'component.forms.register.fail',
            defaultMessage: 'Falha ao Registrar',
          }),
          duration: 3,
        });
      } finally {
        history.push('/user/recovery-success')
      }
    }
  };

  return (
    <>
      {false ? (
        <PasswordCallbackSkeleton />
      ) : xs ? (
        <PasswordCallbackMobile
          handleSubmit={handleSubmit}
          loading={recoveryPasswordReq.loading}
          error={error}
        />
      ) : (
        <PasswordCallbackMobile
          handleSubmit={handleSubmit}
          loading={recoveryPasswordReq.loading}
          error={error}
        />
      )}
    </>
  );
};

export { PasswordCallbackContainer };
