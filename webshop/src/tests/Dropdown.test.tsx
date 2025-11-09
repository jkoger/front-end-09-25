import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Dropdown from "../components/ui/Dropdown";

describe("Dropdown component", () => {
  it("renders the correct header", () => {
    render(
      <Dropdown
        handleSelect={() => {}}
        options={["1", "2", "3"]}
        header="Pealkiri"
        defaultValue=""
      />,
    );

    expect(screen.getByText("Pealkiri")).toBeInTheDocument();
  });
});

describe("Dropdown component", () => {
  it("renders the header from defaultValue", () => {
    render(
      <Dropdown
        handleSelect={() => {}}
        options={["1", "2", "3"]}
        header="Pealkiri"
        defaultValue="2"
      />,
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
