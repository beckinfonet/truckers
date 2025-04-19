import { Schema, model, models } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";

const chatSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const Chat = models.Chat || model("Chat", chatSchema);

export default Chat;

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get loadId from the URL search params
    const searchParams = request.nextUrl.searchParams;
    const loadId = searchParams.get("loadId");

    if (!loadId) {
      return NextResponse.json(
        { error: "loadId is required" },
        { status: 400 }
      );
    }

    // Find chat by loadId
    const chat = await Chat.findOne({ loadId })
      .sort({ lastUpdated: -1 }) // In case there are multiple chats, get the most recent
      .select({
        loadId: 1,
        participants: 1,
        messages: {
          $slice: -50, // Get only the last 50 messages for initial load
        },
        lastUpdated: 1,
        status: 1,
        metadata: 1,
      });

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json(chat);
  } catch (error: any) {
    console.error("Error fetching chat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new chat for a load
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { loadId, participants } = body;

    if (!loadId || !participants || !Array.isArray(participants)) {
      return NextResponse.json(
        { error: "loadId and participants array are required" },
        { status: 400 }
      );
    }

    // Check if chat already exists for this load
    const existingChat = await Chat.findOne({ loadId });
    if (existingChat) {
      return NextResponse.json(
        { error: "Chat already exists for this load" },
        { status: 409 }
      );
    }

    // Create new chat
    const newChat = await Chat.create({
      loadId,
      participants,
      status: "ACTIVE",
      metadata: {
        subject: `Load Discussion - ${loadId}`,
        priority: "MEDIUM",
      },
    });

    return NextResponse.json(newChat, { status: 201 });
  } catch (error: any) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
