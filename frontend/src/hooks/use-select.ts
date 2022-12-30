import { ChangeEventHandler, SyntheticEvent, useRef, useState } from "react";
const useSelect = () => {
  const [selectedValue, setSelectedValue] = useState<
    { value: string; label: string } | null | undefined
  >(undefined);

  const [isTouched, setIsTouched] = useState(false);

  const hasError = isTouched && !selectedValue?.value;

  console.log(hasError);

  const valueChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    newValue: { value: string; label: string } | null | undefined
  ) => {
    console.log(newValue);
    setSelectedValue(newValue);
  };

  const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  const defaultValueReceive = (value: { value: string; label: string }) => {
    setSelectedValue(value);
  };

  return {
    selectedValue,
    setSelectedValue,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    defaultValueReceive,
  };
};
export default useSelect;
