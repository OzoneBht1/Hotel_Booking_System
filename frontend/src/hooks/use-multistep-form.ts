import React, { useState, ReactElement } from "react";
export const useMultistepForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((prevIndex) => {
      if (prevIndex > steps.length - 1) {
        return prevIndex;
      }
      return prevIndex + 1;
    });
  };

  const prev = () => {
    setCurrentStepIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return prevIndex;
      }
      return prevIndex - 1;
    });
  };

  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStepIndex,
    next,
    prev,
    goTo,
    steps,
  };
};
