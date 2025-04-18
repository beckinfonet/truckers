import connectDB from "@/lib/db";
import User from "@/lib/modals/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}
