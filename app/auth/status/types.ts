export interface StepChange {
  timestamp: string;
  description: string;
  user: {
    name: string;
    role: "shipper" | "broker" | "carrier";
  };
  changeType: "creation" | "modification" | "acceptance";
  details?: {
    field?: string;
    oldValue?: string;
    newValue?: string;
  };
}

export interface StepHistory {
  stepIndex: number;
  label: string;
  changes: StepChange[];
}
