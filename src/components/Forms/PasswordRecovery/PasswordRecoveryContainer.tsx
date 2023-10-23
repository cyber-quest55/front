import { useScreenHook } from '@/hooks/screen';
import { checkUsername } from '@/services/auth';
import { currentUser as queryCurrentUser } from '@/services/user/index';
import { useIntl, useModel, history } from '@umijs/max';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { createRef, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import * as yup from 'yup';
import { PasswordRecoverySkeleton } from './PasswordRecoverySkeleton';
import { PasswordRecoveryMobile } from './PasswordRecoveryMobile';
import { PasswordRecoveryComponent } from './PasswordRecoveryComponent';

const PasswordRecoveryContainer: React.FC<any> = () => {
  /** hooks */
  const { xs } = useScreenHook();
  const [error, setError] = useState('');
  const intl = useIntl();

  /** Requests */
  const checkUsernameReq = useRequest(checkUsername, { manual: true });

  const validateEmail = async (values: any) => {
    const { email } = values;
    const isEmail = yup.string().email();

    console.log(email)
    const isValidEmail = isEmail.isValidSync(email);

    let validateCredential = { username: "" };

    if (isValidEmail) {

      validateCredential = { username: values.email };

      const usernameExists = checkUsernameReq.runAsync(validateCredential);
      if ((await usernameExists).available) {
        message.success({
          type: 'success',
          content: intl.formatMessage({
            id: 'pages.login.welcome1',
            defaultMessage: 'Enviado',
          }),
          duration: 3,
        });
      } else {
        setError(
          intl.formatMessage({
            id: 'pages.login.invalid',
            defaultMessage: 'Credenciais Inválidas',
          }),
        );
      }
    }
  }

  /** Models */
  const handleSubmit = async (values: any, recaptchaRef: any) => {
    const { email } = values;
    const isEmail = yup.string().email();

    const isValidEmail = isEmail.isValidSync(email);
    let validateCredential = { username: "" };

    // const recaptcha = !!recaptchaRef.current.getValue();
    const recaptcha = true

    if (recaptcha && isValidEmail) {
      validateCredential = { username: values.email };

      const usernameExists = checkUsernameReq.runAsync(validateCredential);
      if ((await usernameExists).available) {
        message.success({
          type: 'success',
          content: intl.formatMessage({
            id: 'pages.login.welcome1',
            defaultMessage: 'Enviado',
          }),
          duration: 3,
        });
      } else {
        setError(
          intl.formatMessage({
            id: 'pages.login.invalid',
            defaultMessage: 'Credenciais Inválidas',
          }),
        );
      }
      // history.push(`/user/login`);
    }

    return;
  };

  useEffect(() => {
    const { error } = checkUsernameReq;
    if (error) {
      setError(
        intl.formatMessage({
          id: 'pages.login.invalid',
          defaultMessage: 'Credenciais Inválidas',
        }),
      );
    }
  }, [checkUsernameReq]);

  return (
    <>
      {false ? (
        <PasswordRecoverySkeleton />
      ) : xs ? (
        <PasswordRecoveryMobile handleSubmit={handleSubmit} loading={checkUsernameReq.loading} error={error} validateEmail={validateEmail} />
      ) : (
        <PasswordRecoveryComponent handleSubmit={handleSubmit} loading={checkUsernameReq.loading} error={error} validateEmail={validateEmail} />
      )}
    </>
  );
};

export { PasswordRecoveryContainer };
