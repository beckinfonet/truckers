import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ChatModel from "@/lib/modals/chats";
import mongoose from "mongoose";

// GET - Fetch verifications with filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;

    // Build query filters
    const filters: any = {};

    // Load filter
    const loadId = searchParams.get("loadId");
    if (loadId) {
      filters.loadId = new mongoose.Types.ObjectId(loadId);
    }

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const chats = await ChatModel.find(filters)
      .sort({ lastUpdated: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await ChatModel.countDocuments(filters);

    return NextResponse.json({
      chats,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}

// POST - Create new chat
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    // Check if chat already exists for this load
    const existingChat = await ChatModel.findOne({ loadId: body.loadId });
    if (existingChat) {
      return NextResponse.json(
        { error: "Chat already exists for this load" },
        { status: 409 }
      );
    }

    // Create new chat
    const chat = await ChatModel.create({
      ...body,
      status: "ACTIVE",
      lastUpdated: new Date(),
    });

    return NextResponse.json(chat, { status: 201 });
  } catch (error: any) {
    console.error("Error creating chat:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Invalid chat data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    );
  }
}

// PUT - Update chat (add message or update status)
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Chat ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Find chat
    const chat = await ChatModel.findById(id);

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    // If adding a message
    if (body.message) {
      chat.messages.push({
        ...body.message,
        timestamp: new Date(),
      });
      chat.lastUpdated = new Date();
    }

    // Update chat
    const updatedChat = await ChatModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...body,
          lastUpdated: new Date(),
        },
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedChat);
  } catch (error: any) {
    console.error("Error updating chat:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Invalid chat data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update chat" },
      { status: 500 }
    );
  }
}

// DELETE - Remove chat
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Chat ID is required" },
        { status: 400 }
      );
    }

    const chat = await ChatModel.findByIdAndDelete(id);

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Chat deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting chat:", error);
    return NextResponse.json(
      { error: "Failed to delete chat" },
      { status: 500 }
    );
  }
}
