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
});
