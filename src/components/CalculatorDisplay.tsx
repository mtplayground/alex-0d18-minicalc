interface CalculatorDisplayProps {
  value: string;
}

export function CalculatorDisplay({ value }: CalculatorDisplayProps) {
  const sizeClass =
    value.length > 24
      ? 'text-2xl'
      : value.length > 18
      ? 'text-3xl'
      : value.length > 12
        ? 'text-4xl'
        : 'text-5xl';

  return (
    <output
      aria-label="Calculator display"
      aria-live="polite"
      className={`flex min-h-24 w-full items-center justify-end overflow-x-auto whitespace-nowrap rounded-md bg-white px-4 py-5 text-right font-sans font-semibold leading-none text-zinc-950 shadow-inner ring-1 ring-zinc-200 [font-variant-numeric:tabular-nums] sm:px-5 sm:py-6 ${sizeClass}`}
      title={value}
    >
      {value}
    </output>
  );
}
