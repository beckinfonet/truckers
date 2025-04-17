import React from "react";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { Typography } from "@mui/material";
import { Box } from "@mui/material";

export const StepProgress = ({
  pickupLocation,
  pickupTime,
  dropoffLocation,
  dropoffTime,
}: {
  pickupLocation: string;
  pickupTime: string;
  dropoffLocation: string;
  dropoffTime: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: 3,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "1.75rem",
            fontWeight: 600,
            color: "#000",
            letterSpacing: "-0.02em",
          }}
        >
          {pickupLocation}
        </Typography>
        <Typography sx={{ color: "#666", mt: 1, fontSize: "0.9rem" }}>
          {pickupTime}
        </Typography>
      </Box>
      <LocalShippingIcon
        sx={{
          color: "#2c62cf",
          fontSize: 20,
          mt: 2,
          opacity: 0.8,
        }}
      />
      <Box sx={{ textAlign: "right" }}>
        <Typography
          sx={{
            fontSize: "1.75rem",
            fontWeight: 600,
            color: "#000",
            letterSpacing: "-0.02em",
          }}
        >
          {dropoffLocation}
        </Typography>
        <Typography sx={{ color: "#666", mt: 1, fontSize: "0.9rem" }}>
          {dropoffTime}
        </Typography>
      </Box>
    </Box>
  );
};
