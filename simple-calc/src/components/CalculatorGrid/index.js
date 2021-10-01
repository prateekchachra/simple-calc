import React, { useState, useCallback, useMemo } from 'react';
import GridButton from '../GridButton';
import { CALCULATOR_ELEMENTS } from '../../constants/calculator';
import { checkIfValidDigit } from '../../utils/validation';


import './style.css';
/**
 * Calculator component with the Grid
 * @returns Calculator Grid component where the calculations are done and everything is rendered
 */

const DEFAULT_VALUE = {
    firstValue: '',
    nextValue: '',
    operator: '',
}
const CalculatorGrid = () => {

    // Using the calculator values

    const [values, setValues] = useState(DEFAULT_VALUE);

    // Using the calculated map for Key - calculation mapping  
    const keyDigitMapping = useMemo(() => {
        const mappingObj = {};

        CALCULATOR_ELEMENTS.forEach((item) => {
            mappingObj[item.value] = item.type;
        });
        return mappingObj;
    }, []);

    // Callback for resetting the value
    const resetValue = useCallback(() => setValues(DEFAULT_VALUE), []);
    
    // Callback for handling normal operators
    const calculateResult = useCallback(() => {

        // TODO : Error handling
        const {firstValue, operator, nextValue} = values;
        switch(operator){
            case '+': 
                return String((+firstValue + +nextValue).toFixed(2));
            case '-':
                return String((+firstValue - +nextValue).toFixed(2));
            case '*':
                return String((+firstValue * +nextValue).toFixed(2));
            case '/':
                return String((+firstValue / +nextValue).toFixed(2));
            default:
                return '';
        }
    }, [values]);

    // Callback for handling equal operator

    const handleEqual = useCallback(() => {
        if(values.firstValue === '' || values.nextValue === '') return;
        const result = calculateResult();
        
        setValues({firstValue: '', operator: '=', nextValue: result})
    }, [values, calculateResult])

    /**
     * Callback for handling the input.
     * 
     * Input can come from each of these three ways:
     * 
     * 1. Keyboard Input
     * 2. Clicking the buttons
     * 3. From the input box.
     * 
     * This is a common way of handling all three.
     */
    const handleInput = useCallback((digit) => {
        switch(digit.type){
            case 'DIGIT':
                if(!(digit.value === '.' && values.nextValue.indexOf('.') !== -1)){
                    setValues({...values, nextValue: values.nextValue + digit.value});
                }
                break;
            case 'EQUAL_OPERATOR':
                // Error handling
                handleEqual();
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
                if(values.operator && values.nextValue === ''){
                    setValues({
                        ...values,
                        operator: digit.value
                    })
                }
                else {
                    let newValue = values.firstValue !== '' ? calculateResult() : values.nextValue;
                    setValues({
                        firstValue: newValue,
                        operator: digit.value,
                        nextValue: ''
                    })
                }
                break;
            default: 
                return '';
        }
    }, [handleEqual, values, resetValue, calculateResult]);

    // Key press event handler
    const onKeyPress = useCallback((event) => {
        
        // Check if it is a valid digit key
        if(keyDigitMapping[event.key]){
            
            /**
             * Sending the input to the handleInput callback.
             * 
             * If this was typescript, we'd be using a 'DigitType' instead to send the digit
             * in a more proper manner
             */
            handleInput({value: event.key, type: keyDigitMapping[event.key]})
        }

        // Enter and delete key listeners
        
        else if(event.key === 'Enter') {
            handleEqual();
        }
        else return;
        
        
    }, [handleEqual, handleInput, keyDigitMapping]);
    
    // Input handle
    const onInputChange = useCallback((e) => {
        let val = e.target.value;
        let lastChar = val.charAt(val.length - 1);

        // Checking the last typed character

        /**
         * 
         * Again, a better way to do it would have been DigitType.
         * Due to time shortage, Typescript isn't being used.
         */
        if(checkIfValidDigit(lastChar) || lastChar === ''){
            handleInput({value: lastChar, type: keyDigitMapping[lastChar]})
        }

    }, [handleInput, keyDigitMapping]);
    
    // Click handle
    const onDigitClick = useCallback((digit) => handleInput(digit), [handleInput]);

    return  (
        <div className="calculator-grid" onKeyPress={onKeyPress}>
            <div className="calculator-input-container">
                <div className="calculated-value">{values.firstValue !== '' ? String(values.firstValue) + values.operator : ''}</div>
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