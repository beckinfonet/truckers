"use client";

import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
} from "@mui/material";
import { useState } from "react";
import CompanyInfoForm from "./components/CompanyInfoForm";
import CarrierInfoForm from "./components/CarrierInfoForm";
import DocumentsUploadForm from "./components/DocumentsUploadForm";

const steps = ["Company Information", "Carrier Details", "Documents Upload"];

export default function CarrierOnboarding() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Company Info
    companyName: "",
    mcNumber: "",
    dotNumber: "",
    ein: "",
    companyAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
    },

    // Carrier Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    fleetSize: "",
    equipmentTypes: [],
    operatingStates: [],

    // Documents
    carrierAuthority: null,
    insuranceCertificate: null,
    w9Form: null,
    safetyRating: null,
  });

  const handleNext = (newData: any) => {
    setFormData({ ...formData, ...newData });
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (finalData: any) => {
    const completeData = { ...formData, ...finalData };
    try {
      // TODO: Implement API call to save carrier data
      console.log("Form submitted:", completeData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CompanyInfoForm data={formData} onNext={handleNext} />;
      case 1:
        return (
          <CarrierInfoForm
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <DocumentsUploadForm
            data={formData}
            onNext={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: "none",
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Carrier Onboarding
        </Typography>

        <Stepper activeStep={activeStep} sx={{ my: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          {activeStep === steps.length ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Thank you for completing the onboarding process!
              </Typography>
              <Typography color="text.secondary">
                We will review your information and contact you shortly.
              </Typography>
            </Box>
          ) : (
            renderStepContent(activeStep)
          )}
        </Box>
      </Paper>
    </Container>
  );
}
