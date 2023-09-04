import { useScreenHook } from '@/hooks/screen';
import { login } from '@/services/auth';
import { currentUser as queryCurrentUser } from '@/services/user/index';
import { useIntl, useModel, history } from '@umijs/max';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import * as yup from 'yup';
import { LoginFormComponent } from './LoginComponent';
import { LoginFormMobile } from './LoginMobile';
import { LoginFormSkeleton } from './LoginSkeleton';

const LoginFormContainer: React.FC<any> = () => {
  /** hooks */
  const { xs } = useScreenHook();
  const [error, setError] = useState('');
  const intl = useIntl();

  /** Requests */
  const loginReq = useRequest(login, { manual: true });

  /** Models */
  const { initialState, setInitialState } = useModel('@@initialState');


  const fetchUserInfo = async () => {
    const queryUser = async () => {
      try {
        // Need Change
        const msg: any = await queryCurrentUser({
          skipErrorHandler: true,
        });
        return msg.profile;
      } catch {}
      return undefined;
    };

    const userInfo = await queryUser();

    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
          collapsed: initialState?.collapsed ? true : false,
        }));
      });
    }
  };

  const handleSubmit = async (values: any) => {
    const { email } = values;
    const isEmail = yup.string().email();
    const isValidEmail = isEmail.isValidSync(email);
    let flexBody = {};

    if (isValidEmail) {
      flexBody = values;
    } else {
      flexBody = { username: values.email, password: values.password };
    }

    const data = await loginReq.runAsync({ ...flexBody, method: 'password' });
    localStorage.setItem('token', data.token);
    await fetchUserInfo();
    message.success({
      type: 'success',
      content: intl.formatMessage({
        id: 'pages.login.welcome',
        defaultMessage: 'Bem vindo',
      }),
      duration: 3,
    });
    history.push(`/farms/:id`);

    return;
  };

  useEffect(() => {
    const { error } = loginReq;
    if (error) {
      setError(
        intl.formatMessage({
          id: 'pages.login.invalid',
          defaultMessage: 'Credenciais Inválidas',
        }),
      );
    }
  }, [loginReq]);

  return (
    <>
      {false ? (
        <LoginFormSkeleton />
      ) : xs ? (
        <LoginFormMobile handleSubmit={handleSubmit} loading={loginReq.loading} error={error} />
      ) : (
        <LoginFormComponent handleSubmit={handleSubmit} loading={loginReq.loading} error={error} />
      )}
    </>
  );
};

export { LoginFormContainer };
