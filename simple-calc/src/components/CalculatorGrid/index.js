import React, { useState, useCallback, useMemo } from 'react';
import GridButton from '../GridButton';
import { CALCULATOR_ELEMENTS } from '../../constants/calculator';
import { checkIfValidDigit } from '../../utils/validation';


import './style.css';
/**
 * Calculator component with the Grid
 * @returns Calculator 
 */

const DEFAULT_VALUE = {
    firstValue: '',
    nextValue: '',
    operator: '',
}
const CalculatorGrid = () => {

    const [values, setValues] = useState(DEFAULT_VALUE);

    const resetValue = useCallback(() => setValues(DEFAULT_VALUE), []);
    
    const calculateResult = useCallback(() => {
        const {firstValue, operator, nextValue} = values;
        switch(operator){
            case '+': 
                return String(+firstValue + +nextValue);
            case '-':
                return String(+firstValue - +nextValue);
            case '*':
                return String(+firstValue * +nextValue);
            case '/':
                return String((+firstValue / +nextValue).toFixed(2));
            default:
                return '';
        }
    }, [values]);

    const onDigitClick = useCallback((digit) => {
        switch(digit.type){
            case 'DIGIT':
                setValues({...values, nextValue: values.nextValue + digit.value});
                break;
            case 'EQUAL_OPERATOR':
                // Error handling
                const result = calculateResult();
                setValues({firstValue: '', operator: '=', nextValue: result})
                break;
            case 'SPECIAL_OPERATOR':
                // TODO: better way
                const {value} = digit;
                if(value === 'C'){
                    resetValue();
                }
                else if(value === '+/-'){
                    setValues({...values, nextValue: String(-1 * Number(values.nextValue))})
                }
                else if(value === '%'){
                    setValues({...values, nextValue: String((Number(values.nextValue)/100).toFixed(2))});
                }
                break;
            case 'OPERATOR':
                //Handling special cases
                setValues({
                    firstValue: values.nextValue,
                    operator: digit.value,
                    nextValue: ''
                })
                break;
            default: 
                return '';
        }
    }, [values, resetValue, calculateResult]);

    const onKeyPress = useCallback((event) => {

    }, []);
    
    
    const onInputChange = useCallback((e) => {
        let val = e.target.value;
        if(checkIfValidDigit(val) || val === ''){
            setValues({...values, nextValue: val})
        }

    }, [values]);


    return  (
        <div className="calculator-grid" onKeyPress={onKeyPress}>
            <div className="calculator-input-container">
                {values.firstValue !== '' ? <span className="calculated-value">{values.firstValue} {values.operator}</span> : null}
                <input type="" className="calculator-input" onChange={onInputChange} value={values.nextValue}/>   
            </div>
            {CALCULATOR_ELEMENTS.map((item) => {
                return (<GridButton 
                    digit={item} 
                    key={item.value}
                    onClickButton={onDigitClick}/>);
            })}
        </div>
    )
}
export default React.memo(CalculatorGrid);