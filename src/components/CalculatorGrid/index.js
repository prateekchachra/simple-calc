import React, { useState, useCallback, useMemo, useRef } from 'react';
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
    const valueInput = useRef(null);

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
        let result = 0;
        switch(operator){
            case '+': 
                result = +firstValue + +nextValue;
                break;
            case '-':
                result = +firstValue - +nextValue;
                break;
            case '*':
                result = +firstValue * +nextValue;
                break;
            case '/':
                result = +firstValue / +nextValue;
                break;
            default:
                return result;
        }


        /**
         * 
         * Error Handling
         * 
         * Errors here can be because of one of three reasons:
         * 
         * 1. Number is infinity
         * 2. Number is NaN
         * 3. Number is greater than the allowed JS value
         */
        // Check for Infinity
        if(result === Infinity){
            throw new Error('Invalid division');
        } 
        else if(result >= Number.MAX_SAFE_INTEGER){
            throw new Error('JS Safe Integer limit exceeded')
        }
        // Check for NaN
        else if(isNaN(result)){
            throw new Error('Not a numeric value. Error in input detected')
        }
        else return String(result.toFixed(2));
    }, [values]);

    // Callback for handling equal operator

    const handleEqual = useCallback(() => {
        // Handling empty values
        if(values.firstValue === '' || values.nextValue === '') return;
        
        // Handling the Standalone Decimal '.' error
        if(values.nextValue === '.') return;
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
                // Handles all the special characters
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
                // Handling the Decimal '.' string case
                else if(values.nextValue === '.') return;
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

        // Check if it is a valid digit key and that the input isn't focused to avoid duplicate values

        if(keyDigitMapping[event.key] && document.activeElement !== valueInput.current){
            
            /**
             * Sending the input to the handleInput callback.
             * 
             * If this was typescript, we'd be using a 'DigitType' instead to send the digit
             * in a more proper manner
             */
            handleInput({value: event.key, type: keyDigitMapping[event.key]})
        }

        // Enter key listener
        // We prevent the default behavior if the element is focused
        else if(event.key === 'Enter') {
            event.preventDefault();
            handleEqual();
        }
        else return;
        
        
    }, [handleEqual, handleInput, keyDigitMapping]);
    
    // We need to use the onKeyDown function for detecting the delete input
    const onDeleteKeyPress = useCallback((event) => {
        if(event.key === 'Delete') resetValue();
    }, [resetValue])

    // Input handle
    const onInputChange = useCallback((event) => {
        let val = event.target.value;

        // Checking the last typed character
        let lastChar = val.charAt(val.length - 1);
        /**
         * 
         * Again, a better way to do it would have been DigitType.
         * Due to time shortage, Typescript isn't being used.
         */
        if(checkIfValidDigit(lastChar) || lastChar === ''){
            
            // Handling backspace
            val.length < values.nextValue.length ?
            setValues({...values, nextValue: val}) :  handleInput({value: lastChar, type: keyDigitMapping[lastChar]})
        }        
    }, [values, handleInput, keyDigitMapping]);
    
    // Handle click events
    const onDigitClick = useCallback((digit) => handleInput(digit), [handleInput]);

    return  (
        <div className="calculator-grid" data-testid="calculator-container" onKeyPress={onKeyPress} onKeyDown={onDeleteKeyPress}>
            <div className="calculator-input-container">
                <div className="calculated-value">{values.firstValue !== '' ? String(values.firstValue) + values.operator : ''}</div>
                <input autoFocus ref={valueInput} data-testid="calculator-input" className="calculator-input" onChange={onInputChange} value={values.nextValue}/>   
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