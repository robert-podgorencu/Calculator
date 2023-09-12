const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const numberButtons = document.getElementsByClassName("number-button");
const operationButtons = document.getElementsByClassName("operation-button");
const formulaScreen = document.getElementById("formula-screen");
const display = document.getElementById("display");

let previousNumber = 0;
let currentNumber = 0;
let formula = "";
let operation = "";
let previousOperation = "";

function clear() {
  previousNumber = 0;
  currentNumber = 0;
  formula = "";
  operation = "";
  previousOperation = "";
}

function appendNumber(number) {
  if (number === "." && currentNumber.includes(".")) return;
  currentNumber = currentNumber.toString() + number.toString();
  formula = formula + number;
}

function chooseOperation(operator) {
  if (previousNumber !== 0 && currentNumber !== 0) {
    calculate();
  }
  if (operator === "x") {
    operator = "*";
  }
  if (previousNumber === 0) {
    previousNumber = currentNumber;
  }
  previousOperation = operation;
  operation = operator;
  formula = formula + operation;
  currentNumber = 0;
}

function solve() {
  currentNumber = eval(formula);
  operation = "";
  previousNumber = 0;
}

function calculate() {
  let result;
  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  currentNumber = result;
  operation = undefined;
  previousNumber = 0;
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function updateDisplay() {
  display.innerText = getDisplayNumber(currentNumber);
  formulaScreen.innerText = formula.toString();
}

Array.from(numberButtons).forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

Array.from(operationButtons).forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculate();
  // solve();
  formula += " = " + currentNumber;
  updateDisplay();
});

clearButton.addEventListener("click", () => {
  clear();
  updateDisplay();
});
