import { render, screen } from '@testing-library/react';
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
});
