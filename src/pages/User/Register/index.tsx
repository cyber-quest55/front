import { RegisterFormContainer } from '@/components/Forms/Register/RegisterContainer';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Image } from 'antd';
import LogoBgWhite from '../../../../public/images/logo-baueric-white-big.svg';

export default () => {
  const pageClassName = useEmotionCss(() => {
    return {
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(315deg,#037ade,#74d680 74%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 24,
      overflowY: 'auto'
    };
  });

  return (
    <section className={pageClassName}>
      <Image height={65} width={250} preview={false} src={LogoBgWhite} alt="logo-ic-bauer" style={{marginTop: 12}}/>
      <RegisterFormContainer />
    </section>
  );
};
