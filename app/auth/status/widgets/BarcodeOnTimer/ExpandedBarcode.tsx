import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface ExpandedBarcodeProps {
  trackingId: string;
  onClose: () => void;
}

export const ExpandedBarcode = ({
  trackingId,
  onClose,
}: ExpandedBarcodeProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        mt: 3,
        py: 4,
        px: 3,
        background: "#f6f6f7",
        borderRadius: "16px",
        textAlign: "center",
        animation: `${fadeIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#666",
        }}
      >
        <CloseIcon />
      </IconButton>

      <Typography
        sx={{
          fontSize: "0.9rem",
          color: "#666",
          mb: 2,
          letterSpacing: "0.02em",
        }}
      >
        Tracking ID
      </Typography>

      {/* Large Barcode */}
      <Box
        sx={{
          display: "flex",
          gap: "3px",
          alignItems: "center",
          justifyContent: "center",
          height: "120px",
          mb: 2,
        }}
      >
        {Array.from({ length: 40 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              height: "100%",
              width: "2px",
              bgcolor: "#000",
              opacity: Math.random() > 0.5 ? 0.9 : 0.3,
            }}
          />
        ))}
      </Box>

      <Typography
        sx={{
          fontFamily: "SF Mono, monospace",
          fontSize: "1.2rem",
          color: "#000",
          opacity: 0.8,
          letterSpacing: "0.1em",
          fontWeight: 500,
        }}
      >
        {trackingId}
      </Typography>

      <Typography
        sx={{
          fontSize: "0.8rem",
          color: "#666",
          mt: 2,
          fontStyle: "italic",
        }}
      >
        Click to copy tracking ID
      </Typography>
    </Box>
  );
};
