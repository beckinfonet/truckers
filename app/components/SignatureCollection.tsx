import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  ReactNode,
} from "react";
import { Box, Typography, Button } from "@mui/material";
import SignaturePad from "react-signature-canvas";

// Custom Grid component to work around type issues
interface GridContainerProps {
  children: ReactNode;
  spacing?: number;
  [key: string]: any;
}

const GridContainer = ({
  children,
  spacing = 0,
  ...props
}: GridContainerProps) => (
  <Box
    sx={{ display: "flex", flexWrap: "wrap", margin: `-${spacing / 2}px` }}
    {...props}
  >
    {React.Children.map(children, (child) => (
      <Box sx={{ padding: `${spacing / 2}px` }}>{child}</Box>
    ))}
  </Box>
);

interface GridItemProps {
  children: ReactNode;
  xs?: number;
  md?: number;
  [key: string]: any;
}

const GridItem = ({ xs = 12, md = 12, children, ...props }: GridItemProps) => (
  <Box
    sx={{
      width: { xs: `${(xs / 12) * 100}%`, md: `${(md / 12) * 100}%` },
      flexBasis: { xs: `${(xs / 12) * 100}%`, md: `${(md / 12) * 100}%` },
    }}
    {...props}
  >
    {children}
  </Box>
);

interface SignatureCollectionProps {
  onSignaturesComplete?: (signatures: {
    shipper: string;
    driver: string;
    receiver: string;
  }) => void;
  showTitle?: boolean;
}

export interface SignatureCollectionRef {
  getSignatures: () => {
    shipper: string;
    driver: string;
    receiver: string;
  } | null;
}

const SignatureCollection = forwardRef<
  SignatureCollectionRef,
  SignatureCollectionProps
>(({ onSignaturesComplete, showTitle = true }, ref) => {
  const shipperSignatureRef = useRef<SignaturePad>(null);
  const driverSignatureRef = useRef<SignaturePad>(null);
  const receiverSignatureRef = useRef<SignaturePad>(null);

  const clearSignature = (pad: SignaturePad | null) => {
    if (pad) {
      pad.clear();
    }
  };

  const getSignatures = () => {
    if (
      shipperSignatureRef.current &&
      driverSignatureRef.current &&
      receiverSignatureRef.current
    ) {
      return {
        shipper: shipperSignatureRef.current.toDataURL(),
        driver: driverSignatureRef.current.toDataURL(),
        receiver: receiverSignatureRef.current.toDataURL(),
      };
    }
    return null;
  };

  useImperativeHandle(ref, () => ({
    getSignatures,
  }));

  return (
    <Box>
      {showTitle && (
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Collect Signatures
        </Typography>
      )}
      <GridContainer spacing={4}>
        {/* Shipper Signature */}
        <GridItem xs={12} md={4}>
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              p: 3,
              borderRadius: 1,
              mb: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Shipper Signature
            </Typography>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                height: { xs: 150, md: 200 },
                mb: 2,
                bgcolor: "#fff",
              }}
            >
              <SignaturePad
                ref={shipperSignatureRef}
                canvasProps={{
                  style: { width: "100%", height: "100%" },
                }}
              />
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={() => clearSignature(shipperSignatureRef.current)}
            >
              Clear
            </Button>
          </Box>
        </GridItem>

        {/* Driver Signature */}
        <GridItem xs={12} md={4}>
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              p: 3,
              borderRadius: 1,
              mb: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Driver Signature
            </Typography>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                height: { xs: 150, md: 200 },
                mb: 2,
                bgcolor: "#fff",
              }}
            >
              <SignaturePad
                ref={driverSignatureRef}
                canvasProps={{
                  style: { width: "100%", height: "100%" },
                }}
              />
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={() => clearSignature(driverSignatureRef.current)}
            >
              Clear
            </Button>
          </Box>
        </GridItem>

        {/* Receiver Signature */}
        <GridItem xs={12} md={4}>
          <Box sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              Receiver Signature
            </Typography>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                height: { xs: 150, md: 200 },
                mb: 2,
                bgcolor: "#fff",
              }}
            >
              <SignaturePad
                ref={receiverSignatureRef}
                canvasProps={{
                  style: { width: "100%", height: "100%" },
                }}
              />
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={() => clearSignature(receiverSignatureRef.current)}
            >
              Clear
            </Button>
          </Box>
        </GridItem>
      </GridContainer>
    </Box>
  );
});

SignatureCollection.displayName = "SignatureCollection";

export default SignatureCollection;
