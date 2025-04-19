import { Schema, model, models } from "mongoose";

const participantSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["SHIPPER", "BROKER", "CARRIER", "DRIVER", "FACTOR", "ADMIN"],
  },
  name: {
    type: String,
    required: true,
  },
  lastReadAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  senderRole: {
    type: String,
    required: true,
    enum: ["SHIPPER", "BROKER", "CARRIER", "DRIVER", "FACTOR", "ADMIN"],
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["SENT", "DELIVERED", "READ"],
    default: "SENT",
  },
  attachments: [
    {
      type: {
        type: String,
        enum: ["IMAGE", "DOCUMENT", "OTHER"],
      },
      url: String,
      name: String,
      size: Number,
    },
  ],
  isEdited: {
    type: Boolean,
    default: false,
  },
  editedAt: Date,
  reactions: [
    {
      emoji: String,
      userId: Schema.Types.ObjectId,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const chatSchema = new Schema(
  {
    loadId: {
      type: Schema.Types.ObjectId,
      ref: "Load",
      required: true,
    },
    participants: [participantSchema],
    messages: [messageSchema],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "ARCHIVED", "CLOSED"],
      default: "ACTIVE",
    },
    metadata: {
      subject: String,
      priority: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
        default: "MEDIUM",
      },
      tags: [String],
    },
    settings: {
      notifications: {
        type: Boolean,
        default: true,
      },
      autoArchive: {
        type: Boolean,
        default: false,
      },
      archiveAfterDays: {
        type: Number,
        default: 30,
      },
    },
  },
  {
    timestamps: true,
    collection: "chats",
  }
);

// Create indexes for common queries
chatSchema.index({ loadId: 1 });
chatSchema.index({ "participants._id": 1 });
chatSchema.index({ lastUpdated: -1 });
chatSchema.index({ status: 1 });

const Chat = models.Chat || model("Chat", chatSchema);

export default Chat;
