import React from "react";

import { Typography, Avatar } from "@mui/material";
import { Box } from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

export const CarrierSection = ({
  carrierInfo,
  onClick,
}: {
  carrierInfo: { name: string; vehicleId: string };
  onClick: () => void;
}) => {
  return (
    <Box
      sx={{
        py: 2.5,
        borderRadius: "16px",
        background: "#f6f6f7",
        mb: 2,
        px: 3.5,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Typography
        sx={{
          color: "#666",
          fontSize: "0.75rem",
          mb: 1.5,
          letterSpacing: "0.06em",
          opacity: 0.8,
        }}
      >
        CARRIER
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "1.1rem",
              color: "#000",
              fontWeight: 500,
              mb: 1,
            }}
          >
            {carrierInfo.name}
          </Typography>
          <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>
            {carrierInfo.vehicleId}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              border: "2px solid #fff",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
              borderRadius: "50%",
            }}
            src="/shipper-avatar.jpg"
          />
          <VerifiedUserOutlinedIcon
            sx={{
              position: "absolute",
              right: -8,
              bottom: -4,
              color: "#50C878",
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "2px",
              fontSize: "22px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
