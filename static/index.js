window.onload = function() {
    var buttons = document.getElementsByTagName('span'), // Select all buttons
      result = document.querySelectorAll('.result p')[0], // Select the result-field
      clear = document.getElementsByClassName('clear')[0], // Select the clearAll-button
      equation = [], // create the equation array
      operator = false; // helper variable, tracks if operator was last button pushed
  
    for (var i = 0; i < buttons.length; i += 1) { // Add onclick events to buttons
      if (buttons[i].innerHTML === '=') {
        buttons[i].addEventListener("click", calculate(i));
      } else if (buttons[i].innerHTML === '+/-') {
        buttons[i].addEventListener("click", invert(i));
      } else if (buttons[i].innerHTML === '%') {
        buttons[i].addEventListener("click", percent(i));
      } else if (buttons[i].innerHTML === 'AC') {
        equation = [];
      } else {
        buttons[i].addEventListener("click", addValue(i));
      }
    }
    /*
     * Clear the result screen and equation string and reset operator
     */
    clear.onclick = function() {
        result.innerHTML = '';
        equation = [];
        operator = false;
      }
      /*
       * Add a value, number or operator, to the equation string. If an operator than first removes all other clicked classes and adds it to the button just pressed. Than checks if an operator was just pressed, in which case it replaces it with the button pressed. If type is a Number, than value was just calculated so empty the array and start a new equation. Otherwise you would add numbers to the end of your calculated value.
       */
    function addValue(i) {
      return function() {
        if (buttons[i].innerHTML === '÷') {
          clicked(this);
          ifOperatorThanSwap('/');
        } else if (buttons[i].innerHTML === 'x') {
          clicked(this);
          ifOperatorThanSwap('*');
        } else if (buttons[i].innerHTML === '+') {
          clicked(this);
          ifOperatorThanSwap('+');
        } else if (buttons[i].innerHTML === '-') {
          clicked(this);
          ifOperatorThanSwap('-');
        } else {
          removeClicked();
          if (checkIfNum(equation[equation.length - 1])) {
            equation = [];
            equation.push(buttons[i].innerHTML);
            operator = true;
          } else {
            equation.push(buttons[i].innerHTML);
          }
          if (operator) {
            result.innerHTML = buttons[i].innerHTML;
          } else {
            result.innerHTML += buttons[i].innerHTML;
          }
          operator = false;
        }
      };
    }
    function clicked(i) {
      removeClicked(i);
      i.classList.add('clicked');
    }
  
    function removeClicked(i) {
      var elems = document.querySelectorAll(".clicked");
      [].forEach.call(elems, function(el) {
        el.classList.remove("clicked");
      });
    }
   
    function calculate(i) {
      return function() {
        if (equation.length == 0) {
          return;
        } else {
          var answer = eval(equation.join(''));
          if (answer % 1 === 0) { 
            result.innerHTML = answer;
          } else {
            result.innerHTML = answer.toFixed(4);
          }
          equation = [];
          equation.push(answer);
          operator = false;
        }
      };
    }
    function invert(i) {
      return function() {
        if (equation.length == 0) {
          return;
        } else {
          var number = result.innerHTML; // Grab number currently typed in
          popNumberOfDigits(number); // remove number of digits from equation array
          var invert = number * -1; // create inverted number by multiplying by -1
          equation.push(invert); // push to equation
          result.innerHTML = invert; // push to results display
        }
      }
    }
    function percent(i) {
      return function() {
        var number = result.innerHTML; // Grab number currently typed in
        popNumberOfDigits(number); // remove number of digits from equation array
        var percent = number * 0.01; // create percentage
        equation.push(percent); // push to equation
        result.innerHTML = percent.toFixed(2); // show in results display
      }
    }
    
    function ifOperatorThanSwap(str) {
      if (!operator) {
        equation.push(str);
        operator = true;
      } else {
        equation.pop();
        equation.push(str);
      }
    }
    function checkIfNum(v) {
      if (typeof v == 'string') {
        return false;
      } else if (typeof v == 'number') {
        return true;
      }
    }
    function popNumberOfDigits(number) {
      var arr = number.split(''); 
      for (i = 0; i < arr.length; i++) { 
        equation.pop();
      }
    }
  };