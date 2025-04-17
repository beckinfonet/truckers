import { useState } from "react";
import { Box, Button, Typography, Alert, Paper } from "@mui/material";
import { useDeviceRegistration } from "../../fingerprints/hooks/useDeviceRegistration";
import { useSecureApproval } from "../../fingerprints/hooks/useSecureApproval";
import { DeviceFingerprint } from "../../fingerprints/types";

export const SecureApprovalTest = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceFingerprint | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [approvalStatus, setApprovalStatus] = useState<string | null>(null);

  const {
    registerDevice,
    isRegistering,
    error: registrationHookError,
  } = useDeviceRegistration();
  const { requestApproval, isApproving } = useSecureApproval();

  const handleRegisterDevice = async () => {
    try {
      const device = await registerDevice("TEST-USER-001", "shipper");
      if (device) {
        setDeviceInfo(device.fingerprint);
        setRegistrationError(null);
        setApprovalStatus(
          "Device registered successfully. You can now test the approval."
        );
      }
    } catch (err) {
      setRegistrationError(
        err instanceof Error ? err.message : "Registration failed"
      );
    }
  };

  const handleTestApproval = async () => {
    if (!deviceInfo) {
      setApprovalStatus("Please register device first");
      return;
    }

    try {
      const approved = await requestApproval("TEST-USER-001", "shipper", {
        type: "rate",
        amount: 2500,
      });

      setApprovalStatus(
        approved
          ? "Approval request successful! Check console for fingerprint verification."
          : "Approval request failed"
      );
    } catch (err) {
      setApprovalStatus(
        err instanceof Error ? err.message : "Approval request failed"
      );
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Secure Approval System Test
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleRegisterDevice}
          disabled={isRegistering || !!deviceInfo}
          sx={{ mr: 2 }}
        >
          {isRegistering ? "Registering..." : "Step 1: Register Device"}
        </Button>

        <Button
          variant="contained"
          onClick={handleTestApproval}
          disabled={isApproving || !deviceInfo}
          color="primary"
        >
          {isApproving ? "Approving..." : "Step 2: Test Approval"}
        </Button>
      </Box>

      {registrationError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {registrationError}
        </Alert>
      )}

      {registrationHookError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {registrationHookError.message}
        </Alert>
      )}

      {approvalStatus && (
        <Alert
          severity={approvalStatus.includes("failed") ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {approvalStatus}
        </Alert>
      )}

      {deviceInfo && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Registered Device Fingerprint:
          </Typography>
          <Paper sx={{ p: 2, bgcolor: "grey.100" }}>
            <pre style={{ margin: 0, overflow: "auto" }}>
              {JSON.stringify(deviceInfo, null, 2)}
            </pre>
          </Paper>
        </Box>
      )}
    </Paper>
  );
};
