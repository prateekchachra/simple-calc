import { render, screen, fireEvent } from "@testing-library/react";

import CalculatorGrid from "../";

describe("CalculatorGrid", () => {
  describe("Keyboard Input", () => {
    beforeAll(() => {
      console.log("Testing CalculatorGrid with Keyboard Input");
    });

    it("should be able to perform basic operations", () => {
      render(<CalculatorGrid />);

      // Addition with the = key
      let calculatorElement = screen.getByTestId("calculator-container");
      let inputElement = screen.getByTestId("calculator-input");

      fireEvent.keyPress(calculatorElement, { key: "8" });
      fireEvent.keyPress(calculatorElement, { key: "+" });
      fireEvent.keyPress(calculatorElement, { key: "2" });
      fireEvent.keyPress(calculatorElement, { key: "=" });

      expect(inputElement).toHaveAttribute("value", "10");

      // Multiplication with the enter key

      fireEvent.keyPress(calculatorElement, { key: "8" });
      fireEvent.keyPress(calculatorElement, { key: "*" });
      fireEvent.keyPress(calculatorElement, { key: "2" });
      fireEvent.keyPress(calculatorElement, { key: "Enter" });

      expect(inputElement).toHaveAttribute("value", "16");
    });

    it("should sanitize the inputs correctly", () => {
      render(<CalculatorGrid />);
      let calculatorElement = screen.getByTestId("calculator-container");
      let inputElement = screen.getByTestId("calculator-input");

      fireEvent.keyPress(calculatorElement, { key: "8" });
      fireEvent.keyPress(calculatorElement, { key: "a" });
      fireEvent.keyPress(calculatorElement, { key: "b" });
      fireEvent.keyPress(calculatorElement, { key: "c" });
      fireEvent.keyPress(calculatorElement, { key: "&" });

      expect(inputElement).toHaveAttribute("value", "8");
    });

    it("should be able to perform special operations", () => {
      render(<CalculatorGrid />);
      let calculatorElement = screen.getByTestId("calculator-container");
      let inputElement = screen.getByTestId("calculator-input");

      fireEvent.keyPress(calculatorElement, { key: "5" });
      fireEvent.keyPress(calculatorElement, { key: "%" });

      expect(inputElement).toHaveAttribute("value", "0.05");
    });

    it("should throw an error on division to 0", () => {
      let errorMsg = "";
      try {
        render(<CalculatorGrid />);
        let calculatorElement = screen.getByTestId("calculator-container");

        fireEvent.keyPress(calculatorElement, { key: "1" });
        fireEvent.keyPress(calculatorElement, { key: "/" });
        fireEvent.keyPress(calculatorElement, { key: "0" });
        fireEvent.keyPress(calculatorElement, { key: "=" });
      } catch (err) {
        errorMsg = err.message;
      }
      expect(errorMsg).toBe("Invalid division");
    });

    afterAll(() => {
      console.log("Testing CalculatorGrid with Keyboard Input");
    });
  });
  describe("GridButton Click Input", () => {
    beforeAll(() => {
      console.log("Testing CalculatorGrid with GridButton Click Input");
    });

    it("should be able to perform basic operations", () => {
      render(<CalculatorGrid />);
      // Subtraction
      let inputElement = screen.getByTestId("calculator-input");

      fireEvent.click(screen.getByRole("button", { name: "8" }));
      fireEvent.click(screen.getByRole("button", { name: "-" }));
      fireEvent.click(screen.getByRole("button", { name: "2" }));
      fireEvent.click(screen.getByRole("button", { name: "=" }));

      expect(inputElement).toHaveAttribute("value", "6");
    });

    it("should be able to perform special operations", () => {
      render(<CalculatorGrid />);
      let inputElement = screen.getByTestId("calculator-input");

      fireEvent.click(screen.getByRole("button", { name: "5" }));
      fireEvent.click(screen.getByRole("button", { name: "+/-" }));

      expect(inputElement).toHaveAttribute("value", "-5");
    });

    it("should throw an error on division to 0", () => {
      let errorMsg = "";
      try {
        render(<CalculatorGrid />);
        let calculatorElement = screen.getByTestId("calculator-container");

        fireEvent.keyPress(calculatorElement, { key: "1" });
        fireEvent.click(screen.getByRole("button", { name: "1" }));
        fireEvent.click(screen.getByRole("button", { name: "/" }));
        fireEvent.click(screen.getByRole("button", { name: "0" }));
        fireEvent.click(screen.getByRole("button", { name: "=" }));
      } catch (err) {
        errorMsg = err.message;
      }
      expect(errorMsg).toBe("Invalid division");
    });

    afterAll(() => {
      console.log("Testing CalculatorGrid with GridButton Click Input");
    });
  });
  describe("Direct Input", () => {
    beforeAll(() => {
      console.log("Testing CalculatorGrid with Direct Input");
    });

    it("should be able to perform basic operations", () => {
      render(<CalculatorGrid />);
      // Division
      let inputElement = screen.getByTestId("calculator-input");

      fireEvent.change(inputElement, { target: { value: "8" } });
      fireEvent.change(inputElement, { target: { value: "/" } });
      fireEvent.change(inputElement, { target: { value: "2" } });
      fireEvent.change(inputElement, { target: { value: "=" } });
      expect(inputElement).toHaveAttribute("value", "4.00");
    });

    it("should sanitize the inputs correctly", () => {
      render(<CalculatorGrid />);
      let inputElement = screen.getByTestId("calculator-input");

      fireEvent.change(inputElement, { target: { value: "8" } });
      fireEvent.change(inputElement, { target: { value: "a" } });
      fireEvent.change(inputElement, { target: { value: "$" } });
      fireEvent.change(inputElement, { target: { value: "g" } });
      fireEvent.change(inputElement, { target: { value: "x" } });

      expect(inputElement).toHaveAttribute("value", "8");
    });

    it("should be able to perform special operations", () => {
      render(<CalculatorGrid />);
      let inputElement = screen.getByTestId("calculator-input");

      fireEvent.change(inputElement, { target: { value: "6" } });
      fireEvent.change(inputElement, { target: { value: "%" } });

      expect(inputElement).toHaveAttribute("value", "0.06");
    });

    it("should throw an error on division to 0", () => {
      let errorMsg = "";
      try {
        render(<CalculatorGrid />);
        let inputElement = screen.getByTestId("calculator-input");

        fireEvent.change(inputElement, { target: { value: "5" } });
        fireEvent.change(inputElement, { target: { value: "/" } });
        fireEvent.change(inputElement, { target: { value: "0" } });
        fireEvent.change(inputElement, { target: { value: "=" } });
      } catch (err) {
        errorMsg = err.message;
      }
      expect(errorMsg).toBe("Invalid division");
    });

    afterAll(() => {
      console.log("Testing CalculatorGrid with Direct Input");
    });
  });
});
