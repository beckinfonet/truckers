import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

/**
 * Enum for verification types with descriptions
 */
const VerificationTypes = [
  "email", // Verified via Amplify
  "phone", // 2FA or separate verification
  "device", // Device registration & anti-spoofing
  "gps", // Location verification
  "face", // Selfie match with ID
  "liveness", // Anti-spoofing challenge
  "voice", // Voice print for L3 security
  "2fa", // TOTP/Push notifications
  "kyc_document", // Document OCR/validation
] as const;

type VerificationType = (typeof VerificationTypes)[number];

/**
 * Enum for verification status
 */
const VerificationStatuses = [
  "passed", // Verification successful
  "failed", // Verification failed
  "pending", // Awaiting verification
  "expired", // Verification timeout
  "blocked", // Blocked due to suspicious activity
] as const;

type VerificationStatus = (typeof VerificationStatuses)[number];

/**
 * Schema for a verification event
 */
const VerificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    level: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: VerificationTypes,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: VerificationStatuses,
      required: true,
      index: true,
    },
    attemptedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    metadata: {
      // Biometric data
      selfieUrl: {
        type: String,
        validate: {
          validator: (v: string) => v.startsWith("https://"),
          message: "Selfie URL must be HTTPS",
        },
      },
      voicePrintUrl: {
        type: String,
        validate: {
          validator: (v: string) => v.startsWith("https://"),
          message: "Voice print URL must be HTTPS",
        },
      },
      documentUrl: {
        type: String,
        validate: {
          validator: (v: string) => v.startsWith("https://"),
          message: "Document URL must be HTTPS",
        },
      },
      confidenceScore: {
        type: Number,
        min: 0,
        max: 1,
      },

      // Location data
      gpsLocation: {
        lat: {
          type: Number,
          min: -90,
          max: 90,
        },
        lng: {
          type: Number,
          min: -180,
          max: 180,
        },
        accuracy: {
          type: Number,
          min: 0,
        },
        timestamp: Date,
      },

      // Device security
      deviceId: {
        type: String,
        trim: true,
      },
      deviceName: String,
      deviceModel: String,
      osVersion: String,

      // Network security
      ip: {
        type: String,
        trim: true,
      },
      userAgent: String,
      browserFingerprint: String,

      // Additional security
      failureReason: String,
      attemptCount: {
        type: Number,
        default: 1,
        min: 1,
      },
      challengeType: {
        type: String,
        enum: ["SMILE", "BLINK", "TURN_HEAD", "SPEAK_PHRASE"],
      },
      challengeResponse: String,
    },
  },
  {
    timestamps: true,
    collection: "verifications",
  }
);

// Compound indexes for common queries
VerificationSchema.index({ userId: 1, type: 1, status: 1 });
VerificationSchema.index({ userId: 1, level: 1 });
VerificationSchema.index({ attemptedAt: 1, status: 1 });

// TTL index for automatic expiration
VerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Methods
VerificationSchema.methods.isExpired = function () {
  return this.expiresAt < new Date();
};

VerificationSchema.methods.canRetry = function () {
  return this.metadata.attemptCount < 3 && !this.isExpired();
};

const Verification =
  models.Verification || model("Verification", VerificationSchema);

export type IVerification = mongoose.Document & {
  userId: mongoose.Types.ObjectId;
  level: 1 | 2 | 3;
  type: VerificationType;
  status: VerificationStatus;
  attemptedAt: Date;
  expiresAt: Date;
  metadata: {
    selfieUrl?: string;
    voicePrintUrl?: string;
    documentUrl?: string;
    confidenceScore?: number;
    gpsLocation?: {
      lat: number;
      lng: number;
      accuracy: number;
      timestamp: Date;
    };
    deviceId?: string;
    deviceName?: string;
    deviceModel?: string;
    osVersion?: string;
    ip?: string;
    userAgent?: string;
    browserFingerprint?: string;
    failureReason?: string;
    attemptCount: number;
    challengeType?: "SMILE" | "BLINK" | "TURN_HEAD" | "SPEAK_PHRASE";
    challengeResponse?: string;
  };
  isExpired(): boolean;
  canRetry(): boolean;
};

export default Verification;
