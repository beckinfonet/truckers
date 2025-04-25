"use client";

import React from "react";
import { Box, Container, Typography, Paper, Button } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleIcon from "@mui/icons-material/People";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PaymentIcon from "@mui/icons-material/Payment";
import Link from "next/link";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Paper
    elevation={2}
    sx={{
      p: 3,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "translateY(-5px)",
      },
      backgroundColor: "#ffffff",
      borderRadius: 2,
    }}
  >
    <Box sx={{ color: "primary.main", mb: 2, mt: 1 }}>{icon}</Box>
    <Typography
      variant="h6"
      component="h3"
      gutterBottom
      sx={{ fontWeight: 600 }}
    >
      {title}
    </Typography>
    <Typography
      color="text.secondary"
      sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}
    >
      {description}
    </Typography>
  </Paper>
);

export default function LandingPage() {
  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 6, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  mb: 3,
                }}
              >
                Revolutionizing Freight Management
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                  lineHeight: 1.4,
                }}
              >
                Connect, Track, and Manage Your Freight Operations with Ease
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={Link}
                  href="/signup"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  component={Link}
                  href="/auth/login"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Why Choose Our Platform?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.6,
            }}
          >
            Streamline your freight operations with our comprehensive solution
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          <FeatureCard
            icon={<PeopleIcon sx={{ fontSize: 48 }} />}
            title="Connect All Stakeholders"
            description="Seamlessly connect shippers, brokers, carriers, drivers, and factoring companies in one unified platform."
          />
          <FeatureCard
            icon={<VisibilityIcon sx={{ fontSize: 48 }} />}
            title="Real-Time Updates"
            description="Stay informed with real-time updates on shipment status, location, and delivery progress."
          />
          <FeatureCard
            icon={<LocalShippingIcon sx={{ fontSize: 48 }} />}
            title="Complete Transparency"
            description="Track who's shipping, who's hauling, and monitor the entire freight journey from pickup to delivery."
          />
          <FeatureCard
            icon={<PaymentIcon sx={{ fontSize: 48 }} />}
            title="Simplified Payments"
            description="Clear visibility of payment responsibilities and amounts for all stakeholders involved."
          />
        </Box>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
            color: "white",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            Ready to Transform Your Freight Operations?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: "1rem", md: "1.25rem" },
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Join our platform today and experience the future of freight
            management.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            href="/auth/signup"
            sx={{
              px: 6,
              py: 1.5,
              fontSize: "1.1rem",
              textTransform: "none",
              borderRadius: 2,
              backgroundColor: "#fff",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Start Your Journey
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
