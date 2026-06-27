import { NextResponse } from "next/server";
import { validateApplication, type ApplicationInput } from "@/lib/validation";

export async function POST(request: Request) {
  let body: Partial<ApplicationInput> | null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  if (!body) {
    return NextResponse.json(
      { ok: false, errors: { name: "Invalid request body." } },
      { status: 400 }
    );
  }

  const { valid, errors } = validateApplication(body);
  if (!valid) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  console.log("[apply] new partner application:", body);
  return NextResponse.json({ ok: true });
}
