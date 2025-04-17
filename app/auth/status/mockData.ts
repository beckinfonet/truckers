export interface Status {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isApproved: boolean;
}

export const mockStatuses: Status[] = [
  {
    id: "1",
    title: "Shipment Initiated",
    description: "The shipment has been initiated and is pending approval.",
    timestamp: "2024-03-20T10:00:00Z",
    isApproved: false,
  },
  {
    id: "2",
    title: "Documentation Complete",
    description: "All required documentation has been submitted and verified.",
    timestamp: "2024-03-20T11:30:00Z",
    isApproved: false,
  },
  {
    id: "3",
    title: "Customs Clearance",
    description: "Shipment is awaiting customs clearance approval.",
    timestamp: "2024-03-20T14:15:00Z",
    isApproved: false,
  },
];
