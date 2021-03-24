import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formState, setformState] = useState(initialState);

  const reset = () => {
    setformState(initialState);
  };

  const changeInput = ({ target }) => {
    setformState(() => {
      return {
        ...formState,
        [target.name]: target.value,
      };
    });
  };

  return { formState, changeInput, reset };
};
