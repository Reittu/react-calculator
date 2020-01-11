/* eslint-disable no-eval */
const operatorRegex = /[+\-*/%]/;
export default function processInput(key, formula) {
    if (formula.complete)
        formula = { state: formula.state.split('=')[1], complete: true };
    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            // Resets the state as the key or appends to the end state.
            if (formula.state === '0' || formula.complete) return { state: key };
            return { state: formula.state + key };
        case '+':
        case '*':
        case '/':
        case '%':
            // Number at the end
            if (/\d/.test(formula.state[formula.state.length - 1]))
                return { state: formula.state + key };
            // Special case: e.g. 2*-3 -> replace both operators with a new one
            else if(/[+*/%]-/.test(formula.state.slice(-2)))
                return { state: formula.state.slice(0, -2) + key };
            // Replace the last operator with a new one
            return { state: formula.state.slice(0, -1) + key };
        case '-':
            if(/[\d+*/%]/.test(formula.state[formula.state.length - 1]))
                return { state: formula.state + key };
            return { state: formula.state };
        case ',':
        case '.':
            if (formula.complete) return { state: '0.' };
            const operands = formula.state.split(operatorRegex);
            // If the last operand already contains a period, do nothing.
            if (operands[operands.length - 1].includes('.'))
                return { state: formula.state };
            return { state: formula.state + '.' };
        case '=':
        case 'Enter':
            return { state: formula.state + '=' + calculateResult(formula.state), complete: true };
        case 'Backspace':
            if (formula.state.length === 1)
                return { state: '0' };
            return { state: formula.state.slice(0, -1) };
        case 'AC':
        case 'Escape':
            return { state: '0' };
        default:
            return { state: formula.state };
    }

    function calculateResult(val) {
        let result;
        // If the last character is an operator, evaluate without the operator.
        if (operatorRegex.test(val[val.length - 1]))
            result = eval(val.slice(0, -1));
        else result = eval(val);
        // If input is e.g. 0/0 (NaN) or 1/0 (Infinite), return 0.
        return Number.isFinite(result) ? String(result) : '0';
    }
}
