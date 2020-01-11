import React, { useState } from 'react';
import './Calculator.css';
import processInput from '../utils/keyDownLogic';

function App() {
  const [formula, setFormula] = useState({ state: '0', complete: false });
  const [output, setOutput] = useState('0');

  const handleInput = e => {
    // Do not focus on an element if the event is a click
    if (e.target.value) e.preventDefault();
    const key = e.key || e.target.value;
    // Function processInput handles the logic and returns a new state
    const fRes = processInput(key, formula);
    setFormula(fRes);

    let oRes;
    // If the last operation was an evaluation, set the result as output.
    if (fRes.state.includes('='))
      oRes = fRes.state.split('=')[1];
    else {
      oRes = fRes.state.split(/[+\-*/%]/);
      // If the last input was an operator, set it as output.
      if (oRes[oRes.length - 1] === '') oRes = fRes.state[fRes.state.length - 1];
      // Else output is set as the last operand of the formula.
      else oRes = oRes[oRes.length - 1];
    }
    setOutput(oRes);
  }

  return (
    <div tabIndex="0" onKeyDown={handleInput} className="calc-wrapper">
      <div className="calc">
        <div className="formula">{formula.state}</div>
        <div className="input" id="display">{output}</div>
        <div className="btn-grid">
          <button onClick={handleInput} id="clear" value="AC">AC</button>
          <button onClick={handleInput} id="backspace" value="Backspace">Back</button>
          <button onClick={handleInput} id="divide" value="/">/</button>
          <button onClick={handleInput} id="multiply" value="*">x</button>
          <button onClick={handleInput} id="seven" value="7">7</button>
          <button onClick={handleInput} id="eight" value="8">8</button>
          <button onClick={handleInput} id="nine" value="9">9</button>
          <button onClick={handleInput} id="subtract" value="-">-</button>
          <button onClick={handleInput} id="four" value="4">4</button>
          <button onClick={handleInput} id="five" value="5">5</button>
          <button onClick={handleInput} id="six" value="6">6</button>
          <button onClick={handleInput} id="add" value="+">+</button>
          <button onClick={handleInput} id="one" value="1">1</button>
          <button onClick={handleInput} id="two" value="2">2</button>
          <button onClick={handleInput} id="three" value="3">3</button>
          <button onClick={handleInput} id="mod" value="%">%</button>
          <button onClick={handleInput} id="zero" value="0">0</button>
          <button onClick={handleInput} id="decimal" value=".">.</button>
          <button onClick={handleInput} id="equals" value="=">=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
