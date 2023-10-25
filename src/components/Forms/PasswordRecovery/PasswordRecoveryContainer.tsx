import { useScreenHook } from '@/hooks/screen';
import { recoveryPassword } from '@/services/auth';
import { useIntl, history } from '@umijs/max';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { PasswordRecoveryComponent } from './PasswordRecoveryComponent';
import { PasswordRecoveryMobile } from './PasswordRecoveryMobile';
import { PasswordRecoverySkeleton } from './PasswordRecoverySkeleton';
import { Button, Card, Modal, Result, Typography, message } from 'antd';

const PasswordRecoveryContainer: React.FC<any> = () => {
  /** hooks */
  const { xs } = useScreenHook();
  const [error, setError] = useState('');
  const intl = useIntl();

  /** Requests */
  const recoveryPasswordReq = useRequest(recoveryPassword, { manual: true });

  /** Models */
  const handleSubmit = async (values: any, recaptchaRef: any) => {
    const { email } = values;
    const isEmail = yup.string().email();
    const isValidEmail = isEmail.isValidSync(email);
    let validateCredentials = { email: 'ariadne.vieira@irricontrol.com.br' };

    const recaptcha = !!recaptchaRef.current.getValue();

    if (recaptcha && isValidEmail) {
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
        <PasswordRecoverySkeleton />
      ) : xs ? (
        <PasswordRecoveryMobile
          handleSubmit={handleSubmit}
          loading={recoveryPasswordReq.loading}
          error={error}
        />
      ) : (
        <PasswordRecoveryComponent
          handleSubmit={handleSubmit}
          loading={recoveryPasswordReq.loading}
          error={error}
        />
      )}
    </>
  );
};

export { PasswordRecoveryContainer };
