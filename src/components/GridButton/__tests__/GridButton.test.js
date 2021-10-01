import { render, screen, fireEvent } from "@testing-library/react";

import GridButton from "../";

const MOCK_DIGIT_1 = {
  value: "8",
  type: "DIGIT",
};
const MOCK_DIGIT_2 = {
  value: "+",
  type: "OPERATOR",
};

const mockCallback = jest.fn();

describe("GridButton", () => {
  beforeAll(() => {
    console.log("Testing GridButton Component...");
  });

  it("should render the digit value correctly", () => {
    render(<GridButton digit={MOCK_DIGIT_1} onClickButton={mockCallback} />);
    const buttonElement = screen.getByText(MOCK_DIGIT_1.value);
    expect(buttonElement).toBeInTheDocument();
  });

  it("should render the digit class according to type", () => {
    render(
      <>
        <GridButton digit={MOCK_DIGIT_1} />
        <GridButton digit={MOCK_DIGIT_2} />
      </>
    );
    const buttonElement1 = screen.getByText(MOCK_DIGIT_1.value);
    const buttonElement2 = screen.getByText(MOCK_DIGIT_2.value);
    expect(buttonElement1.classList.contains("button-digit")).toBe(true);
    expect(buttonElement2.classList.contains("button-operator")).toBe(true);
  });

  it("should fire the click event on being clicked", () => {
    render(<GridButton digit={MOCK_DIGIT_1} onClickButton={mockCallback} />);
    const buttonElement = screen.getByText(MOCK_DIGIT_1.value);

    // We fire the click event twice
    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);

    expect(mockCallback.mock.calls.length).toBe(2);
  });

  afterAll(() => {
    console.log("Tests for GridButton Component finished...");
  });
});
