import { useEffect, useState } from 'react';
import type { CalculatorOperator } from './engine';
import type { CalculatorActions } from './useCalculator';

export type CalculatorButtonId =
  | `digit-${string}`
  | 'add'
  | 'subtract'
  | 'multiply'
  | 'divide'
  | 'decimal'
  | 'equals'
  | 'clear';

interface KeyboardAction {
  buttonId: CalculatorButtonId;
  run: (actions: CalculatorActions) => void;
}

const operatorKeys: Record<string, CalculatorOperator> = {
  '+': 'add',
  NumpadAdd: 'add',
  '-': 'subtract',
  NumpadSubtract: 'subtract',
  '*': 'multiply',
  x: 'multiply',
  X: 'multiply',
  NumpadMultiply: 'multiply',
  '/': 'divide',
  NumpadDivide: 'divide',
};

export function useCalculatorKeyboard(actions: CalculatorActions) {
  const [activeButton, setActiveButton] = useState<CalculatorButtonId | null>(
    null,
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const action = getKeyboardAction(event.key, event.code);

      if (!action) {
        return;
      }

      event.preventDefault();
      setActiveButton(action.buttonId);
      action.run(actions);
    }

    function handleKeyUp(event: KeyboardEvent) {
      const action = getKeyboardAction(event.key, event.code);

      if (!action) {
        return;
      }

      event.preventDefault();
      setActiveButton((current) =>
        current === action.buttonId ? null : current,
      );
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [actions]);

  return activeButton;
}

function getKeyboardAction(key: string, code = ''): KeyboardAction | null {
  const digit = getDigitKey(key, code);

  if (digit) {
    return {
      buttonId: `digit-${digit}`,
      run: (actions) => actions.enterDigit(digit),
    };
  }

  if (key === '.' || code === 'NumpadDecimal') {
    return {
      buttonId: 'decimal',
      run: (actions) => actions.enterDecimal(),
    };
  }

  if (key === 'Enter' || key === '=' || code === 'NumpadEnter') {
    return {
      buttonId: 'equals',
      run: (actions) => actions.enterEquals(),
    };
  }

  if (key === 'Escape' || key === 'Delete') {
    return {
      buttonId: 'clear',
      run: (actions) => actions.clear(),
    };
  }

  const operator = operatorKeys[key] ?? operatorKeys[code];

  if (operator) {
    return {
      buttonId: operator,
      run: (actions) => actions.enterOperator(operator),
    };
  }

  return null;
}

function getDigitKey(key: string, code: string): string | null {
  if (/^\d$/.test(key)) {
    return key;
  }

  if (/^Digit\d$/.test(code) || /^Numpad\d$/.test(code)) {
    return code.slice(-1);
  }

  return null;
}
