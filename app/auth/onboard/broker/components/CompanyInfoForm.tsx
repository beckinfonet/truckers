import { Box, TextField, Button, MenuItem } from "@mui/material";
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
const companyInfoSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  mcNumber: z
    .string()
    .regex(/^MC\d{6}$/, "MC number must be in format MC123456"),
  dotNumber: z.string().regex(/^\d{6,8}$/, "DOT number must be 6-8 digits"),
  ein: z.string().regex(/^\d{2}-\d{7}$/, "EIN must be in format XX-XXXXXXX"),
  companyAddress: z.object({
    street: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().length(2, "Please select a state"),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "ZIP code must be valid"),
    country: z.string(),
  }),
});

type CompanyInfoFormProps = {
  data: any;
  onNext: (data: any) => void;
};

export default function CompanyInfoForm({
  data,
  onNext,
}: CompanyInfoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      companyName: data?.companyName || "",
      mcNumber: data?.mcNumber || "",
      dotNumber: data?.dotNumber || "",
      ein: data?.ein || "",
      companyAddress: {
        street: data?.companyAddress?.street || "",
        city: data?.companyAddress?.city || "",
        state: data?.companyAddress?.state || "",
        zipCode: data?.companyAddress?.zipCode || "",
        country: "USA",
      },
    },
  });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Name"
              fullWidth
              error={!!errors.companyName}
              helperText={errors.companyName?.message as string}
            />
          )}
        />

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Controller
              name="mcNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="MC Number"
                  fullWidth
                  placeholder="MC123456"
                  error={!!errors.mcNumber}
                  helperText={errors.mcNumber?.message as string}
                />
              )}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Controller
              name="dotNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="DOT Number"
                  fullWidth
                  error={!!errors.dotNumber}
                  helperText={errors.dotNumber?.message as string}
                />
              )}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Controller
              name="ein"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="EIN"
                  fullWidth
                  placeholder="XX-XXXXXXX"
                  error={!!errors.ein}
                  helperText={errors.ein?.message as string}
                />
              )}
            />
          </Box>
        </Box>

        <Controller
          name="companyAddress.street"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Street Address"
              fullWidth
              error={!!errors.companyAddress?.street}
              helperText={errors.companyAddress?.street?.message as string}
            />
          )}
        />

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ flex: 5, minWidth: "200px" }}>
            <Controller
              name="companyAddress.city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!errors.companyAddress?.city}
                  helperText={errors.companyAddress?.city?.message as string}
                />
              )}
            />
          </Box>

          <Box sx={{ flex: 3, minWidth: "100px" }}>
            <Controller
              name="companyAddress.state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="State"
                  fullWidth
                  error={!!errors.companyAddress?.state}
                  helperText={errors.companyAddress?.state?.message as string}
                >
                  {US_STATES.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>

          <Box sx={{ flex: 4, minWidth: "150px" }}>
            <Controller
              name="companyAddress.zipCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ZIP Code"
                  fullWidth
                  error={!!errors.companyAddress?.zipCode}
                  helperText={errors.companyAddress?.zipCode?.message as string}
                />
              )}
            />
          </Box>
        </Box>

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
