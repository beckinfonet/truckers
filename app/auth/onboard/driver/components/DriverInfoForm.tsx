"use client";

import React from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// US States for dropdown
const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

// Validation schema
const driverInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?1?\d{10,14}$/, "Invalid phone number"),
  address: z.object({
    street: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().length(2, "Please select a state"),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "ZIP code must be valid"),
    country: z.string(),
  }),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  ssn: z
    .string()
    .regex(/^\d{3}-\d{2}-\d{4}$/, "SSN must be in XXX-XX-XXXX format"),
  cdlNumber: z.string().min(5, "CDL number is required"),
  cdlExpirationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

type DriverInfoFormData = z.infer<typeof driverInfoSchema>;

type DriverInfoFormProps = {
  data: Partial<DriverInfoFormData>;
  onNext: (data: DriverInfoFormData) => void;
};

export default function DriverInfoForm({ data, onNext }: DriverInfoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverInfoFormData>({
    resolver: zodResolver(driverInfoSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: DriverInfoFormData) => {
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message as string}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message as string}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message as string}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message as string}
                />
              )}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Address
        </Typography>

        <Controller
          name="address.street"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Street Address"
              fullWidth
              error={!!errors.address?.street}
              helperText={errors.address?.street?.message as string}
            />
          )}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="address.city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!errors.address?.city}
                  helperText={errors.address?.city?.message as string}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name="address.state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="State"
                  fullWidth
                  error={!!errors.address?.state}
                  helperText={errors.address?.state?.message as string}
                >
                  {US_STATES.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name="address.zipCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ZIP Code"
                  fullWidth
                  error={!!errors.address?.zipCode}
                  helperText={errors.address?.zipCode?.message as string}
                />
              )}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Driver Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message as string}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="ssn"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Social Security Number"
                  fullWidth
                  error={!!errors.ssn}
                  helperText={errors.ssn?.message as string}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="cdlNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="CDL Number"
                  fullWidth
                  error={!!errors.cdlNumber}
                  helperText={errors.cdlNumber?.message as string}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="cdlExpirationDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="CDL Expiration Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.cdlExpirationDate}
                  helperText={errors.cdlExpirationDate?.message as string}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            Next
          </Button>
        </Box>
      </Box>
    </form>
  );
}
