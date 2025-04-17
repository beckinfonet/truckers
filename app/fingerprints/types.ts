export interface DeviceFingerprint {
  userAgent: string;
  screenResolution: string;
  colorDepth: number;
  timeZone: string;
  language: string;
  platform: string;
  hardwareConcurrency: number;
  deviceMemory: number;
}

export interface RegisteredDevice {
  id: string;
  userId: string;
  userType: "shipper" | "broker" | "carrier";
  fingerprint: DeviceFingerprint;
  pushToken: string;
  lastUsed: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface ApprovalRequest {
  id: string;
  type: "rate" | "bol" | "other";
  details: {
    rate?: {
      amount: number;
      currency: string;
    };
    bol?: {
      documentId: string;
      shipmentId: string;
    };
    other?: Record<string, unknown>;
  };
  requiredApprovals: string[];
}
