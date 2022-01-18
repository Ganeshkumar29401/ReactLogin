import { useState } from "react";

const useInput = (validator) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const isValid = validator(enteredValue);
  const isInvalid = !isValid && isTouched;

  const Changehandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const BlurHandler = () => {
    setIsTouched(true);
  };

  const resetHandler = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    isValid,
    isInvalid,
    Changehandler,
    BlurHandler,
    resetHandler,
  };
};

export default useInput;
