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

// Equipment types for dropdown
const EQUIPMENT_TYPES = [
  "Dry Van",
  "Reefer",
  "Flatbed",
  "Step Deck",
  "Box Truck",
  "Power Only",
  "Hotshot",
  "Lowboy",
];

// Validation schema
const equipmentInfoSchema = z.object({
  equipmentType: z.string().min(1, "Equipment type is required"),
  equipmentMake: z.string().min(2, "Equipment make is required"),
  equipmentModel: z.string().min(2, "Equipment model is required"),
  equipmentYear: z.string().regex(/^\d{4}$/, "Year must be in YYYY format"),
  equipmentVin: z
    .string()
    .min(17, "VIN must be 17 characters")
    .max(17, "VIN must be 17 characters"),
  equipmentLicensePlate: z.string().min(1, "License plate is required"),
  equipmentInsurance: z.object({
    provider: z.string().min(2, "Insurance provider is required"),
    policyNumber: z.string().min(1, "Policy number is required"),
    expirationDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  }),
});

type EquipmentInfoFormData = z.infer<typeof equipmentInfoSchema>;

type EquipmentInfoFormProps = {
  data: Partial<EquipmentInfoFormData>;
  onNext: (data: EquipmentInfoFormData) => void;
  onBack: () => void;
};

export default function EquipmentInfoForm({
  data,
  onNext,
  onBack,
}: EquipmentInfoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EquipmentInfoFormData>({
    resolver: zodResolver(equipmentInfoSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: EquipmentInfoFormData) => {
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h6" gutterBottom>
          Equipment Information
        </Typography>

        <Controller
          name="equipmentType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Equipment Type"
              fullWidth
              error={!!errors.equipmentType}
              helperText={errors.equipmentType?.message as string}
            >
              {EQUIPMENT_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="equipmentMake"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Equipment Make"
                  fullWidth
                  error={!!errors.equipmentMake}
                  helperText={errors.equipmentMake?.message as string}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="equipmentModel"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Equipment Model"
                  fullWidth
                  error={!!errors.equipmentModel}
                  helperText={errors.equipmentModel?.message as string}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="equipmentYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Equipment Year"
                  fullWidth
                  error={!!errors.equipmentYear}
                  helperText={errors.equipmentYear?.message as string}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="equipmentVin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="VIN"
                  fullWidth
                  error={!!errors.equipmentVin}
                  helperText={errors.equipmentVin?.message as string}
                />
              )}
            />
          </Grid>
        </Grid>

        <Controller
          name="equipmentLicensePlate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="License Plate"
              fullWidth
              error={!!errors.equipmentLicensePlate}
              helperText={errors.equipmentLicensePlate?.message as string}
            />
          )}
        />

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Insurance Information
        </Typography>

        <Controller
          name="equipmentInsurance.provider"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Insurance Provider"
              fullWidth
              error={!!errors.equipmentInsurance?.provider}
              helperText={
                errors.equipmentInsurance?.provider?.message as string
              }
            />
          )}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="equipmentInsurance.policyNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Policy Number"
                  fullWidth
                  error={!!errors.equipmentInsurance?.policyNumber}
                  helperText={
                    errors.equipmentInsurance?.policyNumber?.message as string
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="equipmentInsurance.expirationDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Expiration Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.equipmentInsurance?.expirationDate}
                  helperText={
                    errors.equipmentInsurance?.expirationDate?.message as string
                  }
                />
              )}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="outlined" onClick={onBack} size="large">
            Back
          </Button>
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
