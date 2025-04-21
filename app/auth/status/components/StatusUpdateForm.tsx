import React, { useRef, useState } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { Image as ImageIcon, Plus, Send, X } from "lucide-react";

interface StatusUpdateFormProps {
  onSubmit: (status: string, images: File[]) => void;
}

const StatusUpdateForm: React.FC<StatusUpdateFormProps> = ({ onSubmit }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    // Create preview URLs for the new images
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
  };

  const handleImageDelete = (index: number) => {
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewImages[index]);

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (status.trim() || selectedFiles.length > 0) {
      onSubmit(status.trim(), selectedFiles);
      setStatus("");
      setSelectedFiles([]);
      // Cleanup preview URLs
      previewImages.forEach((url) => URL.revokeObjectURL(url));
      setPreviewImages([]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 2,
          color: "#333",
          fontWeight: 500,
        }}
      >
        Update Status
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={2}
        placeholder="Enter your status update..."
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Image Upload Section */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
            color: "#666",
            fontWeight: 500,
          }}
        >
          <ImageIcon size={18} />
          Add Photos
        </Typography>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          multiple
          style={{ display: "none" }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1.5,
          }}
        >
          {/* Upload Button */}
          <Box
            onClick={triggerFileInput}
            sx={{
              position: "relative",
              paddingTop: "100%",
              borderRadius: "8px",
              border: "2px dashed #ccc",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: "#1976d2",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
              }}
            >
              <Plus size={24} />
              <Typography variant="caption" sx={{ mt: 1 }}>
                Add Photo
              </Typography>
            </Box>
          </Box>

          {/* Preview Images */}
          {previewImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                paddingTop: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <IconButton
                onClick={() => handleImageDelete(index)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "rgba(255,255,255,0.8)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
                size="small"
              >
                <X size={16} />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!status.trim() && selectedFiles.length === 0}
        startIcon={<Send size={16} />}
        sx={{
          mt: 2,
          bgcolor: "#1976d2",
          "&:hover": {
            bgcolor: "#1565c0",
          },
        }}
      >
        Update Status!
      </Button>
    </Box>
  );
};

export default StatusUpdateForm;
