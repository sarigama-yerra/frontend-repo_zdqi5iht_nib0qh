import React from 'react';
import Spline from '@splinetool/react-spline';
import { Shield, Leaf, Map } from 'lucide-react';

const HeroCover = () => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1020]/20 via-[#0b1020]/40 to-[#0b1020] pointer-events-none" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs backdrop-blur">
          <Shield size={14} className="text-blue-400" />
          <span className="tracking-wide">FertiChain.AI — Industrial ESG • AI • Blockchain</span>
        </div>
        <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">
          Smart Fertilizer Supply Chain with AI Forecasting, IoT, NDVI & Blockchain Traceability
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-white/80 md:text-base">
          Track lots from factory to field, verify usage, and trigger yield‑backed settlements with on‑chain transparency.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-500 hover:to-blue-300">
            <Map size={16} />
            Open Traceability
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur transition hover:bg-white/10">
            <Leaf size={16} className="text-emerald-300" />
            Run NDVI Check
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCover;
