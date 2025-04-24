"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

const requiredDocs = [
  {
    id: 1,
    name: "Carrier Authority",
    description: "MC Authority Letter or Certificate",
    required: true,
  },
  {
    id: 2,
    name: "Insurance Certificate",
    description: "Proof of Insurance Coverage (minimum $750,000 liability)",
    required: true,
  },
  {
    id: 3,
    name: "W-9 Form",
    description: "Tax Identification Form",
    required: true,
  },
  {
    id: 4,
    name: "Safety Rating",
    description: "DOT Safety Rating Certificate",
    required: true,
  },
];

type DocumentsUploadFormProps = {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
};

export default function DocumentsUploadForm({
  data,
  onNext,
  onBack,
}: DocumentsUploadFormProps) {
  const [uploadStatus, setUploadStatus] = useState<
    Record<string, "pending" | "success" | "error">
  >({});
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (docId: string, file: File) => {
    setUploadStatus((prev) => ({ ...prev, [docId]: "pending" }));
    setUploading(true);

    try {
      // TODO: Implement actual file upload to your storage service
      // Example:
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData
      // });

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setUploadStatus((prev) => ({ ...prev, [docId]: "success" }));
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus((prev) => ({ ...prev, [docId]: "error" }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    const allDocsUploaded = requiredDocs
      .filter((doc) => doc.required)
      .every((doc) => uploadStatus[doc.id] === "success");

    if (!allDocsUploaded) {
      alert("Please upload all required documents");
      return;
    }

    onNext({ documents: uploadStatus });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Required Documents
      </Typography>

      <List>
        {requiredDocs.map((doc) => (
          <Paper
            key={doc.id}
            elevation={0}
            sx={{
              mb: 2,
              p: 2,
              backgroundColor:
                uploadStatus[doc.id] === "success" ? "#f0f7f0" : "white",
              border: "1px solid",
              borderColor:
                uploadStatus[doc.id] === "success" ? "#c8e6c9" : "#e0e0e0",
              borderRadius: 1,
            }}
          >
            <ListItem
              secondaryAction={
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<UploadIcon />}
                  disabled={uploading || uploadStatus[doc.id] === "success"}
                >
                  Upload
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(doc.id.toString(), file);
                      }
                    }}
                  />
                </Button>
              }
            >
              <ListItemIcon>
                {uploadStatus[doc.id] === "success" && (
                  <CheckIcon color="success" />
                )}
                {uploadStatus[doc.id] === "error" && (
                  <ErrorIcon color="error" />
                )}
                {uploadStatus[doc.id] === "pending" && (
                  <CircularProgress size={24} />
                )}
              </ListItemIcon>
              <ListItemText primary={doc.name} secondary={doc.description} />
            </ListItem>
          </Paper>
        ))}
      </List>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" onClick={onBack} size="large">
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          size="large"
          disabled={uploading}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
