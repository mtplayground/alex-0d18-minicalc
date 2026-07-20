import {
  calculateEquals,
  chooseOperation,
  clearCalculator,
  createCalculatorState,
  inputDecimal,
  inputDigit,
  type CalculatorState,
} from './engine';

function enterDigits(state: CalculatorState, digits: string): CalculatorState {
  return digits.split('').reduce((next, digit) => inputDigit(next, digit), state);
}

describe('calculator engine', () => {
  it('handles digit and decimal-point entry', () => {
    let state = createCalculatorState();

    state = inputDigit(state, 0);
    state = inputDigit(state, 0);
    state = inputDigit(state, 7);
    state = inputDecimal(state);
    state = inputDigit(state, 5);
    state = inputDecimal(state);

    expect(state.display).toBe('7.5');
  });

  it('runs the four basic operations', () => {
    const cases = [
      ['add', '12'],
      ['subtract', '8'],
      ['multiply', '20'],
      ['divide', '5'],
    ] as const;

    for (const [operator, expected] of cases) {
      let state = enterDigits(createCalculatorState(), '10');
      state = chooseOperation(state, operator);
      state = inputDigit(state, 2);
      state = calculateEquals(state);

      expect(state.display).toBe(expected);
    }
  });

  it('supports chained operations', () => {
    let state = enterDigits(createCalculatorState(), '2');

    state = chooseOperation(state, 'add');
    state = inputDigit(state, 3);
    state = chooseOperation(state, 'multiply');
    state = inputDigit(state, 4);
    state = calculateEquals(state);

    expect(state.display).toBe('20');
  });

  it('repeats the previous operation when equals is pressed again', () => {
    let state = enterDigits(createCalculatorState(), '10');

    state = chooseOperation(state, 'subtract');
    state = inputDigit(state, 3);
    state = calculateEquals(state);
    state = calculateEquals(state);
    state = calculateEquals(state);

    expect(state.display).toBe('1');
  });

  it('shows divide-by-zero as a readable error that clears on next input', () => {
    let state = enterDigits(createCalculatorState(), '8');

    state = chooseOperation(state, 'divide');
    state = inputDigit(state, 0);
    state = calculateEquals(state);

    expect(state.display).toBe('Cannot divide by zero');
    expect(state.error).toBe('Cannot divide by zero');

    state = inputDigit(state, 4);

    expect(state.display).toBe('4');
    expect(state.error).toBeNull();
  });

  it('formats decimal results without floating-point noise', () => {
    let state = inputDigit(createCalculatorState(), 0);

    state = inputDecimal(state);
    state = inputDigit(state, 1);
    state = chooseOperation(state, 'add');
    state = inputDigit(state, 0);
    state = inputDecimal(state);
    state = inputDigit(state, 2);
    state = calculateEquals(state);

    expect(state.display).toBe('0.3');
  });

  it('clears back to the initial reset state', () => {
    let state = enterDigits(createCalculatorState(), '42');

    state = chooseOperation(state, 'multiply');
    state = inputDigit(state, 9);
    state = clearCalculator();

    expect(state).toEqual(createCalculatorState());
  });
});
