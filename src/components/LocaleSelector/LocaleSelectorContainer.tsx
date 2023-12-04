import { useScreenHook } from '@/hooks/screen';
import LocaleSelectorComponent from './LocaleSelectorComponent';
import LocaleSelectorMobile from './LocaleSelectorMobile';

type Props = {
  globalIconClassName?: string;
  postLocalesData?: (locales: any[]) => any[];
  onItemClick?: (params: any) => void;
  className?: string;
  reload?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  isCollapsed?: boolean;
};

const LocaleSelectorContainer: React.FC<Props> = (props) => {
  const { xs } = useScreenHook();

  return <>{xs ? <LocaleSelectorMobile {...props} /> : <LocaleSelectorComponent {...props} />}</>;
};

export default LocaleSelectorContainer;
