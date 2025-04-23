import React, { useState, useRef } from "react";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import type { GridProps } from "@mui/material";
import SignaturePad from "react-signature-canvas";

interface SignatureCollectionProps {
  onSignaturesComplete?: (signatures: {
    shipper: string;
    driver: string;
    receiver: string;
  }) => void;
}

const SignatureCollection: React.FC<SignatureCollectionProps> = ({
  onSignaturesComplete,
}) => {
  const shipperSignatureRef = useRef<SignaturePad>(null);
  const driverSignatureRef = useRef<SignaturePad>(null);
  const receiverSignatureRef = useRef<SignaturePad>(null);

  const clearSignature = (pad: SignaturePad | null) => {
    if (pad) {
      pad.clear();
    }
  };

  const handleSaveSignatures = () => {
    if (
      shipperSignatureRef.current &&
      driverSignatureRef.current &&
      receiverSignatureRef.current
    ) {
      const signatures = {
        shipper: shipperSignatureRef.current.toDataURL(),
        driver: driverSignatureRef.current.toDataURL(),
        receiver: receiverSignatureRef.current.toDataURL(),
      };
      onSignaturesComplete?.(signatures);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Collect Signatures
      </Typography>
      <Grid container spacing={3}>
        {/* Shipper Signature */}
        <Grid {...({ item: true, xs: 12, md: 4 } as GridProps)}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Shipper Signature
            </Typography>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                height: 200,
                mb: 1,
              }}
            >
              <SignaturePad
                ref={shipperSignatureRef}
                canvasProps={{
                  style: { width: "100%", height: "100%" },
                }}
              />
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={() => clearSignature(shipperSignatureRef.current)}
            >
              Clear
            </Button>
          </Paper>
        </Grid>

        {/* Driver Signature */}
        <Grid {...({ item: true, xs: 12, md: 4 } as GridProps)}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Driver Signature
            </Typography>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                height: 200,
                mb: 1,
              }}
            >
              <SignaturePad
                ref={driverSignatureRef}
                canvasProps={{
                  style: { width: "100%", height: "100%" },
                }}
              />
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={() => clearSignature(driverSignatureRef.current)}
            >
              Clear
            </Button>
          </Paper>
        </Grid>

        {/* Receiver Signature */}
        <Grid {...({ item: true, xs: 12, md: 4 } as GridProps)}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Receiver Signature
            </Typography>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                height: 200,
                mb: 1,
              }}
            >
              <SignaturePad
                ref={receiverSignatureRef}
                canvasProps={{
                  style: { width: "100%", height: "100%" },
                }}
              />
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={() => clearSignature(receiverSignatureRef.current)}
            >
              Clear
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSignatures}
          disabled={
            !shipperSignatureRef.current ||
            !driverSignatureRef.current ||
            !receiverSignatureRef.current
          }
        >
          Save All Signatures
        </Button>
      </Box>
    </Box>
  );
};

export default SignatureCollection;
