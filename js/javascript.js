//Variables to create event delegation pattern
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".display");
const operatorKeys = document.querySelectorAll(".key-operator");

// Function that calculates value based on first value, second value and operator
const calculate = (v1, operator, v2) => {
  let result = "";
  if (operator == "add") {
    result = parseFloat(v1) + parseFloat(v2);
  } else if (operator == "subtract") {
    result = parseFloat(v1) - parseFloat(v2);
  } else if (operator == "multiply") {
    result = parseFloat(v1) * parseFloat(v2);
  } else if (operator == "divide") {
    result = parseFloat(v1) / parseFloat(v2);
  }
  return result;
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
    let displayedNum = parseFloat(display.textContent);

    //data operator variable
    let operator = calculator.getAttribute("data-operator");

    if (!action) {
      // If no operator clicked before, replaces or appends number to display depending on displayedNum
      if (operator == "" && displayedNum == 0) {
        display.innerHTML = keyContent;
        displayedNum = keyContent;
      } else if (operator == "" && displayedNum != 0) {
        display.innerHTML = display.innerHTML + keyContent;
      }
      // If operator was clicked before, replace current displayedNum with new number
      else if (operator !== "") {
        display.innerHTML = keyContent;
        calculator.setAttribute("data-operator", "");
        //Remove styling classes from all operator buttons with a for loop
        for (var i = 0; i < operatorKeys.length; i++) {
          operatorKeys[i].classList.remove("highlight");
        }
      }
    }
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      //Add function that adds a styling class to that button to highlight it
      //Add a custom attribute to calculator indicating the operator
      //Add currently displayed number to a custom attribute or an array?
      //Add operator to a custom attribute
      key.classList.add("highlight");
      calculator.setAttribute("data-operator", action);
      calculator.setAttribute("data-firstValue", displayedNum);
      calculator.setAttribute("data-finalOperator", action);

      if (calculator.getAttribute("data-secondValue")) {
        var firstValue = calculator.getAttribute("data-firstValue");
        var secondValue = calculator.getAttribute("data-secondValue");
        var operatorCalc = calculator.getAttribute("data-finalOperator");
        var total = calculate(firstValue, operatorCalc, secondValue);
        display.innerHTML = total;
        calculator.setAttribute("data-firstValue", total);
      }
    }
    if (action === "decimal") {
      //concatenate . to displayedNum
      display.innerHTML = display.innerHTML + keyContent;
    }
    if (action === "clear") {
      display.innerHTML = "0";
      console.log("clear key!");
    }
    if (action === "calculate") {
      console.log("equal key!");
      calculator.setAttribute("data-secondValue", displayedNum);
      var firstValue = calculator.getAttribute("data-firstValue");
      var secondValue = calculator.getAttribute("data-secondValue");
      var operatorCalc = calculator.getAttribute("data-finalOperator");
      var total = calculate(firstValue, operatorCalc, secondValue);
      display.innerHTML = total;
      console.log(total);
      //Add function that retrieves data from custom attributes
      //Change display text to result of calculation by calling the calculator function
    }
  }
});
