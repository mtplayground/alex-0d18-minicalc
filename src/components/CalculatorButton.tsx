import type { ButtonHTMLAttributes, ReactNode } from 'react';

type CalculatorButtonVariant = 'digit' | 'operator' | 'primary' | 'utility';

interface CalculatorButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: CalculatorButtonVariant;
}

const variantClasses: Record<CalculatorButtonVariant, string> = {
  digit: 'bg-white text-zinc-950 hover:bg-zinc-200 active:bg-zinc-300',
  operator:
    'bg-teal-50 text-teal-800 hover:bg-teal-100 active:bg-teal-200',
  primary:
    'bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950 font-semibold',
  utility: 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300 active:bg-zinc-400',
};

export function CalculatorButton({
  children,
  className = '',
  type = 'button',
  variant = 'digit',
  ...props
}: CalculatorButtonProps) {
  return (
    <button
      className={`min-h-14 rounded-md px-3 text-xl font-medium transition-colors duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-16 ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
