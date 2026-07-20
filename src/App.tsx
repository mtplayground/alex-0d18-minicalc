import { useCalculator } from './calculator/useCalculator';
import { useCalculatorKeyboard } from './calculator/useCalculatorKeyboard';
import { CalculatorCard } from './components/CalculatorCard';

function App() {
  const { actions, state } = useCalculator();
  const activeButton = useCalculatorKeyboard(actions);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 p-4 text-zinc-950 sm:p-6">
      <CalculatorCard
        activeButton={activeButton}
        displayValue={state.display}
        onClear={actions.clear}
        onDecimal={actions.enterDecimal}
        onDigit={actions.enterDigit}
        onEquals={actions.enterEquals}
        onOperator={actions.enterOperator}
      />
    </main>
  );
}

export default App;
