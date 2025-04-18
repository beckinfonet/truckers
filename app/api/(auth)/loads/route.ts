import connectDB from "@/lib/db";
import Load from "@/lib/modals/loads";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();
  const loads = await Load.find();
  return NextResponse.json(loads);
}
