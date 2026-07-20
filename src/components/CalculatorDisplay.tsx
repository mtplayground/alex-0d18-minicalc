interface CalculatorDisplayProps {
  value: string;
}

export function CalculatorDisplay({ value }: CalculatorDisplayProps) {
  const sizeClass =
    value.length > 18
      ? 'text-3xl'
      : value.length > 12
        ? 'text-4xl'
        : 'text-6xl';

  return (
    <output
      aria-label="Calculator display"
      className={`block min-h-24 w-full overflow-hidden break-all rounded-md bg-white px-5 py-6 text-right font-sans font-semibold leading-none text-zinc-950 shadow-inner ring-1 ring-zinc-200 ${sizeClass}`}
    >
      {value}
    </output>
  );
}
