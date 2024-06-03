import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message:
      "Hello World From the Developer Arnab Paul! Congrates for the Success",
    status: 201,
  });
}

export async function POST(request: NextRequest) {}
