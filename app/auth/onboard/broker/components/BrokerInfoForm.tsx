"use client";

import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation schema
const brokerInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?1?\d{10,14}$/, "Invalid phone number"),
  position: z.string().min(2, "Position is required"),
  department: z.string().optional(),
  extension: z.string().optional(),
  preferredContact: z.enum(["email", "phone", "both"]).default("email"),
});

type BrokerInfoFormProps = {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
};

export default function BrokerInfoForm({
  data,
  onNext,
  onBack,
}: BrokerInfoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(brokerInfoSchema),
    defaultValues: {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      position: data.position || "",
      department: data.department || "",
      extension: data.extension || "",
      preferredContact: data.preferredContact || "email",
    },
  });

  const onSubmit = (formData: any) => {
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: "200px" }}>
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
          </Box>

          <Box sx={{ flex: 1, minWidth: "200px" }}>
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
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message as string}
                />
              )}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  fullWidth
                  placeholder="+1 (555) 123-4567"
                  error={!!errors.phone}
                  helperText={errors.phone?.message as string}
                />
              )}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Position"
                  fullWidth
                  error={!!errors.position}
                  helperText={errors.position?.message as string}
                />
              )}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Department"
                  fullWidth
                  error={!!errors.department}
                  helperText={errors.department?.message as string}
                />
              )}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Controller
              name="extension"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Extension"
                  fullWidth
                  error={!!errors.extension}
                  helperText={errors.extension?.message as string}
                />
              )}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Controller
              name="preferredContact"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.preferredContact}>
                  <InputLabel>Preferred Contact Method</InputLabel>
                  <Select {...field} label="Preferred Contact Method">
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="phone">Phone</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Box>
        </Box>

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
