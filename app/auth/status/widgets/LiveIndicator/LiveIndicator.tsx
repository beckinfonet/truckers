import React from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

const pulse = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(0.995);
  }
  50% {
    opacity: 0.9;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.995);
  }
`;

export const LiveIndicatorBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        borderRadius: "4px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: "#0f9117",
        mx: "auto",
        mb: 2,
        animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "0.9rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          fontStyle: "italic",
          transition: "all 0.3s ease-in-out",
        }}
      >
        Valid Until 4/10/25, 4:25 PM
      </Typography>
    </Box>
  );
};
