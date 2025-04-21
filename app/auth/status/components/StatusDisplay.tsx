import React from "react";
import { Box, Typography } from "@mui/material";
import { MapPin, Clock } from "lucide-react";

interface StatusDisplayProps {
  currentStatus: string;
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  onClick: () => void;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({
  currentStatus,
  timestamp,
  location,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 10,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#4CAF50",
            marginRight: 1,
          }}
        />
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {currentStatus}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Clock size={14} />
          <Typography variant="caption" color="text.secondary">
            {timestamp}
          </Typography>
        </Box>
        {location && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <MapPin size={14} />
            <Box>
              <Typography variant="caption">Last updated</Typography>
              <br />
              <Typography variant="caption" color="text.secondary">
                Los Angeles, CA
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StatusDisplay;
