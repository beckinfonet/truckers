"use client";

import React from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { z } from "zod";

// Validation schema for identity verification
const identityVerificationSchema = z.object({
  verified: z.boolean(),
  verificationId: z.string().optional(),
});

type IdentityVerificationFormData = z.infer<typeof identityVerificationSchema>;

type IdentityVerificationFormProps = {
  verified?: boolean;
  onNext: (data: IdentityVerificationFormData) => void;
  onBack: () => void;
};

export default function IdentityVerificationForm({
  onNext,
  onBack,
}: IdentityVerificationFormProps) {
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [verificationStatus, setVerificationStatus] = React.useState<
    "pending" | "success" | "error"
  >("pending");

  const handleStartVerification = async () => {
    setIsVerifying(true);
    setVerificationStatus("pending");

    try {
      // TODO: Integrate with Plaid API
      // This is a placeholder for the actual Plaid integration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const verificationData = {
        verified: true,
        verificationId: "placeholder-verification-id",
      };

      // Validate the data before proceeding
      identityVerificationSchema.parse(verificationData);

      setVerificationStatus("success");
      onNext(verificationData);
    } catch (error) {
      setVerificationStatus("error");
      console.error("Verification failed:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h6" gutterBottom>
        Identity Verification
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <VerifiedUserIcon sx={{ fontSize: 48, color: "primary.main" }} />

        <Typography variant="h6" align="center">
          Verify Your Identity
        </Typography>

        <Typography variant="body1" align="center" color="text.secondary">
          We use Plaid to verify your identity securely. This helps us ensure
          the safety and security of our platform for all users.
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              What you will need:
            </Typography>
            <ul>
              <li>
                <Typography variant="body2">
                  A valid government-issued ID (driver`s license or passport)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  A selfie for facial verification
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Your current address information
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>

        {verificationStatus === "error" && (
          <Typography color="error" sx={{ mt: 2 }}>
            Verification failed. Please try again.
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            onClick={onBack}
            size="large"
            disabled={isVerifying}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartVerification}
            size="large"
            disabled={isVerifying}
            startIcon={isVerifying ? <CircularProgress size={20} /> : null}
          >
            {isVerifying ? "Verifying..." : "Start Verification"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
