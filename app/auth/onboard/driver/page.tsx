/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
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
import DriverInfoForm from "./components/DriverInfoForm";
import EquipmentInfoForm from "./components/EquipmentInfoForm";
import IdentityVerificationForm from "./components/IdentityVerificationForm";

const steps = [
  "Personal Information",
  "Equipment Details",
  "Identity Verification",
];

export default function DriverOnboarding() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
    },
    dateOfBirth: "",
    ssn: "",
    cdlNumber: "",
    cdlExpirationDate: "",

    // Equipment Info
    equipmentType: "",
    equipmentMake: "",
    equipmentModel: "",
    equipmentYear: "",
    equipmentVin: "",
    equipmentLicensePlate: "",
    equipmentInsurance: {
      provider: "",
      policyNumber: "",
      expirationDate: "",
    },

    // Identity Verification (Plaid)
    plaidVerificationStatus: "pending",
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
      // TODO: Implement API call to save driver data
      console.log("Form submitted:", completeData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <DriverInfoForm data={formData} onNext={handleNext} />;
      case 1:
        return (
          <EquipmentInfoForm
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <IdentityVerificationForm
            verified={formData.plaidVerificationStatus === "verified"}
            onNext={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Driver Onboarding
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          align="center"
          sx={{ mb: 4 }}
        >
          Complete the following steps to register as a driver
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>{getStepContent(activeStep)}</Box>
      </Paper>
    </Container>
  );
}
