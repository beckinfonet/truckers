import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSecureApproval } from "./fingerprints/hooks/useSecureApproval";

interface ConfirmationMethod {
  type: "app" | "text_msg" | "email";
  label: string;
  color: string;
}

interface UserInfo {
  name: string;
  avatar: string;
}

interface Confirmation {
  role: string;
  status: "confirmed" | "pending" | "denied";
  method: ConfirmationMethod;
  user: UserInfo;
}

interface StatusItemProps {
  price: number;
  confirmations: Confirmation[];
  isExpanded: boolean;
  onToggle: () => void;
  onApprove: () => void;
  isApproving: boolean;
}

const CONFIRMATION_METHODS: Record<string, ConfirmationMethod> = {
  app: {
    type: "app",
    label: "app",
    color: "#2c62cf",
  },
  text_msg: {
    type: "text_msg",
    label: "text msg",
    color: "#50C878",
  },
  email: {
    type: "email",
    label: "email",
    color: "#FF8C00",
  },
};

const StatusItem = ({
  price,
  confirmations,
  isExpanded,
  onToggle,
  onApprove,
  isApproving,
}: StatusItemProps) => (
  <Box>
    <Box
      onClick={onToggle}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: isExpanded ? 2 : 0,
        background: "linear-gradient(145deg, #50C878, #3DA164)",
        borderRadius: "10px",
        py: 1.5,
        px: 2,
        color: "white",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 2px 8px rgba(80, 200, 120, 0.2)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          sx={{
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            opacity: 0.9,
          }}
        >
          Rate
        </Typography>
        {!isExpanded && (
          <Typography
            sx={{
              fontSize: "0.7rem",
              opacity: 0.8,
              ml: 1,
              fontStyle: "italic",
            }}
          >
            (click for info)
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {isExpanded ? (
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            ${price.toLocaleString()}
          </Typography>
        ) : (
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            •••••
          </Typography>
        )}
        <IconButton
          size="small"
          sx={{
            color: "white",
            opacity: 0.8,
            p: 0,
            "&:hover": { opacity: 1, background: "transparent" },
          }}
        >
          {isExpanded ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </IconButton>
      </Box>
    </Box>
    {isExpanded && (
      <Box sx={{ mt: 2 }}>
        {confirmations.map((confirmation, index) => (
          <Box
            key={confirmation.role}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: index === confirmations.length - 1 ? 0 : 2,
              background: "white",
              borderRadius: "8px",
              py: 1.5,
              px: 2,
              m: 2,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircleIcon
                  sx={{
                    fontSize: 16,
                    color:
                      confirmation.status === "confirmed"
                        ? "#50C878"
                        : confirmation.status === "denied"
                        ? "#FF0000"
                        : "#ccc",
                    mr: 1,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color:
                      confirmation.status === "denied" ? "#FF0000" : "#333",
                    textTransform: "capitalize",
                    mr: 1,
                  }}
                >
                  {confirmation.role}:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "#666",
                    mr: 1,
                  }}
                >
                  {confirmation.status}
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>
                  {confirmation.status === "pending"
                    ? `as of ${new Date().toLocaleString()}`
                    : "@9:45AM 5/5/2025"}
                </Typography>
              </Box>

              {confirmation.status !== "pending" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      color: "#666",
                      mr: 1,
                    }}
                  >
                    via
                  </Typography>

                  <Box
                    sx={{
                      background: confirmation.method.color,
                      color: "white",
                      fontSize: "0.75rem",
                      px: 1,
                      py: 0.25,
                      borderRadius: "4px",
                      mr: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {confirmation.method.label}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      color: "#666",
                      mr: 1,
                    }}
                  >
                    by
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={confirmation.user.avatar}
                      alt={confirmation.user.name}
                      sx={{ width: 24, height: 24 }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "#333",
                      }}
                    >
                      {confirmation.user.name}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    )}
    {isExpanded && (
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            onApprove();
          }}
          disabled={isApproving}
          sx={{
            background: "linear-gradient(145deg, #50C878, #3DA164)",
            "&:hover": {
              background: "linear-gradient(145deg, #3DA164, #50C878)",
            },
          }}
        >
          {isApproving ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Approve Rate"
          )}
        </Button>
      </Box>
    )}
  </Box>
);

interface StatusHierarchyProps {
  price: number;
  userId: string;
  userType: "shipper" | "carrier";
}

export const StatusHierarchy = ({
  price,
  userId,
  userType,
}: StatusHierarchyProps) => {
  const [isApproving, setIsApproving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [approvalStatuses, setApprovalStatuses] = useState<
    Record<string, "pending" | "confirmed" | "denied">
  >({
    shipper: "pending",
    broker: "pending",
    carrier: "pending",
  });
  const { requestApproval } = useSecureApproval();

  const handleApprove = async (statusId: string) => {
    setIsApproving(true);
    try {
      const approved = await requestApproval(
        userId,
        userType as "shipper" | "carrier",
        {
          type: "rate",
          amount: price,
        }
      );

      setApprovalStatuses((prev) => ({
        ...prev,
        [userType]: approved ? "confirmed" : "denied",
      }));

      if (approved) {
        console.log(`Status ${statusId} approved by ${userId} (${userType})`);
      } else {
        throw new Error("Approval request failed");
      }
    } catch (error) {
      setApprovalStatuses((prev) => ({
        ...prev,
        [userType]: "denied",
      }));
      console.error("Error approving status:", error);
    } finally {
      setIsApproving(false);
    }
  };

  const confirmations: Confirmation[] = [
    {
      role: "shipper",
      status: approvalStatuses.shipper,
      method: CONFIRMATION_METHODS.app,
      user: {
        name: "Jim Forester",
        avatar: "/shipper-avatar.jpg",
      },
    },
    {
      role: "broker",
      status: approvalStatuses.broker,
      method: CONFIRMATION_METHODS.text_msg,
      user: {
        name: "Sarah Johnson",
        avatar: "/broker-avatar.jpg",
      },
    },
    {
      role: "carrier",
      status: approvalStatuses.carrier,
      method: CONFIRMATION_METHODS.email,
      user: {
        name: "Mike Wilson",
        avatar: "/carrier-avatar.jpg",
      },
    },
  ];

  return (
    <Box
      sx={{
        background: "#f8f9fa",
        borderRadius: "12px",
        // p: 2,
        width: "100%",
        mt: 2,
        mb: 3,
      }}
    >
      <StatusItem
        price={price}
        confirmations={confirmations}
        isExpanded={expandedId === "shipper"}
        onToggle={() =>
          setExpandedId(expandedId === "shipper" ? null : "shipper")
        }
        onApprove={() => handleApprove("shipper")}
        isApproving={isApproving}
      />
    </Box>
  );
};
