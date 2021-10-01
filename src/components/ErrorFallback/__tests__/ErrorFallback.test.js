import { render, fireEvent, screen } from "@testing-library/react";

import ErrorFallback from "../";

const MOCK_ERROR = {
  message: "Mock Error",
};

const mockReset = jest.fn();

describe("ErrorFallback", () => {
  beforeAll(() => {
    console.log("Testing ErrorFallback Component...");
  });

  it("should display the error message", () => {
    render(<ErrorFallback error={MOCK_ERROR} resetErrorBoundary={mockReset} />);
    let messageElement = screen.getByText("Mock Error");
    expect(messageElement).toBeInTheDocument();
  });

  it("should execute the resetErrorBoundary function", () => {
    render(<ErrorFallback error={MOCK_ERROR} resetErrorBoundary={mockReset} />);
    let buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(mockReset.mock.calls.length).toBe(1);
  });

  afterAll(() => {
    console.log("Tests for ErrorFallback Component finished...");
  });
});
