import React, { useEffect, useState } from 'react';
import { Gauge, Thermometer, Wifi, Battery, BadgeCheck } from 'lucide-react';

const randomBetween = (min, max) => Math.round(min + Math.random() * (max - min));

const IoTAndESG = ({ selectedLot, onProofOk }) => {
  const [telemetry, setTelemetry] = useState({
    humidity: 48,
    temperature: 27,
    stock: 220,
    signal: -72,
    carbon: 0.42,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setTelemetry((t) => ({
        ...t,
        humidity: randomBetween(35, 65),
        temperature: randomBetween(18, 36),
        stock: Math.max(0, t.stock + randomBetween(-3, 2)),
        signal: -1 * randomBetween(58, 85),
      }));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!selectedLot) return;
    setTelemetry((t) => ({ ...t, stock: selectedLot.stock }));
  }, [selectedLot]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur">
        <div className="mb-3 text-lg font-semibold">IoT Telemetry</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-3">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span className="flex items-center gap-2"><Gauge size={16}/>Humidity</span>
              <span>{telemetry.humidity}%</span>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-3">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span className="flex items-center gap-2"><Thermometer size={16}/>Temp</span>
              <span>{telemetry.temperature}°C</span>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-3">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span className="flex items-center gap-2"><Battery size={16}/>Stock</span>
              <span>{telemetry.stock} bags</span>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-3">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span className="flex items-center gap-2"><Wifi size={16}/>Signal</span>
              <span>{telemetry.signal} dBm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur">
        <div className="mb-3 text-lg font-semibold">Carbon & ESG Tracker</div>
        <div className="grid gap-3">
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Per-lot Carbon Intensity</span>
              <span className="font-semibold text-emerald-300">{telemetry.carbon} kg CO₂e/kg</span>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
            MRV Compliance: Verified by Auditor Chain
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            <BadgeCheck size={16} /> ESG Badge: Scope 1+2 Reported • Renewable Energy Credits Attached
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTAndESG;
