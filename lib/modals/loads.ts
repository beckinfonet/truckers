import { Schema, model, models } from "mongoose";

const documentSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["BOL", "POD", "INVOICE", "RATE_CONF", "INSURANCE", "OTHER"],
  },
  url: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
});

const referenceSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const loadSchema = new Schema(
  {
    loadNumber: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "PENDING",
        "ASSIGNED",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELLED",
        "ON_HOLD",
      ],
      default: "PENDING",
    },

    // Location Information
    origin: {
      type: String,
      required: true,
    },
    originAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    destination: {
      type: String,
      required: true,
    },
    destinationAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },

    // Dates
    pickupDate: {
      type: Date,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    actualPickupDate: Date,
    actualDeliveryDate: Date,

    // References to other entities
    shipper: {
      type: referenceSchema,
      required: true,
    },
    broker: {
      type: referenceSchema,
      required: true,
    },
    carrier: {
      type: referenceSchema,
    },
    driver: {
      type: referenceSchema,
    },
    factoringCompany: {
      type: referenceSchema,
    },

    // Load Details
    equipmentType: {
      type: String,
      required: true,
      enum: ["DRY_VAN", "REEFER", "FLATBED", "STEP_DECK", "OTHER"],
    },
    weight: {
      type: Number,
      required: true,
    },
    weightUnit: {
      type: String,
      enum: ["LBS", "KG"],
      default: "LBS",
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ["FT", "M"],
        default: "FT",
      },
    },

    // Financial Information
    rate: {
      type: Number,
      required: true,
    },
    rateType: {
      type: String,
      enum: ["PER_MILE", "FLAT_RATE", "PER_HOUR"],
      default: "PER_MILE",
    },
    fuelSurcharge: {
      type: Number,
      default: 0,
    },
    accessorials: [
      {
        type: String,
        amount: Number,
        description: String,
      },
    ],

    // Documents
    documents: [documentSchema],

    // Tracking Information
    currentLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    lastUpdate: {
      type: Date,
      default: Date.now,
    },

    // Notes and Additional Information
    notes: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    // System Fields
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "loads",
  }
);

// Create index for loadNumber
loadSchema.index({ loadNumber: 1 }, { unique: true });

// Create index for status
loadSchema.index({ status: 1 });

// Create geospatial index for currentLocation
loadSchema.index({ currentLocation: "2dsphere" });

const Load = models.Load || model("Load", loadSchema);

export default Load;
