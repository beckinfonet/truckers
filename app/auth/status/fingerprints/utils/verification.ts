import { DeviceFingerprint } from "../types";

export async function verifyFingerprint(
  stored: DeviceFingerprint,
  current: DeviceFingerprint
): Promise<boolean> {
  // Basic fingerprint matching
  return (
    stored.userAgent === current.userAgent &&
    stored.screenResolution === current.screenResolution &&
    stored.colorDepth === current.colorDepth &&
    stored.platform === current.platform &&
    stored.hardwareConcurrency === current.hardwareConcurrency
  );
}
