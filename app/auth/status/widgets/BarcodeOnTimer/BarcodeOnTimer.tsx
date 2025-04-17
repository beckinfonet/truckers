import React from "react";
import { Box, Typography } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

interface BarcodeOnTimerProps {
  trackingId: string;
  onClick?: () => void;
}

export const BarcodeOnTimer: React.FC<BarcodeOnTimerProps> = ({
  trackingId,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        mt: 3,
        py: 3,
        px: 3,
        background: "#f6f6f7",
        borderRadius: "16px",
        textAlign: "center",
        position: "relative",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
          background: "#f0f0f1",
        },
      }}
    >
      <OpenInFullIcon
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          fontSize: "1.25rem",
          color: "#2c62cf",
          opacity: 0.6,
          transition: "opacity 0.2s ease",
          "&:hover": {
            opacity: 0.8,
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          gap: "2px",
          alignItems: "center",
          justifyContent: "center",
          height: "50px",
          mb: 1.5,
        }}
      >
        {Array.from({ length: 30 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              height: "100%",
              width: "1.5px",
              bgcolor: "#000",
              opacity: 0.7,
            }}
          />
        ))}
      </Box>
      <Typography
        sx={{
          fontFamily: "SF Mono, monospace",
          fontSize: "0.95rem",
          color: "#000",
          opacity: 0.8,
          letterSpacing: "0.05em",
        }}
      >
        {trackingId}
      </Typography>
    </Box>
  );
};
