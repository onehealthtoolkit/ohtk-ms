/** @jest-environment jsdom */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { FormIntegerField } from "components/formRenderer/integerField";
import IntegerField from "lib/opsvForm/models/fields/integerField";

describe("integer input", () => {
  it("keeps entered zero visible, valid and serialized for a required count", () => {
    const field = new IntegerField("count", "count", {
      required: true,
      min: 0,
    });
    render(<FormIntegerField field={field} />);
    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "0" } });

    expect(input).toHaveValue(0);
    expect(field.value).toBe(0);
    expect(field.validate()).toBe(true);
    const payload: Record<string, unknown> = {};
    field.toJsonValue(payload);
    expect(payload).toEqual({ count: 0, count__value: "0" });
  });

  it("clears a previous zero and shows the configured required error", () => {
    const field = new IntegerField("count", "count", {
      required: true,
      requiredMessage: "Count required",
    });
    field.value = 0;
    render(<FormIntegerField field={field} />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(0);

    fireEvent.change(input, { target: { value: "" } });
    expect(input).toHaveValue(null);
    expect(field.value).toBeUndefined();
    act(() => {
      expect(field.validate()).toBe(false);
    });
    expect(screen.getByText("Count required")).toBeInTheDocument();
  });
});
