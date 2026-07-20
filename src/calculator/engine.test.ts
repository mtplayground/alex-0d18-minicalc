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
  const initialState = createCalculatorState();

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

  it('starts decimal entry from a waiting operand state', () => {
    let state = enterDigits(createCalculatorState(), '5');

    state = chooseOperation(state, 'add');
    state = inputDecimal(state);
    state = inputDigit(state, 2);
    state = calculateEquals(state);

    expect(state.display).toBe('5.2');
  });

  it('runs each basic operation directly through the engine', () => {
    const cases = [
      ['add', '14'],
      ['subtract', '6'],
      ['multiply', '40'],
      ['divide', '2.5'],
    ] as const;

    for (const [operator, expected] of cases) {
      let state = enterDigits(createCalculatorState(), '10');
      state = chooseOperation(state, operator);
      state = inputDigit(state, 4);
      state = calculateEquals(state);

      expect(state.display).toBe(expected);
      expect(state.operator).toBeNull();
      expect(state.storedValue).toBeNull();
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

  it('allows replacing the pending operation before entering the next operand', () => {
    let state = enterDigits(createCalculatorState(), '8');

    state = chooseOperation(state, 'add');
    state = chooseOperation(state, 'subtract');
    state = inputDigit(state, 2);
    state = calculateEquals(state);

    expect(state.display).toBe('6');
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

  it('uses the stored value as the repeated operand when equals follows an operator', () => {
    let state = enterDigits(createCalculatorState(), '6');

    state = chooseOperation(state, 'multiply');
    state = calculateEquals(state);
    state = calculateEquals(state);

    expect(state.display).toBe('216');
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

  it('clears back to the initial reset state from digit entry', () => {
    const state = enterDigits(createCalculatorState(), '42');

    expect(clearCalculator()).toEqual(initialState);
    expect(clearCalculator()).not.toBe(state);
  });

  it('clears back to the initial reset state from a pending operation', () => {
    const state = chooseOperation(enterDigits(createCalculatorState(), '42'), 'add');

    expect(state.operator).toBe('add');
    expect(clearCalculator()).toEqual(initialState);
  });

  it('clears back to the initial reset state after a result', () => {
    let state = enterDigits(createCalculatorState(), '42');

    state = chooseOperation(state, 'multiply');
    state = inputDigit(state, 9);
    state = calculateEquals(state);

    expect(state.display).toBe('378');
    expect(clearCalculator()).toEqual(initialState);
  });

  it('clears back to the initial reset state from an error', () => {
    let state = inputDigit(createCalculatorState(), 1);

    state = chooseOperation(state, 'divide');
    state = inputDigit(state, 0);
    state = calculateEquals(state);

    expect(state.error).toBe('Cannot divide by zero');
    state = clearCalculator();

    expect(state).toEqual(initialState);
  });
});
