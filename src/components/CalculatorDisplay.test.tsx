import { render, screen } from '@testing-library/react';
import { CalculatorDisplay } from './CalculatorDisplay';

describe('CalculatorDisplay', () => {
  it('renders the current value in a labeled display', () => {
    render(<CalculatorDisplay value="12345.67" />);

    expect(screen.getByLabelText('Calculator display')).toHaveTextContent(
      '12345.67',
    );
  });

  it('uses a smaller text class for long values', () => {
    render(<CalculatorDisplay value="1234567890123456789" />);

    expect(screen.getByLabelText('Calculator display')).toHaveClass('text-3xl');
  });

  it('keeps very long values on one scrollable line', () => {
    render(<CalculatorDisplay value="1234567890123456789012345" />);

    expect(screen.getByLabelText('Calculator display')).toHaveClass(
      'overflow-x-auto',
      'whitespace-nowrap',
      'text-2xl',
    );
  });
});
