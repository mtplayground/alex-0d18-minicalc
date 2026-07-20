import { useState } from 'react';
import {
  calculateEquals,
  chooseOperation,
  clearCalculator,
  createCalculatorState,
  inputDecimal,
  inputDigit,
  type CalculatorOperator,
} from './calculator/engine';
import { CalculatorCard } from './components/CalculatorCard';

function App() {
  const [calculator, setCalculator] = useState(createCalculatorState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-5 py-10 text-zinc-950">
      <CalculatorCard
        displayValue={calculator.display}
        onClear={() => setCalculator(clearCalculator())}
        onDecimal={() => setCalculator((state) => inputDecimal(state))}
        onDigit={(digit) => setCalculator((state) => inputDigit(state, digit))}
        onEquals={() => setCalculator((state) => calculateEquals(state))}
        onOperator={(operator: CalculatorOperator) =>
          setCalculator((state) => chooseOperation(state, operator))
        }
      />
    </main>
  );
}

export default App;
