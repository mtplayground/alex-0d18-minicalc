import { useCallback, useState } from 'react';
import {
  calculateEquals,
  chooseOperation,
  clearCalculator,
  createCalculatorState,
  inputDecimal,
  inputDigit,
  type CalculatorOperator,
} from './engine';

export function useCalculator() {
  const [state, setState] = useState(createCalculatorState);

  const clear = useCallback(() => {
    setState(clearCalculator());
  }, []);

  const enterDecimal = useCallback(() => {
    setState((current) => inputDecimal(current));
  }, []);

  const enterDigit = useCallback((digit: string) => {
    setState((current) => inputDigit(current, digit));
  }, []);

  const enterEquals = useCallback(() => {
    setState((current) => calculateEquals(current));
  }, []);

  const enterOperator = useCallback((operator: CalculatorOperator) => {
    setState((current) => chooseOperation(current, operator));
  }, []);

  return {
    state,
    actions: {
      clear,
      enterDecimal,
      enterDigit,
      enterEquals,
      enterOperator,
    },
  };
}
