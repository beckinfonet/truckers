import { useState, useCallback, useMemo } from "react";
import { useDeviceRegistration } from "./useDeviceRegistration";
import { PushNotificationService } from "../services/PushNotificationService";

interface ApprovalDetails {
  type: "rate" | "bol" | "other";
  amount?: number;
  documentId?: string;
}

export function useSecureApproval() {
  const [isApproving, setIsApproving] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { registerDevice, isRegistering } = useDeviceRegistration();
  const pushService = useMemo(() => new PushNotificationService(), []);

  const requestApproval = useCallback(
    async (
      userId: string,
      userType: "shipper" | "broker" | "carrier",
      details: ApprovalDetails
    ) => {
      setIsApproving(true);
      setError(null);

      try {
        // First, ensure device is registered
        const device = await registerDevice(userId, userType);
        if (!device) {
          throw new Error("Device registration required");
        }

        // Send approval request
        await pushService.sendApprovalRequest({
          id: crypto.randomUUID(),
          type: details.type,
          details: {
            rate: details.amount
              ? { amount: details.amount, currency: "USD" }
              : undefined,
            bol: details.documentId
              ? { documentId: details.documentId, shipmentId: "SHIP-123" }
              : undefined,
          },
          requiredApprovals: [userId],
        });

        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Approval request failed")
        );
        return false;
      } finally {
        setIsApproving(false);
      }
    },
    [registerDevice, pushService]
  );

  return {
    requestApproval,
    isApproving,
    isRegistering,
    error,
  };
}
