import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Truck, Factory, ScanLine, QrCode } from 'lucide-react';

const dummyTraceability = [
  { id: 1, lotID: 'LOT-AX92', role: 'Factory', location: 'Urea Plant A', date: '2025-06-01', humidity: 42, stock: 1000, lat: 23.02, lon: 72.57 },
  { id: 2, lotID: 'LOT-AX92', role: 'Distributor', location: 'Delta Agro Hub', date: '2025-06-03', humidity: 46, stock: 640, lat: 22.30, lon: 73.18 },
  { id: 3, lotID: 'LOT-AX92', role: 'Kiosk', location: 'Village Input Kiosk 7', date: '2025-06-05', humidity: 51, stock: 220, lat: 22.08, lon: 73.45 },
  { id: 4, lotID: 'LOT-AX92', role: 'Farmer', location: 'Field #29', date: '2025-06-06', humidity: 55, stock: 0, lat: 22.05, lon: 73.49 },
];

const roleIcon = (role) => {
  switch (role) {
    case 'Factory':
      return <Factory size={16} />;
    case 'Distributor':
      return <Truck size={16} />;
    case 'Kiosk':
      return <ScanLine size={16} />;
    default:
      return <MapPin size={16} />;
  }
};

const TraceabilityMap = ({ onSelectLot }) => {
  const [active, setActive] = useState(dummyTraceability[0]);

  useEffect(() => {
    onSelectLot?.(active);
  }, [active, onSelectLot]);

  const route = useMemo(() => dummyTraceability, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Traceability Route</h3>
        <div className="text-xs text-white/70">Lot: {active.lotID}</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-3">
          {route.map((node) => (
            <button
              key={node.id}
              onClick={() => setActive(node)}
              className={`w-full rounded-xl border p-3 text-left transition ${
                active.id === node.id
                  ? 'border-blue-400/40 bg-blue-500/10'
                  : 'border-white/10 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/5">
                    {roleIcon(node.role)}
                  </span>
                  <div>
                    <div className="text-sm font-medium">{node.role}</div>
                    <div className="text-xs text-white/70">{node.location}</div>
                  </div>
                </div>
                <div className="text-right text-xs text-white/70">
                  <div>{node.date}</div>
                  <div>Hum: {node.humidity}% • Stock: {node.stock}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="relative min-h-[220px] rounded-xl border border-white/10 bg-gradient-to-br from-blue-950/50 via-blue-900/30 to-emerald-900/30 p-3">
          <div className="absolute inset-0 pointer-events-none rounded-xl bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.2),transparent_60%)]" />
          <div className="relative z-10 h-full w-full">
            <svg viewBox="0 0 400 240" className="h-full w-full">
              {/* path */}
              <polyline
                points="20,30 150,80 250,120 360,180"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </defs>
              {route.map((node, idx) => {
                const coords = [
                  [20, 30],
                  [150, 80],
                  [250, 120],
                  [360, 180],
                ][idx];
                return (
                  <g key={node.id}>
                    <circle
                      cx={coords[0]}
                      cy={coords[1]}
                      r={active.id === node.id ? 8 : 6}
                      fill={active.id === node.id ? '#60A5FA' : '#93C5FD'}
                      className="transition-all"
                    />
                    <text x={coords[0] + 10} y={coords[1] + 4} fontSize="10" fill="#cbd5e1">
                      {node.role}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="relative z-10 mt-2 flex items-center justify-between text-xs text-white/80">
            <div className="flex items-center gap-2"><QrCode size={14} /> QR/NFC: {active.lotID}</div>
            <div>Beacon: OK • Signal -72 dBm</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraceabilityMap;
