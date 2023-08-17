import { SetStateAction, useState } from 'react';

const useTabsHook: (s: string) => {
  tab: string;
  setTab: SetStateAction<any | undefined>;
} = (s: string) => {
  /**
   * It defines the current Tab
   */
  const [tab, setTab] = useState<string>(s);
  return { tab, setTab };
};

export { useTabsHook };
