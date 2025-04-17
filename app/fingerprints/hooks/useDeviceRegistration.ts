import { useState, useCallback, useMemo } from "react";
import { RegisteredDevice } from "../types";
import { DeviceRegistrationService } from "../services/DeviceRegistrationService";

export function useDeviceRegistration() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const deviceService = useMemo(() => new DeviceRegistrationService(), []);

  const registerDevice = useCallback(
    async (
      userId: string,
      userType: string
    ): Promise<RegisteredDevice | null> => {
      setIsRegistering(true);
      setError(null);

      try {
        const device = await deviceService.registerDevice(userId, userType);
        return device;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Registration failed"));
        return null;
      } finally {
        setIsRegistering(false);
      }
    },
    [deviceService]
  );

  return { registerDevice, isRegistering, error };
}
