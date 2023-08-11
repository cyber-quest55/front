import { useWindowWidth } from '@react-hook/window-size'  ;

const useScreenHook: () => {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
} = () => {
  const onlyWidth = useWindowWidth();

  /**
   * Mobile width
   */
  const xs = onlyWidth < 576;

  /**
   * Tablet width
   */
  const sm = onlyWidth >= 576;

  /**
   * Tablet width
   */
  const md = onlyWidth >= 768;

  /**
   * PC width
   */
  const lg = onlyWidth >= 992;

  /**
   * PC width
   */
  const xl = onlyWidth >= 1200;

  /**
   * Large PC width
   */
  const xxl = onlyWidth >= 1600;

  return { xs, sm, md, lg, xl, xxl };
};

export { useScreenHook };
