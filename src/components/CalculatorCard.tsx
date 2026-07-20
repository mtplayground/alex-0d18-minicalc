import type { CalculatorOperator } from '../calculator/engine';
import { CalculatorButtonGrid } from './CalculatorButtonGrid';
import { CalculatorDisplay } from './CalculatorDisplay';

interface CalculatorCardProps {
  displayValue: string;
  onClear: () => void;
  onDecimal: () => void;
  onDigit: (digit: string) => void;
  onEquals: () => void;
  onOperator: (operator: CalculatorOperator) => void;
}

export function CalculatorCard({
  displayValue,
  onClear,
  onDecimal,
  onDigit,
  onEquals,
  onOperator,
}: CalculatorCardProps) {
  return (
    <section
      aria-label="Calculator"
      className="w-full max-w-sm rounded-lg border border-zinc-200 bg-zinc-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-8"
    >
      <CalculatorDisplay value={displayValue} />
      <CalculatorButtonGrid
        onClear={onClear}
        onDecimal={onDecimal}
        onDigit={onDigit}
        onEquals={onEquals}
        onOperator={onOperator}
      />
    </section>
  );
}
