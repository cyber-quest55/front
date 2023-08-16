import { SetStateAction, useState } from "react";

 
 
const useStepHook: (s: number) => {
  step: number;
  setStep: SetStateAction<any | undefined>;
} = (s: number) => {
 
  /**
   * Stepper Current Step
   */ 
  const [step, setStep] = useState<number>(s)
  return { step, setStep };
};

export { useStepHook };
