import { useCalculator } from './calculator/useCalculator';
import { CalculatorCard } from './components/CalculatorCard';

function App() {
  const { actions, state } = useCalculator();

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-5 py-10 text-zinc-950">
      <CalculatorCard
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
