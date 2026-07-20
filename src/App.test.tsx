import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the MiniCalc scaffold placeholder', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /vite, react, and tailwind are ready/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('MiniCalc')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });
});
