import { DeviceFingerprint, RegisteredDevice } from "../types";

export class DeviceRegistrationService {
  async generateDeviceFingerprint(): Promise<DeviceFingerprint> {
    return {
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      colorDepth: window.screen.colorDepth,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory:
        (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 0,
    };
  }

  async registerDevice(
    userId: string,
    userType: string
  ): Promise<RegisteredDevice> {
    const fingerprint = await this.generateDeviceFingerprint();
    const pushToken = await this.requestPushPermission();

    // TODO: Replace with actual API call
    return {
      id: crypto.randomUUID(),
      userId,
      userType: userType as "shipper" | "broker" | "carrier",
      fingerprint,
      pushToken,
      lastUsed: new Date(),
      isActive: true,
      createdAt: new Date(),
    };
  }

  private async requestPushPermission(): Promise<string> {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("Push notification permission denied");
    }
    // TODO: Replace with actual push token generation
    return "mock-push-token";
  }
}
