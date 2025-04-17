import React from "react";
import { Box, Typography, Button } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export const PanicReport = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 3,
        backgroundColor: "#fff4f4",
        borderRadius: "12px",
        height: "72px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <WarningAmberIcon sx={{ color: "#dc2626", fontSize: 24 }} />
        <Typography
          sx={{ fontSize: "1rem", fontWeight: 500, color: "#dc2626" }}
        >
          Report an Emergency
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#dc2626",
          minWidth: "120px",
          height: "40px",
          borderRadius: "8px",
          textTransform: "uppercase",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#b91c1c",
          },
        }}
      >
        REPORT
      </Button>
    </Box>
  );
};
