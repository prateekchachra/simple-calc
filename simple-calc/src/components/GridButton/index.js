import React, {useMemo} from 'react';

import './style.css'

const GridButton = ({ digit, onClickButton }) => {
    const calculatedClass = useMemo(() => {
        switch(digit.type){
            case 'DIGIT':
                return 'button-digit';
            case 'OPERATOR':
                return 'button-operator';
            case 'EQUAL_OPERATOR':
                return 'button-equal';
            case 'SPECIAL_OPERATOR':
                return 'button-special';
            default: 
                return '';
        }
    }, [digit]);

    return (
        <button className={`grid-button ${calculatedClass}`} onClick={() => onClickButton(digit)}>{digit.value}</button>
    );
}

export default React.memo(GridButton);