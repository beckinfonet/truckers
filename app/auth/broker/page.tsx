"use client";
import React, { useState } from "react";
import { Box, Paper, Tabs, Tab, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useRouter } from "next/navigation";
// import BOLForm from "@/app/components/BOLForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`bol-tabpanel-${index}`}
      aria-labelledby={`bol-tab-${index}`}
      style={{ height: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ height: "100%" }}>{children}</Box>}
    </div>
  );
}

const BrokerPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ height: "100vh", p: 3 }}>
      <Paper
        elevation={2}
        sx={{
          height: "100%",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ px: 3, pt: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Bill of Lading Management
          </Typography>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="BOL management tabs"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab
              icon={<AddIcon />}
              label="CREATE NEW BOL"
              iconPosition="start"
              sx={{
                textTransform: "uppercase",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            />
            <Tab
              icon={<ListAltIcon />}
              label="MANAGE BOLS"
              iconPosition="start"
              sx={{
                textTransform: "uppercase",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            />
          </Tabs>
        </Box>

        <Box sx={{ flex: 1, height: "100%", overflowY: "auto" }}>
          <TabPanel value={tabValue} index={0}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: 3,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Create a New Bill of Lading
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Fill out the Bill of Lading form below
              </Typography>
              {/* <BOLForm
                onSubmit={(data) => {
                  console.log("BOL Form Data:", data);
                  // Here you can handle the form data, e.g., save it to your backend
                }}
              /> */}
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Manage Existing Bills of Lading
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                View, edit, and manage your existing Bills of Lading
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<ListAltIcon />}
                sx={{ textTransform: "uppercase", px: 4 }}
              >
                View All BOLs
              </Button>
            </Box>
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
};

export default BrokerPage;
