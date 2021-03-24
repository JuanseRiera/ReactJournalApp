import { useState } from "react";
import PropTypes from "prop-types";

export const useCounter = (initialValue = 10) => {
  const [counter, setcounter] = useState(initialValue);

  const incrementar = (factor) => {
    setcounter(counter + factor);
  };

  const decrementar = (factor) => {
    setcounter(counter - factor);
  };

  const reset = () => {
    setcounter(initialValue);
  };

  return { counter, incrementar, decrementar, reset };
};

useCounter.propTypes = {
  initialValue: PropTypes.number.isRequired,
};
