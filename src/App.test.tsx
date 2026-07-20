import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders the calculator card and initial display', () => {
    render(<App />);

    expect(screen.getByLabelText('Calculator')).toBeInTheDocument();
    expect(screen.getByLabelText('Calculator display')).toHaveTextContent('0');
    expect(
      screen.queryByText(/vite, react, and tailwind are ready/i),
    ).not.toBeInTheDocument();
  });

  it('renders a usable calculator button grid', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.getByRole('group', { name: 'Calculator keypad' }),
    ).toBeInTheDocument();

    for (const label of [
      'Clear',
      'Divide',
      'Multiply',
      'Subtract',
      'Add',
      'Equals',
      'Decimal point',
    ]) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }

    for (const digit of ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) {
      expect(screen.getByRole('button', { name: digit })).toBeInTheDocument();
    }

    await user.click(screen.getByRole('button', { name: '7' }));
    await user.click(screen.getByRole('button', { name: 'Add' }));
    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));

    expect(screen.getByLabelText('Calculator display')).toHaveTextContent('12');
  });

  it('renders divide-by-zero errors and clears back to zero', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '8' }));
    await user.click(screen.getByRole('button', { name: 'Divide' }));
    await user.click(screen.getByRole('button', { name: '0' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));

    expect(screen.getByLabelText('Calculator display')).toHaveTextContent(
      'Cannot divide by zero',
    );

    await user.click(screen.getByRole('button', { name: 'Clear' }));

    expect(screen.getByLabelText('Calculator display')).toHaveTextContent('0');
  });
});
