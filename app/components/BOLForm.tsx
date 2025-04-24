import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";

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
      <Typography variant="h6">Bill of Lading</Typography>
    </Box>
  );
};

export default BOLForm;
