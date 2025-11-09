import React, { useCallback, useState } from 'react';
import HeroCover from './components/HeroCover';
import TraceabilityMap from './components/TraceabilityMap';
import ContractsPanel from './components/ContractsPanel';
import ForecastAndNDVI from './components/ForecastAndNDVI';
import IoTAndESG from './components/IoTAndESG';

function App() {
  const [selectedLot, setSelectedLot] = useState(null);

  const handleNdviCheck = useCallback((value) => {
    if (value > 0.62) {
      // Could notify contracts panel via events/state bus; simple alert for demo
      console.log('NDVI threshold met, settlement can be released');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1020] px-4 py-6 text-white md:px-8 md:py-8">
      <header className="mb-6">
        <div className="mb-3 text-xs text-white/60">FertiChain.AI</div>
        <HeroCover />
      </header>

      <main className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <TraceabilityMap onSelectLot={setSelectedLot} />
          </div>
          <div>
            <ContractsPanel selectedLot={selectedLot} />
          </div>
        </div>

        <ForecastAndNDVI onNdviCheck={handleNdviCheck} />

        <IoTAndESG selectedLot={selectedLot} />
      </main>

      <footer className="mt-10 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/60">
        <span>© 2025 FertiChain.AI • Flame Blue Industrial Intelligence</span>
        <span>AI • IoT • NDVI • Blockchain</span>
      </footer>
    </div>
  );
}

export default App;
