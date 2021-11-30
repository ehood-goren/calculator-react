import React, { useEffect, useState } from "react";
import CalcHead from './CalcHead';
import Numbers from './Numbers';
import Operations from './Operations';
import getOperatorFunc from './helpers/mathFunctions';

export default function Calculator() {
    const [firstNum, setFirstNum] = useState('');
    const [secondNum, setSecondNum] = useState('');
    const [operator, setOperator] = useState('');
    const [display, setDisplay] = useState('');
    const [result, setResult] = useState('0');

    // Updates calc display when one of the numbers or the operator changes.
    useEffect(() => {
        setDisplay(firstNum+operator+secondNum);
    },[firstNum, secondNum, operator])

    // Calc reset function for AC button.
    const resetCalc = () => {
        setFirstNum('');
        setSecondNum('');
        setOperator('');
        setResult('0');
        setDisplay('');
    }

    // Default function for operators. Selects it as opeartor and displays it if relevant.
    const selectOperator = (op) => {
        // Check if clicked when there are no numbers or when operator has already been selected.
        if(!firstNum || (secondNum !== '-' && secondNum)) return;
        // Checks if operator is clicked after an operator has already been selected.
        const arithmetics = ['+', '-', '/', '*'];
        const lastDisplayChar = display[display.length-1];
        if(arithmetics.find(arithmetic => arithmetic === lastDisplayChar)){
            if(op === '-') {
                if(arithmetics.find(arithmetic => arithmetic === display[display.length-2])) return
                setSecondNum('-');
                setDisplay(display.concat(op));
                setResult(op);
                return
            }
            else {
                if(arithmetics.find(arithmetic => arithmetic === display[display.length-2])){
                    setDisplay(display.slice(0, -2).concat(op));
                    setSecondNum('');
                }
                else {
                    setDisplay(display.slice(0, -1).concat(op));
                }
            }
        }
        setOperator(op);
        setResult(op);
    }

    const equals = () => {
        if(!secondNum || secondNum === '-') return;
        const operatorFunc = getOperatorFunc(operator);
        const calcResult = operatorFunc(Number(firstNum), Number(secondNum));
        setResult(calcResult);
    }

    const decimal = () => {
        console.log('decimal');
    }

    // Groups togethers functions for any clicked operator other than the basic 4.
    const specialOperatorsFuncs = {
        clear: resetCalc,
        equals,
        decimal
    }

    const displayNum = (num) => {
        if(operator){
            if(!secondNum && num === '0') return;
            setSecondNum(secondNum.concat(num));
            setResult(secondNum.concat(num));
        }
        else {
            if(!firstNum && num === '0') return;
            setFirstNum(firstNum.concat(num));
            setResult(firstNum.concat(num));
        }
    }

    // const updateNumbers = (num) => {
    //     const state = this.state;
    //     if(state.result){
    //         this.setState({
    //             display:'',
    //             result: ''
    //         })
    //     }
    //     if(!state.secondNum && !state.operator) {
    //         this.setState(prevState => ({
    //             firstNum: prevState.firstNum.concat(num),
    //             display: prevState.display.concat(num)
    //         }));
    //     }
    //     else if(state.firstNum && state.operator) {
    //         this.setState(prevState => ({
    //             secondNum: prevState.secondNum.concat(num),
    //             display: prevState.display.concat(num)
    //         }));
    //     }
    // }

    return (
        <div id="calculator">
            <CalcHead display={display} result={result} />
            <Numbers onClick={displayNum} />
            <Operations arithmeticFunc={selectOperator} specialsFuncs={specialOperatorsFuncs} />
        </div>
    )
}