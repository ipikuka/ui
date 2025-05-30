import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with children", () => {
    render(<Button label="Click Me"></Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });
});
