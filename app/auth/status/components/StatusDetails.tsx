import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { X, MapPin, Clock, Image as ImageIcon } from "lucide-react";
import { keyframes } from "@mui/system";
import StatusUpdateForm from "./StatusUpdateForm";

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

interface StatusDetailsProps {
  status: string;
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  onClose: () => void;
  images?: string[];
  onStatusUpdate?: (status: string, images: File[]) => void;
}

const StatusDetails: React.FC<StatusDetailsProps> = ({
  status,
  timestamp,
  location,
  onClose,
  images = [],
  onStatusUpdate,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        mt: 2,
        py: 3,
        px: 3,
        background: "#fff",
        borderRadius: "16px",
        width: "100%",
        animation: `${fadeIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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
        <X size={20} />
      </IconButton>

      {/* Current Status */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "#4CAF50",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "#1976d2",
            fontWeight: 500,
            fontSize: "1.25rem",
          }}
        >
          {status}
        </Typography>
      </Box>

      {/* Time */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Clock size={18} color="#666" />
        <Typography sx={{ color: "#666", fontSize: "0.95rem" }}>
          {timestamp}
        </Typography>
      </Box>

      {/* Location */}
      {location && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <MapPin size={18} color="#666" />
          <Typography sx={{ color: "#666", fontSize: "0.95rem" }}>
            {`${location.latitude.toFixed(6)}, ${location.longitude.toFixed(
              6
            )}`}
          </Typography>
        </Box>
      )}

      {/* Status Update Form */}
      {onStatusUpdate && <StatusUpdateForm onSubmit={onStatusUpdate} />}

      {/* Display existing images if no update section */}
      {!onStatusUpdate && images.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
              color: "#666",
              fontWeight: 500,
            }}
          >
            <ImageIcon size={18} />
            Photos
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1.5,
            }}
          >
            {images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  paddingTop: "100%",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StatusDetails;
