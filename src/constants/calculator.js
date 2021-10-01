const CALCULATOR_ELEMENTS = [
  { value: "C", type: "SPECIAL_OPERATOR" }, // Clear or reset
  { value: "+/-", type: "SPECIAL_OPERATOR" }, // Toggle absolute value to be negative/positive
  { value: "%", type: "SPECIAL_OPERATOR" }, // Calculate Percentage
  { value: "/", type: "OPERATOR" },

  { value: "7", type: "DIGIT" },
  { value: "8", type: "DIGIT" },
  { value: "9", type: "DIGIT" },
  { value: "*", type: "OPERATOR" },

  { value: "4", type: "DIGIT" },
  { value: "5", type: "DIGIT" },
  { value: "6", type: "DIGIT" },
  { value: "-", type: "OPERATOR" },

  { value: "1", type: "DIGIT" },
  { value: "2", type: "DIGIT" },
  { value: "3", type: "DIGIT" },
  { value: "+", type: "OPERATOR" },

  { value: "0", type: "DIGIT" },
  { value: "", type: "DIGIT" },
  { value: ".", type: "DIGIT" }, // Add a decimal
  { value: "=", type: "EQUAL_OPERATOR" },
];

export { CALCULATOR_ELEMENTS };
