//Variables to create event delegation pattern
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".display");
const operatorKeys = document.querySelectorAll(".key-operator");

// Function that calculates value based on first value, second value and operator
const calculate = (v1, operator, v2) => {
  const firstNum = parseFloat(v1);
  const secondNum = parseFloat(v2);
  if (operator == "add") return firstNum + secondNum;
  if (operator == "subtract") return firstNum - secondNum;
  if (operator == "multiply") return firstNum * secondNum;
  if (operator == "divide") return firstNum / secondNum;
};

//Function that triggers when number is clicked
const number = (value = {});

//Function that triggers when operator is clicked
// const operator = (key)={
//   key.classList.add('highlight');
// }

//Function that triggers different events depending on which button is pressed
keys.addEventListener("click", e => {
  if (e.target.matches("button")) {
    //pressed button
    const key = e.target;
    //action attribute of pressed button
    const action = key.dataset.action;

    //Content of pressed button
    const keyContent = key.textContent;
    //Content of display
    let displayedNum = display.textContent;

    //get previous key
    const previousKeyType = calculator.dataset.previousKeyType;

    //get clear button
    const clearButton = calculator.querySelector("[data-action=clear]");

    if (!action) {
      // If no operator clicked before, replaces or appends number to display depending on displayedNum
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
      //Remove styling classes from all operator buttons with a for loop
      for (var i = 0; i < operatorKeys.length; i++) {
        operatorKeys[i].classList.remove("highlight");
      }
      clearButton.textContent = "CE";
    }
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      //If more than two numbers are calculated i.e. operator key is pressed a second time
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      //Highlight Button
      key.classList.add("highlight");

      //Store values
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
      clearButton.textContent = "CE";
    }

    if (action === "decimal") {
      //concatenate . to displayedNum only if no decimal in number yet
      if (previousKeyType == "operator" || previousKeyType === "calculate") {
        display.textContent = "0.";
      } else if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "decimal";
      clearButton.textContent = "CE";
    }

    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }
      calculator.dataset.previousKeyType = "clear";
      display.textContent = 0;
    }

    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      let secondValue = displayedNum;
      const operator = calculator.dataset.operator;
      if (firstValue) {
        if (previousKeyType == "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }

        display.textContent = calculate(firstValue, operator, secondValue);
      }

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
      clearButton.textContent = "CE";
      //Add function that retrieves data from custom attributes
      //Change display text to result of calculation by calling the calculator function
    }
  }
});
