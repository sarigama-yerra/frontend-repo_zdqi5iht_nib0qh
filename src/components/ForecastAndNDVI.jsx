import React, { useMemo, useState } from 'react';
import { Activity, BarChart4 } from 'lucide-react';

const dummyForecast = {
  weeks: Array.from({ length: 8 }, (_, i) => `W${i + 1}`),
  series: [
    { name: 'North', color: '#60A5FA', data: [120, 130, 150, 160, 170, 180, 190, 210] },
    { name: 'Central', color: '#34D399', data: [100, 110, 115, 120, 140, 160, 170, 175] },
  ],
  metrics: { MAPE: 6.4, accuracy: 93.2, confidence: 0.88 },
};

const ndviRange = () => (Math.random() * 0.5 + 0.35).toFixed(2);

const ForecastAndNDVI = ({ onNdviCheck }) => {
  const [ndvi, setNdvi] = useState(parseFloat(ndviRange()));

  const bounds = useMemo(() => {
    const all = dummyForecast.series.flatMap((s) => s.data);
    const min = Math.min(...all) - 10;
    const max = Math.max(...all) + 10;
    return { min, max };
  }, []);

  const pointsFor = (arr, idxOffset = 0) => {
    const w = 420;
    const h = 180;
    const pad = 28;
    const step = (w - pad * 2) / (arr.length - 1);
    const normY = (v) => pad + (h - pad * 2) * (1 - (v - bounds.min) / (bounds.max - bounds.min));
    return arr.map((v, i) => `${pad + i * step},${normY(v)}`).join(' ');
  };

  const runNdvi = () => {
    const v = parseFloat(ndviRange());
    setNdvi(v);
    onNdviCheck?.(v);
  };

  const yieldEstimate = useMemo(() => (2 + (ndvi - 0.35) * (8 - 2) / (0.85 - 0.35)).toFixed(1), [ndvi]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-semibold"><BarChart4 size={18} className="text-blue-300"/>AI Demand Sensing</h3>
          <div className="text-xs text-white/70">MAPE {dummyForecast.metrics.MAPE}% • Acc {dummyForecast.metrics.accuracy}% • Conf {(dummyForecast.metrics.confidence*100).toFixed(0)}%</div>
        </div>
        <div className="h-52 w-full">
          <svg viewBox="0 0 420 180" className="h-full w-full">
            <defs>
              <linearGradient id="grid" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(148,163,184,0.15)" />
                <stop offset="100%" stopColor="rgba(148,163,184,0.05)" />
              </linearGradient>
            </defs>
            {Array.from({ length: 4 }, (_, i) => (
              <line key={i} x1="28" x2="392" y1={28 + i * 40} y2={28 + i * 40} stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
            ))}
            {dummyForecast.series.map((s, idx) => (
              <polyline key={s.name} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" points={pointsFor(s.data, idx)} />
            ))}
            {dummyForecast.series.map((s) =>
              s.data.map((v, i) => {
                const pts = pointsFor(s.data).split(' ')[i].split(',');
                return <circle key={`${s.name}-${i}`} cx={parseFloat(pts[0])} cy={parseFloat(pts[1])} r="2.5" fill={s.color} />;
              })
            )}
          </svg>
          <div className="mt-2 flex items-center gap-4 text-xs text-white/70">
            {dummyForecast.series.map((s) => (
              <div key={s.name} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: s.color }} />{s.name}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-semibold"><Activity size={18} className="text-emerald-300"/>NDVI / EO Analytics</h3>
          <button onClick={runNdvi} className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200 transition hover:bg-emerald-500/20">Run NDVI Check</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <div className="relative h-40 w-full overflow-hidden rounded-lg border border-white/10">
              <svg viewBox="0 0 400 180" className="h-full w-full">
                <defs>
                  <linearGradient id="ndviGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                {[...Array(8)].map((_, i) => (
                  <rect key={i} x={i * 50} y={20 + Math.random() * 40} width="45" height={100 + Math.random() * 30} fill="url(#ndviGrad)" opacity={0.35} />
                ))}
                <circle cx={60} cy={60} r={4} fill="#fff" />
                <text x={70} y={64} fontSize="10" fill="#e5e7eb">Sample A</text>
                <circle cx={260} cy={120} r={4} fill="#fff" />
                <text x={270} y={124} fontSize="10" fill="#e5e7eb">Sample B</text>
              </svg>
            </div>
          </div>
          <div className="space-y-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-sm">
              <div className="text-white/70">NDVI</div>
              <div className="text-2xl font-semibold text-emerald-300">{ndvi.toFixed(2)}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-sm">
              <div className="text-white/70">Yield Estimate</div>
              <div className="text-xl font-semibold text-emerald-200">{yieldEstimate} t/ha</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-sm">
              <div className="text-white/70">Threshold</div>
              <div className="text-white">0.62</div>
            </div>
          </div>
        </div>
        <div className="mt-3 text-xs text-white/70">Values simulated between 0.35–0.85. Settlement triggers when NDVI exceeds 0.62.</div>
      </div>
    </div>
  );
};

export default ForecastAndNDVI;
