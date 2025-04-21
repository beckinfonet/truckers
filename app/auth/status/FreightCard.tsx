"use client";
import React, { useState } from "react";
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
import StatusDisplay from "./components/StatusDisplay";
import StatusDetails from "./components/StatusDetails";

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

interface StatusState {
  status: string;
  notes?: string;
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
    state: string;
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
  const [showStatusDetails, setShowStatusDetails] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<StatusState>({
    status: "In Transit",
    timestamp: "2025/04/20 19:40:06",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      city: "Los Angeles",
      state: "CA",
    },
  });

  const handleStatusUpdate = async (
    status: string,
    notes: string,
    images: File[]
  ) => {
    try {
      // Here you would typically:
      // 1. Upload the images to your storage service
      // 2. Send the status update, notes, and image URLs to your backend
      // 3. Update the local state with the new status

      // For now, we'll just update the local state
      setCurrentStatus((prev) => ({
        ...prev,
        status,
        notes,
        timestamp: new Date().toISOString().replace("T", " ").split(".")[0],
      }));

      // Close the status details view after successful update
      setShowStatusDetails(false);

      // Log the update (remove in production)
      console.log("Status updated:", { status, notes, images });
    } catch (error) {
      console.error("Error updating status:", error);
      // Here you would typically show an error message to the user
    }
  };

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

      {/* Status Section */}
      {price && (
        <Box sx={{ mb: 3 }}>
          <StatusHierarchy
            price={price.amount}
            userId={shipper.id}
            userType="shipper"
          />
          <Box
            sx={{
              mt: 2,
              backgroundColor: "#f1f3f5",
              borderRadius: "16px",
              p: 2,
            }}
          >
            <Box onClick={() => setShowStatusDetails(!showStatusDetails)}>
              <StatusDisplay
                currentStatus={currentStatus.status}
                timestamp={currentStatus.timestamp}
                location={currentStatus.location}
                onClick={() => setShowStatusDetails(!showStatusDetails)}
              />
            </Box>
            {showStatusDetails && (
              <StatusDetails
                status={currentStatus.status}
                timestamp={currentStatus.timestamp}
                location={currentStatus.location}
                onClose={() => setShowStatusDetails(false)}
                onStatusUpdate={handleStatusUpdate}
              />
            )}
          </Box>
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
