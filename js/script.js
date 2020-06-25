const FUNCTION_NAMES = {
  add: () => add,
  sub: () => sub,
  mul: () => mul,
  div: () => div,
  neg: () => neg,
};

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;
const neg = (a, _) => -a;

const operate = (operator, a, b) => {
  operator = FUNCTION_NAMES[operator]();
  a = Number(a);
  b = Number(b);

  return operator(a, b);
};

const numbers__button = document.querySelectorAll('#buttons .number');
const historyDisplay__div = document.getElementById('history');
const resultDisplay__div = document.getElementById('result');
const operators__button = document.querySelectorAll('#buttons .operator');

let storedValue = '',
  prevValue = '',
  resultValue = '',
  currValue = '',
  operator;

const fillDisplay = function () {
  // prevents two or more decimal points
  if (currValue.includes('.') && this.value === '.') return;

  if (currValue.length > 13) return;

  if (currValue === '0') {
    currValue = this.value;
  } else {
    currValue += this.value;
  }

  resultDisplay__div.textContent = currValue;
};

numbers__button.forEach((number) =>
  number.addEventListener('click', fillDisplay)
);

const calculateAnswer = function () {
  storedValue = prevValue;
  prevValue = currValue;
  operator = this.id;
  resultValue = operate(operator, storedValue, prevValue);

  historyDisplay__div.textContent = `${storedValue} ${
    storedValue && this.value
  } ${prevValue}`;

  resultDisplay__div.textContent = resultValue;

  storedValue = prevValue;
  prevValue = resultValue;
  currValue = '';
};

operators__button.forEach((operator) =>
  operator.addEventListener('click', calculateAnswer)
);
