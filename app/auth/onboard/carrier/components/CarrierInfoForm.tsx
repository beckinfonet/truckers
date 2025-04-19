"use client";

import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
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

// US States for operating areas
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
const carrierInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?1?\d{10,14}$/, "Invalid phone number"),
  position: z.string().min(2, "Position is required"),
  fleetSize: z.string().min(1, "Fleet size is required"),
  equipmentTypes: z
    .array(z.string())
    .min(1, "Select at least one equipment type"),
  operatingStates: z
    .array(z.string())
    .min(1, "Select at least one operating state"),
});

type CarrierInfoFormProps = {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
};

export default function CarrierInfoForm({
  data,
  onNext,
  onBack,
}: CarrierInfoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(carrierInfoSchema),
    defaultValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      email: data?.email || "",
      phone: data?.phone || "",
      position: data?.position || "",
      fleetSize: data?.fleetSize || "",
      equipmentTypes: Array.isArray(data?.equipmentTypes)
        ? data.equipmentTypes
        : [],
      operatingStates: Array.isArray(data?.operatingStates)
        ? data.operatingStates
        : [],
    },
  });

  const onSubmit = (formData: any) => {
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "white",
          borderRadius: 1,
          p: 3,
        }}
      >
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
              render={({ field: { onChange, value, ...field } }) => (
                <TextField
                  {...field}
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
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
              name="fleetSize"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fleet Size"
                  type="number"
                  fullWidth
                  error={!!errors.fleetSize}
                  helperText={errors.fleetSize?.message as string}
                />
              )}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Controller
              name="equipmentTypes"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <FormControl fullWidth error={!!errors.equipmentTypes}>
                  <InputLabel>Equipment Types</InputLabel>
                  <Select
                    {...field}
                    value={Array.isArray(value) ? value : []}
                    multiple
                    input={<OutlinedInput label="Equipment Types" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    onChange={onChange}
                  >
                    {EQUIPMENT_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Controller
              name="operatingStates"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <FormControl fullWidth error={!!errors.operatingStates}>
                  <InputLabel>Operating States</InputLabel>
                  <Select
                    {...field}
                    value={Array.isArray(value) ? value : []}
                    multiple
                    input={<OutlinedInput label="Operating States" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    onChange={onChange}
                  >
                    {US_STATES.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
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
