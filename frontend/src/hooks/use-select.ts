import { useRef, useState } from "react";

const useSelect = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );
  const [isTouched, setIsTouched] = useState(false);

  const hasError = isTouched && !selectedValue;

  const valueChangeHandler = (newValue: any) => {
    setSelectedValue(newValue.value);
  };

  const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  return {
    selectedValue,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useSelect;
