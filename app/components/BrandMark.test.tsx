import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrandMark } from "./BrandMark";

describe("BrandMark", () => {
  it("renders an accessible svg with the default light stroke color", () => {
    const { getByRole } = render(<BrandMark />);
    const svg = getByRole("img", { name: "Calm Blueprint mark" });
    expect(svg.tagName.toLowerCase()).toBe("svg");
    expect(svg.querySelector("circle")).toHaveAttribute("stroke", "#122337");
  });

  it("switches to the bone stroke color in the dark variant", () => {
    const { getByRole } = render(<BrandMark variant="dark" />);
    const svg = getByRole("img", { name: "Calm Blueprint mark" });
    expect(svg.querySelector("circle")).toHaveAttribute("stroke", "#F2EBDB");
  });

  it("applies the requested pixel size", () => {
    const { getByRole } = render(<BrandMark size={64} />);
    const svg = getByRole("img", { name: "Calm Blueprint mark" });
    expect(svg).toHaveAttribute("width", "64");
    expect(svg).toHaveAttribute("height", "64");
  });
});
