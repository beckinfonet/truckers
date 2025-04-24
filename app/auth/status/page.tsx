"use client";
import React from "react";
import { Box } from "@mui/material";
import FreightCard from "./FreightCard";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

const mockFreight = {
  pickupLocation: "NEW YORK",
  pickupTime: "Apr 07, 2024 10:30 AM",
  dropoffLocation: "CHICAGO",
  dropoffTime: "Apr 08, 2024 05:37 PM",
  shipperInfo: {
    name: "John Doe Logistics",
    contact: "+1 (555) 123-4567",
  },
  carrierInfo: {
    name: "FastTrack Carriers",
    vehicleId: "FT-789",
  },
  brokerInfo: {
    name: "Global Freight Solutions",
    reference: "GFS-456",
  },
  trackingId: "SF2024040701",
  price: {
    amount: 2500,
    currency: "USD",
  },
  shipper: {
    id: "SHP-001",
    name: "John Doe",
    avatar: "/shipper-avatar.jpg",
  },
  carrier: {
    id: "CAR-001",
    name: "Mike Wilson",
    avatar: "/carrier-avatar.jpg",
  },
};

export default function StatusPage() {
  const { signOut } = useAuthenticator();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #f6f9fc 0%, #edf2f7 100%)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        p: { xs: 2, sm: 4 },
        pt: { xs: 4, sm: 6 },
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40vh",
          background: "linear-gradient(145deg, #1976d2 0%, #1565c0 100%)",
          opacity: 0.05,
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "480px",
          mx: "auto",
        }}
      >
        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
          <button onClick={signOut}>Sign out</button>
        </Box>
        <FreightCard {...mockFreight} />
      </Box>
    </Box>
  );
}
