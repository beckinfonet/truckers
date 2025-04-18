import { Request, Response, NextFunction } from "express";
import { verifyFingerprint } from "../utils/verification";
import { DeviceFingerprint } from "../types";

export async function validateDevice(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const deviceId = req.headers["x-device-id"] as string;
    const fingerprint = req.headers["x-device-fingerprint"] as string;

    if (!deviceId || !fingerprint) {
      res.status(401).json({ error: "Missing device credentials" });
      return;
    }

    // TODO: Replace with actual device lookup
    const storedFingerprint = JSON.parse(fingerprint) as DeviceFingerprint;
    const currentFingerprint = JSON.parse(fingerprint) as DeviceFingerprint;

    const isValid = await verifyFingerprint(
      storedFingerprint,
      currentFingerprint
    );
    if (!isValid) {
      res.status(401).json({ error: "Invalid device fingerprint" });
      return;
    }

    next();
  } catch (err) {
    res.status(500).json({ errorMsg: "Device validation failed", error: err });
  }
}
