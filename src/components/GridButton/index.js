import React, { useMemo } from "react";

import PropTypes from "prop-types";

import "./style.css";

/**
 *
 * @param {digit} Digit object for the Grid Button
 * @param {onClickButton} Event listener once the GridButton is Clicked
 * @returns The Grid Button element that forms the calculator
 */
const GridButton = ({ digit = {}, onClickButton = () => {} }) => {
  const calculatedClass = useMemo(() => {
    switch (digit.type) {
      case "DIGIT":
        return "button-digit";
      case "OPERATOR":
        return "button-operator";
      case "EQUAL_OPERATOR":
        return "button-equal";
      case "SPECIAL_OPERATOR":
        return "button-special";
      default:
        return "";
    }
  }, [digit]);

  return (
    <button
      className={`grid-button ${calculatedClass}`}
      onClick={() => onClickButton(digit)}
    >
      {digit.value}
    </button>
  );
};

GridButton.propTypes = {
  digit: PropTypes.object.isRequired,
  onClickButton: PropTypes.func.isRequired,
};

// Prevent rerenders

export default React.memo(GridButton);
