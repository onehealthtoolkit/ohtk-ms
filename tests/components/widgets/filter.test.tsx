/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { ResetButton } from "components/widgets/filter";

describe("ResetButton", () => {
  it("renders children and forwards button clicks", () => {
    const onClick = jest.fn();

    render(<ResetButton onClick={onClick}>Reset filters</ResetButton>);

    const button = screen.getByRole("button", { name: /reset filters/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
