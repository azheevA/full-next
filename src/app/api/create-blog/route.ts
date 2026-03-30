import { NextResponse } from "next/server";

export async function POST() {
  console.log("server");
  return NextResponse.json({ success: true });
}
