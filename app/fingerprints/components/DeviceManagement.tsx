import React, { useState, useEffect, useMemo } from "react";
import { RegisteredDevice } from "../types";
import { DeviceCard } from "../components/DeviceCard";
import { DeviceRegistrationService } from "../services/DeviceRegistrationService";

const DeviceManagement: React.FC = () => {
  const [devices, setDevices] = useState<RegisteredDevice[]>([]);
  const deviceService = useMemo(() => new DeviceRegistrationService(), []);

  useEffect(() => {
    const loadDevices = async () => {
      const device = await deviceService.registerDevice("user123", "shipper");
      setDevices([device]);
    };
    loadDevices();
  }, [deviceService]);

  const handleDeactivate = async (deviceId: string) => {
    // TODO: Call actual deactivate API
    setDevices(devices.filter((d) => d.id !== deviceId));
  };

  return (
    <div>
      <h2>Registered Devices</h2>
      {devices.map((device) => (
        <DeviceCard
          key={device.id}
          device={device}
          onDeactivate={handleDeactivate}
        />
      ))}
    </div>
  );
};

export default DeviceManagement;
