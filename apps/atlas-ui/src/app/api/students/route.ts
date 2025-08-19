// src/app/api/students/route.ts
import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL ?? "http://localhost:9090";

// SSR キャッシュ回避
export const dynamic = "force-dynamic";

export async function GET() {
  const r = await fetch(`${BACKEND}/api/students`, { cache: "no-store" });
  const data = await r.json();
  return NextResponse.json(data, { status: r.status });
}

export async function POST(req: Request) {
  const body = await req.json();
  const r = await fetch(`${BACKEND}/api/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await r.json();
  return NextResponse.json(data, { status: r.status });
}
