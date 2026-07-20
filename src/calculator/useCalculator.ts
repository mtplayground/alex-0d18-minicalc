import { useCallback, useMemo, useState } from 'react';
import {
  calculateEquals,
  chooseOperation,
  clearCalculator,
  createCalculatorState,
  inputDecimal,
  inputDigit,
  type CalculatorOperator,
} from './engine';

export interface CalculatorActions {
  clear: () => void;
  enterDecimal: () => void;
  enterDigit: (digit: string) => void;
  enterEquals: () => void;
  enterOperator: (operator: CalculatorOperator) => void;
}

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

  const actions = useMemo<CalculatorActions>(
    () => ({
      clear,
      enterDecimal,
      enterDigit,
      enterEquals,
      enterOperator,
    }),
    [clear, enterDecimal, enterDigit, enterEquals, enterOperator],
  );

  return {
    state,
    actions,
  };
}
