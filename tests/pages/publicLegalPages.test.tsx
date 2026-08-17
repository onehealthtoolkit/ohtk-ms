/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import AccountDeletionPage from "pages/account-deletion";
import PrivacyPolicyPage from "pages/privacy-policy";

describe("public legal pages", () => {
  it("renders the privacy policy without a login form", () => {
    render(<PrivacyPolicyPage />);

    expect(
      screen.getByRole("heading", { name: "Privacy Policy" })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Password")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "support@onehealth.com" })
    ).toHaveAttribute("href", "mailto:support@onehealth.com");
  });

  it("renders a public account-deletion request form", () => {
    render(<AccountDeletionPage />);

    expect(
      screen.getByRole("heading", { name: "Request account deletion" })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Password")).not.toBeInTheDocument();

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Contact email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send deletion request" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "support@onehealth.com" })
    ).toHaveAttribute(
      "href",
      "mailto:support@onehealth.com?subject=LAHIS%20account%20deletion%20request"
    );

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "tester" },
    });
    expect(screen.getByLabelText("Username")).toHaveValue("tester");
  });
});
