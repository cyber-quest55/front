import { SetStateAction, useState } from 'react';

const useTabsHook: (s: string) => {
  tab: string;
  setTab: SetStateAction<any | undefined>;
} = (s: string) => {
  /**
   * Stepper Current Step
   */
  const [tab, setTab] = useState<string>(s);
  return { tab, setTab };
};

export { useTabsHook };
