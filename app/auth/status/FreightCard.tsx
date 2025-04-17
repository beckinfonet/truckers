"use client";
import { useState } from "react";
import { Card, Typography, Box } from "@mui/material";
import { Shipper } from "./widgets/Shipper";
import { BarcodeOnTimer } from "./widgets/BarcodeOnTimer/BarcodeOnTimer";
import { CarrierSection } from "./widgets/Carrier";
import { StatusHierarchy } from "./StatusHierarchy";
import { Broker } from "./widgets/Broker";
import { StepProgress } from "./widgets/StepProgress";
import { LiveIndicatorBar } from "./widgets/LiveIndicator/LiveIndicator";
import { FullInfo } from "./components/FullInfo";
import { LiveChat } from "./components/LiveChat";
import { PanicReport } from "./components/PanicReport";

import CustomizedSteppers from "./Stepper";
import { ExpandedBarcode } from "./widgets/BarcodeOnTimer/ExpandedBarcode";

interface FreightCardProps {
  pickupLocation: string;
  pickupTime: string;
  dropoffLocation: string;
  dropoffTime: string;
  shipperInfo: {
    name: string;
    contact: string;
  };
  carrierInfo: {
    name: string;
    vehicleId: string;
  };
  brokerInfo: {
    name: string;
    reference: string;
  };
  trackingId: string;
  price?: {
    amount: number;
    currency: string;
  };
  shipper: {
    id: string;
    name: string;
    avatar: string;
  };
  carrier: {
    id: string;
    name: string;
    avatar: string;
  };
}

export default function FreightCard({
  pickupLocation,
  pickupTime,
  dropoffLocation,
  dropoffTime,
  shipperInfo,
  carrierInfo,
  brokerInfo,
  trackingId,
  price,
  shipper,
}: FreightCardProps) {
  const [showFullInfo, setShowFullInfo] = useState(false);
  const [showExpandedBarcode, setShowExpandedBarcode] = useState(false);
  return (
    <Card
      sx={{
        background: "#fff",
        borderRadius: "24px",
        width: "100%",
        maxWidth: "420px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.06)",
        p: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#2c62cf",
          fontSize: "1.5rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
          opacity: 0.9,
          mb: 2,
        }}
      >
        Validation Ledger
      </Typography>
      <LiveIndicatorBar />

      {/* Status Hierarchy */}
      {price && (
        <Box>
          <StatusHierarchy
            price={price.amount}
            userId={shipper.id}
            userType="shipper"
          />
        </Box>
      )}

      <Box>
        <CustomizedSteppers />
      </Box>

      <Box sx={{ mb: 3 }}>
        <StepProgress
          pickupLocation={pickupLocation}
          pickupTime={pickupTime}
          dropoffLocation={dropoffLocation}
          dropoffTime={dropoffTime}
        />
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          {showFullInfo ? (
            <FullInfo onClick={() => setShowFullInfo(!showFullInfo)} />
          ) : (
            <>
              <WidgetBox>
                <Shipper
                  name={shipperInfo.name}
                  contact={shipperInfo.contact}
                  onClick={() => setShowFullInfo(!showFullInfo)}
                />
              </WidgetBox>
              <WidgetBox>
                <Broker
                  name={brokerInfo.name}
                  reference={brokerInfo.reference}
                  onClick={() => setShowFullInfo(!showFullInfo)}
                />
              </WidgetBox>
            </>
          )}
        </Box>

        <CarrierSection
          carrierInfo={carrierInfo}
          onClick={() => setShowFullInfo(!showFullInfo)}
        />
        {showExpandedBarcode ? (
          <ExpandedBarcode
            trackingId={trackingId}
            onClose={() => setShowExpandedBarcode(false)}
          />
        ) : (
          <Box onClick={() => setShowExpandedBarcode(true)}>
            <BarcodeOnTimer
              trackingId={trackingId}
              onClick={() => setShowExpandedBarcode(true)}
            />
          </Box>
        )}
      </Box>

      {/* New components */}
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <LiveChat />
        <PanicReport />
      </Box>
    </Card>
  );
}

const WidgetBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        py: 1,
        borderRadius: "16px",
        background: "#f6f6f7",
        mb: 1,
        px: 1,
      }}
    >
      {children}
    </Box>
  );
};
