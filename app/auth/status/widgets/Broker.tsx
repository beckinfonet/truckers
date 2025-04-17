import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

interface BrokerProps {
  name: string;
  reference: string;
}

interface BrokerProps {
  name: string;
  reference: string;
  onClick: () => void;
}

export const Broker: React.FC<BrokerProps> = ({ name, reference, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onClick();
  };

  return (
    <Box
      onClick={handleToggle}
      sx={{
        background: "#f8f9fa",
        borderRadius: "12px",
        p: 2,
        width: "100%",
        minHeight: "120px",
        height: "100%",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.2s ease",
        "&:hover": {
          background: "#f0f2f5",
        },
      }}
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
        BROKER
      </Typography>

      <Typography
        sx={{
          fontSize: "1.25rem",
          fontWeight: 500,
          color: "#333",
          mb: 1,
          lineHeight: 1.2,
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        {name}
      </Typography>

      <Typography
        sx={{
          color: "#666",
          fontSize: "0.9rem",
          mt: 1,
        }}
      >
        Ref: {reference}
      </Typography>

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
    </Box>
  );
};

export default Broker;
