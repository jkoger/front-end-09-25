import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GiftCards from "../pages/GiftCards";
import userEvent from "@testing-library/user-event";

describe("GiftCards component", () => {
  it("renders the default value 20 eur", () => {
    render(<GiftCards />);

    expect(screen.getByText("Kinkekaart 20 eur")).toBeInTheDocument();
  });
});

describe("GiftCards component", () => {
  it("renders 50 eur if button is clicked", async () => {
    render(<GiftCards />);
    const button = screen.getByRole("button", { name: /50/i });
    await userEvent.click(button);
    expect(screen.getByText("Kinkekaart 50 eur")).toBeInTheDocument();
  });
});
