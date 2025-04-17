import React from "react";
import { RegisteredDevice } from "../types";

interface DeviceCardProps {
  device: RegisteredDevice;
  onDeactivate: (deviceId: string) => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  onDeactivate,
}) => {
  return (
    <div>
      <h3>Device {device.id}</h3>
      <p>Last used: {device.lastUsed.toLocaleDateString()}</p>
      <button onClick={() => onDeactivate(device.id)}>Deactivate</button>
    </div>
  );
};
