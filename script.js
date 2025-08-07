const display = document.querySelector(".display");
const lastop = document.querySelector(".lastop");
const buttons = document.querySelectorAll("button");

let currentInput = '0';
let waitingForNewNumber = false;
let previousInput = null;
let operator = null;
let expression = '';

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

function handleButtonClick(event) {
    const buttonText = event.target.textContent;
    const buttonClass = event.target.className;

    if(buttonClass.includes('clear')) {
        clearDisplay();
    } else if(buttonClass.includes('equals')) {
        calculateResult();
    } else if(buttonClass.includes('add') || buttonClass.includes('subtract') ||
              buttonClass.includes('multiply') || buttonClass.includes('divide')) {
        handleOperator(buttonText);
    }
    else if(!isNaN(buttonText)) {
        handleNumber(buttonText);
    }
}

function handleNumber(number) {
    if(waitingForNewNumber) {
        currentInput = number;
        waitingForNewNumber = false;
    }
    else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay(currentInput); 
}

function handleOperator(op) {
    if(operator && previousInput !== null && !waitingForNewNumber) {
        calculateResult();
        expression = currentInput + ' ' + op + ' ';
    } else {
        expression = currentInput + ' ' + op + ' ';
    }
    
    operator = op;
    previousInput = currentInput;
    waitingForNewNumber = true;
    updateLastop(expression);
}  

function calculateResult() {
    if(operator && previousInput !== null) {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        const fullExpression = expression + currentInput + ' = ';
        
        switch(operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if(current === 0) {
                    alert("Cannot divide by zero!");
                    return;
                }
                result = prev / current;
                break;
        }
        
        currentInput = result.toString();
        operator = null;
        previousInput = null;
        waitingForNewNumber = true;
        expression = ''; 
        
        updateDisplay(currentInput); 
        updateLastop(''); 
    }
}

function updateDisplay(value = currentInput) {
    display.textContent = value;
}

function updateLastop(value) {
    lastop.textContent = value;
}

function clearDisplay() {
    currentInput = '0';
    previousInput = null;
    operator = null;
    waitingForNewNumber = false;
    expression = '';
    updateDisplay(currentInput);
    updateLastop(''); 
}