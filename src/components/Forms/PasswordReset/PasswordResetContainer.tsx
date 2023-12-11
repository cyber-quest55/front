import { useScreenHook } from '@/hooks/screen';
import { resetPassword } from '@/services/auth';
import { useIntl, history, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { useState } from 'react';
import { message } from 'antd';
import { PasswordResetSkeleton } from './PasswordResetSkeleton';
import { PasswordResetMobile } from './PasswordResetMobile';
import { PasswordResetComponent } from './PasswordResetComponent';

const PasswordResetContainer: React.FC<any> = () => {
  const { token } = useParams<{ token: string }>();

  console.log(token)

  /** hooks */
  const { xs } = useScreenHook();
  const [error, setError] = useState('');
  const intl = useIntl();

  /** Requests */
  const resetPasswordReq = useRequest(resetPassword, { manual: true });

  /** Models */
  const handleSubmit = async (values: any) => {
    const { password, confirmPassword } = values;
    if (values.password === values.confirmPassword && token) {
      const body = {
        new_password1: password,
        new_password2: confirmPassword
      };
      try {
        resetPasswordReq.runAsync(token, body);
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
        history.push('/user/reset-success')
      }
    }
  };

  return (
    <>
      {false ? (
        <PasswordResetSkeleton />
      ) : xs ? (
        <PasswordResetMobile
          handleSubmit={handleSubmit}
          loading={resetPasswordReq.loading}
          error={error}
        />
      ) : (
        <PasswordResetComponent
          handleSubmit={handleSubmit}
          loading={resetPasswordReq.loading}
          error={error}
        />
      )}
    </>
  );
};

export { PasswordResetContainer };
