import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Box, Paper, Collapse } from "@mui/material";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import SwipeRightOutlinedIcon from "@mui/icons-material/SwipeRightOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import WhereToVoteOutlinedIcon from "@mui/icons-material/WhereToVoteOutlined";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { StepHistory, StepChange } from "./types";
import { CustomizedBadges } from "./Changeindicator";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg, #3DA164 0%, #50C878 50%, #3DA164 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg, #3DA164 0%, #50C878 50%, #3DA164 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          "linear-gradient( 136deg, #3DA164 0%, #50C878 50%, #3DA164 100%)",
        boxShadow: "0 4px 10px 0 rgba(80, 200, 120, 0.25)",
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          "linear-gradient( 136deg, #3DA164 0%, #50C878 50%, #3DA164 100%)",
      },
    },
  ],
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: <RequestQuoteOutlinedIcon />,
    3: <AddTaskOutlinedIcon />,
    2: <SwipeRightOutlinedIcon />,
    4: <WhereToVoteOutlinedIcon />,
  };

  return (
    <CustomizedBadges badgeContent={2}>
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    </CustomizedBadges>
  );
}

const mockStepHistory: StepHistory[] = [
  {
    stepIndex: 0,
    label: "Quote created by shipper",
    changes: [
      {
        timestamp: "2024-03-20T10:00:00Z",
        description: "Initial quote created",
        user: { name: "John Doe", role: "shipper" },
        changeType: "creation",
        details: {
          field: "rate",
          newValue: "$2,500",
        },
      },
      {
        timestamp: "2024-03-20T10:30:00Z",
        description: "Rate adjusted",
        user: { name: "John Doe", role: "shipper" },
        changeType: "modification",
        details: {
          field: "rate",
          oldValue: "$2,500",
          newValue: "$2,700",
        },
      },
    ],
  },
  {
    stepIndex: 1,
    label: "Quote accepted by broker",
    changes: [
      {
        timestamp: "2024-03-20T11:00:00Z",
        description: "Quote accepted with modification",
        user: { name: "Sarah Johnson", role: "broker" },
        changeType: "acceptance",
        details: {
          field: "delivery_date",
          oldValue: "2024-04-08 03:00 PM",
          newValue: "2024-04-08 05:37 PM",
        },
      },
    ],
  },
  {
    stepIndex: 2,
    label: "Quote accepted by carrier",
    changes: [
      {
        timestamp: "2024-03-20T12:00:00Z",
        description: "Quote accepted",
        user: { name: "Mike Wilson", role: "carrier" },
        changeType: "acceptance",
      },
    ],
  },
  {
    stepIndex: 3,
    label: "Load dropped",
    changes: [],
  },
];

const HistoryPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
}));

const ChangeItem = ({ change }: { change: StepChange }) => (
  <Box sx={{ mb: 2, "&:last-child": { mb: 0 } }}>
    <Typography variant="subtitle2" sx={{ color: "#666", fontSize: "0.75rem" }}>
      {new Date(change.timestamp).toLocaleString()}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
      {change.description}
    </Typography>
    {change.details && (
      <Box
        sx={{
          bgcolor: "white",
          p: 1,
          borderRadius: 1,
          border: "1px solid #e0e0e0",
        }}
      >
        {change.details.field && (
          <Typography variant="body2" sx={{ color: "#666" }}>
            Field: {change.details.field}
          </Typography>
        )}
        {change.details.oldValue && (
          <Typography
            variant="body2"
            sx={{ color: "#666", textDecoration: "line-through" }}
          >
            {change.details.oldValue}
          </Typography>
        )}
        {change.details.newValue && (
          <Typography variant="body2" sx={{ color: "#2c62cf" }}>
            {change.details.newValue}
          </Typography>
        )}
      </Box>
    )}
    <Typography variant="caption" sx={{ color: "#666" }}>
      by {change.user.name} ({change.user.role})
    </Typography>
  </Box>
);

export default function CustomizedSteppers() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const handleStepClick = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
      <Stepper
        alternativeLabel
        activeStep={2}
        connector={<ColorlibConnector />}
      >
        {mockStepHistory.map((step, index) => (
          <Step
            key={index}
            onClick={() => handleStepClick(index)}
            sx={{ cursor: "pointer" }}
          >
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <Typography sx={{ fontSize: "0.7rem" }}>{step.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {mockStepHistory.map((step, index) => (
        <Collapse key={index} in={expandedStep === index} unmountOnExit>
          <HistoryPaper>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "0.9rem", fontWeight: 600 }}
            >
              History for {step.label}
            </Typography>
            {step.changes.length > 0 ? (
              step.changes.map((change, changeIndex) => (
                <ChangeItem key={changeIndex} change={change} />
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "#666" }}>
                No changes recorded for this step
              </Typography>
            )}
          </HistoryPaper>
        </Collapse>
      ))}
    </Stack>
  );
}
