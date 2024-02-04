import { useState } from "react";

type HookReturn = {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  hasError: boolean;
};

const useInput: (
  defaultValue: string,
  validationFunction: (value: string, otherValue?: string) => boolean
) => HookReturn = (defaultValue, validationFunction) => {
  const [didEdit, setDidEdit] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);

  const valueIsValid = validationFunction(inputValue);

  const handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    setInputValue(event.target.value);
    setDidEdit(false);
  };

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    inputValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
};

export default useInput;
