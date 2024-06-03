import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Bye from Next.js App! See you Soon",
    status: 200,
  });
}
