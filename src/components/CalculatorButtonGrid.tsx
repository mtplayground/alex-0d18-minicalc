import type { CalculatorOperator } from '../calculator/engine';
import type { CalculatorButtonId } from '../calculator/useCalculatorKeyboard';
import { CalculatorButton } from './CalculatorButton';

interface CalculatorButtonGridProps {
  activeButton: CalculatorButtonId | null;
  onClear: () => void;
  onDecimal: () => void;
  onDigit: (digit: string) => void;
  onEquals: () => void;
  onOperator: (operator: CalculatorOperator) => void;
}

const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3'] as const;

export function CalculatorButtonGrid({
  activeButton,
  onClear,
  onDecimal,
  onDigit,
  onEquals,
  onOperator,
}: CalculatorButtonGridProps) {
  return (
    <div
      aria-label="Calculator keypad"
      className="mt-6 grid grid-cols-4 gap-3"
      role="group"
    >
      <CalculatorButton
        aria-label="Clear"
        onClick={onClear}
        pressed={activeButton === 'clear'}
        variant="utility"
      >
        C
      </CalculatorButton>
      <CalculatorButton
        aria-label="Divide"
        onClick={() => onOperator('divide')}
        pressed={activeButton === 'divide'}
        variant="operator"
      >
        ÷
      </CalculatorButton>
      <CalculatorButton
        aria-label="Multiply"
        onClick={() => onOperator('multiply')}
        pressed={activeButton === 'multiply'}
        variant="operator"
      >
        ×
      </CalculatorButton>
      <CalculatorButton
        aria-label="Subtract"
        onClick={() => onOperator('subtract')}
        pressed={activeButton === 'subtract'}
        variant="operator"
      >
        −
      </CalculatorButton>

      {digits.slice(0, 3).map((digit) => (
        <CalculatorButton
          key={digit}
          onClick={() => onDigit(digit)}
          pressed={activeButton === `digit-${digit}`}
        >
          {digit}
        </CalculatorButton>
      ))}
      <CalculatorButton
        aria-label="Add"
        onClick={() => onOperator('add')}
        pressed={activeButton === 'add'}
        variant="operator"
      >
        +
      </CalculatorButton>

      {digits.slice(3, 6).map((digit) => (
        <CalculatorButton
          key={digit}
          onClick={() => onDigit(digit)}
          pressed={activeButton === `digit-${digit}`}
        >
          {digit}
        </CalculatorButton>
      ))}
      <CalculatorButton
        aria-label="Equals"
        className="col-start-4 row-start-3 row-span-3"
        onClick={onEquals}
        pressed={activeButton === 'equals'}
        variant="primary"
      >
        =
      </CalculatorButton>

      {digits.slice(6).map((digit) => (
        <CalculatorButton
          key={digit}
          onClick={() => onDigit(digit)}
          pressed={activeButton === `digit-${digit}`}
        >
          {digit}
        </CalculatorButton>
      ))}

      <CalculatorButton
        className="col-span-2"
        onClick={() => onDigit('0')}
        pressed={activeButton === 'digit-0'}
      >
        0
      </CalculatorButton>
      <CalculatorButton
        aria-label="Decimal point"
        onClick={onDecimal}
        pressed={activeButton === 'decimal'}
      >
        .
      </CalculatorButton>
    </div>
  );
}
