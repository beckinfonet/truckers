import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { GridProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/material";
import SignatureCollection, {
  SignatureCollectionRef,
} from "./SignatureCollection";
// import Grid from "@mui/material/Grid";

interface BOLFormData {
  // Carrier Information
  carrierName: string;

  // Ship From (Shipper)
  shipperCompany: string;
  shipperName: string;
  shipperAddress: string;
  shipperCity: string;
  shipperState: string;
  shipperZip: string;
  shipperPhone: string;
  pickupDate: Date;
  pickupTime: string;

  // Ship To (Receiver)
  receiverCompany: string;
  receiverName: string;
  receiverAddress: string;
  receiverCity: string;
  receiverState: string;
  receiverZip: string;
  receiverPhone: string;

  // Bill Freight To
  billToCompany: string;
  billToAddress: string;
  billToCity: string;
  billToState: string;
  billToZip: string;

  // Customs Agent
  customsAgentName: string;
  customsAgentPhone: string;
  customsAgentEmail: string;

  // Cargo Information
  quantity: string;
  packageType: string;
  pieces: string;
  description: string;
  freightClass: string;
  nmfc: string;
  dimensions: string;
  weight: string;

  // Additional Information
  specialInstructions: string;
  poReference: string;

  // Signatures
  shipperSignature: string;
  driverSignature: string;
  receiverSignature: string;
}

interface BOLFormProps {
  onSubmit: (data: BOLFormData) => void;
  initialData?: Partial<BOLFormData>;
}

// Helper component for Grid items with proper typing
interface GridItemProps {
  xs?: number;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const GridItem = ({ xs = 12, children, sx }: GridItemProps) => (
  <Grid xs={xs} sx={{ mb: 2, ...sx }}>
    {children}
  </Grid>
);

const BOLForm: React.FC<BOLFormProps> = ({ onSubmit, initialData }) => {
  const signatureCollectionRef = useRef<SignatureCollectionRef>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BOLFormData>({
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: BOLFormData) => {
    const signatures = signatureCollectionRef.current?.getSignatures();
    if (signatures) {
      const formDataWithSignatures = {
        ...data,
        shipperSignature: signatures.shipper,
        driverSignature: signatures.driver,
        receiverSignature: signatures.receiver,
      };
      onSubmit(formDataWithSignatures);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 1 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
        >
          STRAIGHT BILL OF LADING
        </Typography>

        {/* Carrier Information */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: "#666" }}>
            CARRIER NAME
          </Typography>
          <Controller
            name="carrierName"
            control={control}
            rules={{ required: "Carrier name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                variant="outlined"
                error={!!errors.carrierName}
                helperText={errors.carrierName?.message}
                sx={{ backgroundColor: "#f5f5f5" }}
              />
            )}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Ship From Section */}
          <Grid xs={12} md={6} sx={{ p: 2 }}>
            <Box sx={{ p: 3, borderRadius: 1, bgcolor: "#f5f5f5" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                SHIP FROM LOCATION
              </Typography>
              <Grid container spacing={2}>
                <GridItem xs={12}>
                  <Controller
                    name="shipperCompany"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Company"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <Controller
                    name="shipperName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <Controller
                    name="shipperAddress"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Address"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={6}>
                  <Controller
                    name="shipperCity"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="City"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={3}>
                  <Controller
                    name="shipperState"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="State"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={3}>
                  <Controller
                    name="shipperZip"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ZIP"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <Controller
                    name="shipperPhone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Phone Number"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <Controller
                    name="pickupDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Pick Up Date"
                        value={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: "small",
                          },
                        }}
                      />
                    )}
                  />
                </GridItem>
              </Grid>
            </Box>
          </Grid>

          {/* Ship To Section */}
          <Grid xs={12} md={6} sx={{ p: 2 }}>
            <Box sx={{ p: 3, borderRadius: 1, bgcolor: "#f5f5f5" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                SHIP TO LOCATION
              </Typography>
              <Grid container spacing={2}>
                <GridItem xs={12}>
                  <Controller
                    name="receiverCompany"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Company"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <Controller
                    name="receiverName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <Controller
                    name="receiverAddress"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Address"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={6}>
                  <Controller
                    name="receiverCity"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="City"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={3}>
                  <Controller
                    name="receiverState"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="State"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={3}>
                  <Controller
                    name="receiverZip"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ZIP"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <Controller
                    name="receiverPhone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Phone Number"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
              </Grid>
            </Box>
          </Grid>

          {/* Bill Freight To Section */}
          <Grid xs={12} md={6} sx={{ p: 2 }}>
            <Box sx={{ p: 3, borderRadius: 1, bgcolor: "#f5f5f5" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                BILL FREIGHT TO
              </Typography>
              <Grid container spacing={2}>
                <GridItem xs={12}>
                  <Controller
                    name="billToCompany"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Company"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <Controller
                    name="billToAddress"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Address"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={6}>
                  <Controller
                    name="billToCity"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="City"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={3}>
                  <Controller
                    name="billToState"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="State"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={3}>
                  <Controller
                    name="billToZip"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ZIP"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
              </Grid>
            </Box>
          </Grid>

          {/* Customs Agent Section */}
          <Grid xs={12} md={6} sx={{ p: 2 }}>
            <Box sx={{ p: 3, borderRadius: 1, bgcolor: "#f5f5f5" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                CUSTOMS AGENT
              </Typography>
              <Grid container spacing={2}>
                <GridItem xs={12}>
                  <Controller
                    name="customsAgentName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <Controller
                    name="customsAgentPhone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Phone Number"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <Controller
                    name="customsAgentEmail"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email Address"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </GridItem>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Cargo Details Table */}
        <Box sx={{ mt: 4 }}>
          <Grid container sx={{ backgroundColor: "#000", color: "#fff", p: 1 }}>
            <GridItem xs={1}>
              <Typography>QTY</Typography>
            </GridItem>
            <GridItem xs={1}>
              <Typography>PKG</Typography>
            </GridItem>
            <GridItem xs={1}>
              <Typography>PCS</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography>DESCRIPTION</Typography>
            </GridItem>
            <GridItem xs={1}>
              <Typography>CLASS</Typography>
            </GridItem>
            <GridItem xs={2}>
              <Typography>NMFC</Typography>
            </GridItem>
            <GridItem xs={1}>
              <Typography>DIMS</Typography>
            </GridItem>
            <GridItem xs={1}>
              <Typography>WEIGHT</Typography>
            </GridItem>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 0 }}>
            <GridItem xs={1}>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <TextField {...field} size="small" fullWidth />
                )}
              />
            </GridItem>
            <GridItem xs={1}>
              <Controller
                name="packageType"
                control={control}
                render={({ field }) => (
                  <TextField {...field} size="small" fullWidth />
                )}
              />
            </GridItem>
            <GridItem xs={1}>
              <Controller
                name="pieces"
                control={control}
                render={({ field }) => (
                  <TextField {...field} size="small" fullWidth />
                )}
              />
            </GridItem>
            <GridItem xs={4}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField {...field} size="small" fullWidth />
                )}
              />
            </GridItem>
            <GridItem xs={1}>
              <Controller
                name="freightClass"
                control={control}
                render={({ field }) => (
                  <TextField {...field} size="small" fullWidth />
                )}
              />
            </GridItem>
            <GridItem xs={2}>
              <Controller
                name="nmfc"
                control={control}
                render={({ field }) => (
                  <TextField {...field} size="small" fullWidth />
                )}
              />
            </GridItem>
            <GridItem xs={1}>
              <Controller
                name="dimensions"
                control={control}
                render={({ field }) => (
                  <TextField {...field} size="small" fullWidth />
                )}
              />
            </GridItem>
            <GridItem xs={1}>
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <TextField {...field} size="small" fullWidth />
                )}
              />
            </GridItem>
          </Grid>
        </Box>

        {/* Special Instructions */}
        <Grid container sx={{ mt: 3 }}>
          <GridItem xs={12}>
            <Typography
              variant="subtitle2"
              sx={{ backgroundColor: "#f5f5f5", p: 1 }}
            >
              SPECIAL INSTRUCTIONS:
            </Typography>
            <Controller
              name="specialInstructions"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                />
              )}
            />
          </GridItem>
        </Grid>

        {/* Signatures Section */}
        <Box sx={{ mt: 4 }}>
          <SignatureCollection ref={signatureCollectionRef} />
        </Box>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Save BOL
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default BOLForm;
