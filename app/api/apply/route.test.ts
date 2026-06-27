import { describe, it, expect, vi } from "vitest";
import { POST } from "./route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/apply", () => {
  it("returns 200 and ok:true for a valid application", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const response = await POST(
      makeRequest({
        name: "Jordan Lee",
        email: "jordan@example.com",
        platform: "Instagram",
        profileLink: "https://instagram.com/jordanlee",
        audienceSize: "120K followers",
      })
    );
    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json).toEqual({ ok: true });
    logSpy.mockRestore();
  });

  it("returns 400 with field errors for an incomplete application", async () => {
    const response = await POST(makeRequest({ name: "", email: "not-an-email" }));
    const json = await response.json();
    expect(response.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.errors.name).toBeDefined();
    expect(json.errors.platform).toBeDefined();
  });

  it("returns 400 for a body that isn't valid JSON", async () => {
    const badRequest = new Request("http://localhost/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not json",
    });
    const response = await POST(badRequest);
    expect(response.status).toBe(400);
  });
});
