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

export const FullInfo = ({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      sx={{
        position: "relative",
        mt: 3,
        mb: 3,
        py: 4,
        px: 3,
        background: "#f6f6f7",
        borderRadius: "16px",
        width: "100%",
        animation: `${fadeIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      <IconButton
        onClick={onClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#666",
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Stats Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
        {/* Shipper Stats */}
        <StatBox
          title="Shipper Stats"
          stats={[
            { label: "Total Shipments", value: "247" },
            { label: "On-time Rate", value: "98.2%" },
            { label: "Avg. Load Size", value: "12.5t" },
          ]}
        />

        {/* Broker Stats */}
        <StatBox
          title="Broker Stats"
          stats={[
            { label: "Deals Closed", value: "1,432" },
            { label: "Response Time", value: "2.4h" },
            { label: "Success Rate", value: "94.7%" },
          ]}
        />

        {/* Carrier Stats */}
        <StatBox
          title="Carrier Stats"
          stats={[
            { label: "Fleet Size", value: "85" },
            { label: "Coverage", value: "32 states" },
            { label: "Safety Score", value: "4.8/5" },
          ]}
        />

        {/* Route Stats */}
        <StatBox
          title="Route Analytics"
          stats={[
            { label: "Avg. Distance", value: "842mi" },
            { label: "Common Routes", value: "15" },
            { label: "Peak Times", value: "8AM-2PM" },
          ]}
        />
      </Box>
    </Box>
  );
};

interface StatBoxProps {
  title: string;
  stats: Array<{ label: string; value: string }>;
}

const StatBox = ({ title, stats }: StatBoxProps) => (
  <Box
    sx={{
      background: "white",
      borderRadius: "12px",
      p: 2,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}
  >
    <Typography
      sx={{
        color: "#2c62cf",
        fontSize: "0.85rem",
        fontWeight: 600,
        mb: 2,
        opacity: 0.9,
      }}
    >
      {title}
    </Typography>
    {stats.map((stat, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: index === stats.length - 1 ? 0 : 1.5,
        }}
      >
        <Typography
          sx={{
            color: "#666",
            fontSize: "0.8rem",
          }}
        >
          {stat.label}
        </Typography>
        <Typography
          sx={{
            color: "#000",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          {stat.value}
        </Typography>
      </Box>
    ))}
  </Box>
);
