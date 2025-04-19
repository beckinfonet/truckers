import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Verification from "@/lib/modals/verifications";
import mongoose from "mongoose";

// GET - Fetch verifications with filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;

    // Build query filters
    const filters: any = {};

    // User filter
    const userId = searchParams.get("userId");
    if (userId) {
      filters.userId = new mongoose.Types.ObjectId(userId);
    }

    // Type filter
    const type = searchParams.get("type");
    if (type) {
      filters.type = type;
    }

    // Status filter
    const status = searchParams.get("status");
    if (status) {
      filters.status = status;
    }

    // Level filter
    const level = searchParams.get("level");
    if (level) {
      filters.level = parseInt(level);
    }

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const verifications = await Verification.find(filters)
      .sort({ attemptedAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Verification.countDocuments(filters);

    return NextResponse.json({
      verifications,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching verifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch verifications" },
      { status: 500 }
    );
  }
}

// POST - Create new verification
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    // Set expiration time (e.g., 1 hour from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Create verification with expiration
    const verification = await Verification.create({
      ...body,
      expiresAt,
      status: "pending",
    });

    return NextResponse.json(verification, { status: 201 });
  } catch (error: any) {
    console.error("Error creating verification:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Invalid verification data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create verification" },
      { status: 500 }
    );
  }
}

// PUT - Update verification status
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Verification ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Find verification and check if it can be updated
    const verification = await Verification.findById(id);

    if (!verification) {
      return NextResponse.json(
        { error: "Verification not found" },
        { status: 404 }
      );
    }

    if (verification.isExpired()) {
      return NextResponse.json(
        { error: "Verification has expired" },
        { status: 400 }
      );
    }

    // If updating status to failed, increment attempt count
    if (body.status === "failed") {
      verification.metadata.attemptCount =
        (verification.metadata.attemptCount || 0) + 1;

      // Check if max attempts reached
      if (!verification.canRetry()) {
        body.status = "blocked";
      }
    }

    // Update verification
    const updatedVerification = await Verification.findByIdAndUpdate(
      id,
      {
        $set: {
          ...body,
          "metadata.attemptCount": verification.metadata.attemptCount,
        },
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedVerification);
  } catch (error: any) {
    console.error("Error updating verification:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Invalid verification data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update verification" },
      { status: 500 }
    );
  }
}

// DELETE - Remove verification
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Verification ID is required" },
        { status: 400 }
      );
    }

    const verification = await Verification.findByIdAndDelete(id);

    if (!verification) {
      return NextResponse.json(
        { error: "Verification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Verification deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting verification:", error);
    return NextResponse.json(
      { error: "Failed to delete verification" },
      { status: 500 }
    );
  }
}
