import { describe, it, expect } from "vitest";
import { validateApplication } from "./validation";

const VALID = {
  name: "Jordan Lee",
  email: "jordan@example.com",
  platform: "Instagram",
  profileLink: "https://instagram.com/jordanlee",
  audienceSize: "120K followers",
};

describe("validateApplication", () => {
  it("passes for a fully valid application", () => {
    const result = validateApplication(VALID);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("flags a missing name", () => {
    const result = validateApplication({ ...VALID, name: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe("Name is required.");
  });

  it("flags an invalid email", () => {
    const result = validateApplication({ ...VALID, email: "not-an-email" });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe("Enter a valid email address.");
  });

  it("flags missing platform, profile link, and audience size together", () => {
    const result = validateApplication({ name: "Jordan Lee", email: "jordan@example.com" });
    expect(result.valid).toBe(false);
    expect(result.errors.platform).toBe("Platform is required.");
    expect(result.errors.profileLink).toBe("Profile link is required.");
    expect(result.errors.audienceSize).toBe("Audience size is required.");
  });

  it("treats the optional note as valid whether present or absent", () => {
    expect(validateApplication(VALID).errors.note).toBeUndefined();
    expect(validateApplication({ ...VALID, note: "Big sleep-content audience" }).errors.note).toBeUndefined();
  });
});
