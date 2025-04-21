"use client";

import React, { useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const CreateBOLPage = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      // TODO: Implement file upload logic here
      // For now, we'll just simulate an upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // After successful upload, we'll proceed to the next step
      // This will be where we integrate DocuSeal
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Box sx={{ p: 3, height: "100vh" }}>
      <Paper
        elevation={2}
        sx={{
          height: "100%",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1">
            Upload Bill of Lading
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!file ? (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed",
                borderColor: isDragActive ? "primary.main" : "grey.300",
                borderRadius: 2,
                p: 8,
                width: "100%",
                maxWidth: 500,
                textAlign: "center",
                cursor: "pointer",
                bgcolor: isDragActive ? "action.hover" : "background.paper",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "action.hover",
                  borderColor: "primary.main",
                },
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon
                sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                {isDragActive
                  ? "Drop the file here"
                  : "Drag & drop your BOL file here"}
              </Typography>
              <Typography color="textSecondary">
                or click to select a file
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Supported formats: PDF, PNG, JPG, JPEG
              </Typography>
            </Box>
          ) : (
            <Box sx={{ width: "100%", maxWidth: 500 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CloudUploadIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Typography noWrap sx={{ maxWidth: 300 }}>
                    {file.name}
                  </Typography>
                </Box>
                <IconButton onClick={handleRemoveFile} size="small">
                  <DeleteIcon />
                </IconButton>
              </Paper>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleUpload}
                disabled={uploading}
                startIcon={uploading ? <CircularProgress size={20} /> : null}
              >
                {uploading ? "Uploading..." : "Continue"}
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateBOLPage;
