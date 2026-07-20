import { createCalculatorState } from './calculator/engine';
import { CalculatorCard } from './components/CalculatorCard';

function App() {
  const calculator = createCalculatorState();

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-5 py-10 text-zinc-950">
      <CalculatorCard displayValue={calculator.display} />
    </main>
  );
}

export default App;
