import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export const LiveChat = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 3,
        backgroundColor: "#f4fff6",
        borderRadius: "12px",
        height: "72px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <ChatIcon sx={{ color: "#50C878", fontSize: 24 }} />
        <Typography
          sx={{ fontSize: "1rem", fontWeight: 500, color: "#3DA164" }}
        >
          Live Chat Support
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#50C878",
          minWidth: "120px",
          height: "40px",
          borderRadius: "8px",
          textTransform: "uppercase",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#3DA164",
          },
        }}
      >
        START CHAT
      </Button>
    </Box>
  );
};
