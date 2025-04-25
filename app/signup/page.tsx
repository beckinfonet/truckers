"use client";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BusinessIcon from "@mui/icons-material/Business";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";

export default function SignupPage() {
  const router = useRouter();

  const handleRoleSelect = (
    role: "shipper" | "broker" | "carrier" | "driver"
  ) => {
    // Navigate to the appropriate onboarding page
    if (role) {
      router.push(`/auth/onboard/${role}`);
    }
  };

  const roleCards = [
    {
      id: "1",
      role: "shipper" as const,
      title: "Shipper",
      description: "I need to ship goods and find reliable carriers",
      icon: <StorefrontIcon sx={{ fontSize: 60, color: "#1976d2" }} />,
    },
    {
      id: "2",
      role: "broker" as const,
      title: "Broker",
      description: "I connect shippers with carriers and manage logistics",
      icon: <BusinessIcon sx={{ fontSize: 60, color: "#2e7d32" }} />,
    },
    {
      id: "3",
      role: "carrier" as const,
      title: "Carrier",
      description: "I operate trucks and want to find shipping opportunities",
      icon: <LocalShippingIcon sx={{ fontSize: 60, color: "#ed6c02" }} />,
    },
    {
      id: "4",
      role: "driver" as const,
      title: "Driver",
      description: "I drive trucks and want to find work opportunities",
      icon: <PersonIcon sx={{ fontSize: 60, color: "#9c27b0" }} />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Truckers
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Choose your role to get started
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ justifyContent: "center" }}>
        {roleCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.role} component="div">
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardActionArea
                onClick={() => handleRoleSelect(card.role)}
                sx={{ height: "100%" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <Box sx={{ mb: 2 }}>{card.icon}</Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
