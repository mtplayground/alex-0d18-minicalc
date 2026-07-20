export type CalculatorOperator = 'add' | 'subtract' | 'multiply' | 'divide';

export type CalculatorError = 'Cannot divide by zero';

export interface PendingOperation {
  operator: CalculatorOperator;
  operand: string;
}

export interface CalculatorState {
  display: string;
  storedValue: string | null;
  operator: CalculatorOperator | null;
  waitingForOperand: boolean;
  error: CalculatorError | null;
  lastOperation: PendingOperation | null;
}

const initialState: CalculatorState = {
  display: '0',
  storedValue: null,
  operator: null,
  waitingForOperand: false,
  error: null,
  lastOperation: null,
};

export function createCalculatorState(): CalculatorState {
  return { ...initialState };
}

export function clearCalculator(): CalculatorState {
  return createCalculatorState();
}

export function inputDigit(
  state: CalculatorState,
  digit: number | string,
): CalculatorState {
  const nextDigit = String(digit);

  if (!/^\d$/.test(nextDigit)) {
    throw new Error(`Invalid calculator digit: ${nextDigit}`);
  }

  if (state.error || state.waitingForOperand) {
    return {
      ...state,
      display: nextDigit,
      waitingForOperand: false,
      error: null,
    };
  }

  const display =
    state.display === '0' ? nextDigit : normalizeEntry(state.display + nextDigit);

  return {
    ...state,
    display,
    lastOperation: null,
  };
}

export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.error || state.waitingForOperand) {
    return {
      ...state,
      display: '0.',
      waitingForOperand: false,
      error: null,
    };
  }

  if (state.display.includes('.')) {
    return state;
  }

  return {
    ...state,
    display: `${state.display}.`,
    lastOperation: null,
  };
}

export function chooseOperation(
  state: CalculatorState,
  operator: CalculatorOperator,
): CalculatorState {
  if (state.error) {
    return {
      ...createCalculatorState(),
      operator,
      storedValue: '0',
      waitingForOperand: true,
    };
  }

  if (state.operator && !state.waitingForOperand && state.storedValue !== null) {
    const result = performOperation(
      state.storedValue,
      state.display,
      state.operator,
    );

    if (result.error) {
      return toErrorState(result.error);
    }

    return {
      ...state,
      display: result.value,
      storedValue: result.value,
      operator,
      waitingForOperand: true,
      lastOperation: null,
    };
  }

  return {
    ...state,
    storedValue: state.storedValue ?? stripEntryMarker(state.display),
    operator,
    waitingForOperand: true,
    lastOperation: null,
  };
}

export function calculateEquals(state: CalculatorState): CalculatorState {
  if (state.error) {
    return state;
  }

  const pending =
    state.operator && state.storedValue !== null
      ? {
          operator: state.operator,
          left: state.storedValue,
          right: state.waitingForOperand ? state.storedValue : state.display,
        }
      : state.lastOperation
        ? {
            operator: state.lastOperation.operator,
            left: state.display,
            right: state.lastOperation.operand,
          }
        : null;

  if (!pending) {
    return state;
  }

  const result = performOperation(pending.left, pending.right, pending.operator);

  if (result.error) {
    return toErrorState(result.error);
  }

  return {
    ...state,
    display: result.value,
    storedValue: null,
    operator: null,
    waitingForOperand: true,
    lastOperation: {
      operator: pending.operator,
      operand: stripEntryMarker(pending.right),
    },
  };
}

interface OperationResult {
  value: string;
  error: CalculatorError | null;
}

function performOperation(
  left: string,
  right: string,
  operator: CalculatorOperator,
): OperationResult {
  const leftNumber = Number(stripEntryMarker(left));
  const rightNumber = Number(stripEntryMarker(right));

  if (operator === 'divide' && rightNumber === 0) {
    return { value: '0', error: 'Cannot divide by zero' };
  }

  const raw =
    operator === 'add'
      ? leftNumber + rightNumber
      : operator === 'subtract'
        ? leftNumber - rightNumber
        : operator === 'multiply'
          ? leftNumber * rightNumber
          : leftNumber / rightNumber;

  return {
    value: formatResult(raw),
    error: null,
  };
}

function toErrorState(error: CalculatorError): CalculatorState {
  return {
    ...createCalculatorState(),
    display: error,
    error,
  };
}

function normalizeEntry(value: string): string {
  if (value.includes('.')) {
    const [whole, fraction] = value.split('.');
    return `${normalizeWholeNumber(whole)}.${fraction}`;
  }

  return normalizeWholeNumber(value);
}

function normalizeWholeNumber(value: string): string {
  const normalized = value.replace(/^0+(?=\d)/, '');
  return normalized === '' ? '0' : normalized;
}

function stripEntryMarker(value: string): string {
  return value.endsWith('.') ? value.slice(0, -1) : value;
}

function formatResult(value: number): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  const rounded = Number.parseFloat(value.toPrecision(12));

  if (Object.is(rounded, -0)) {
    return '0';
  }

  return String(rounded);
}
