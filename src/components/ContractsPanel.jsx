import React, { useMemo, useState } from 'react';
import { BadgeCheck, Hash, KeySquare, CheckCircle2 } from 'lucide-react';

const makeHash = () => '0x' + Math.random().toString(16).slice(2).padEnd(8, '0');

const ContractsPanel = ({ selectedLot }) => {
  const [logs, setLogs] = useState([]);
  const lot = selectedLot?.lotID || 'LOT-AX92';

  const pushLog = (type, data = {}) => {
    const entry = { id: crypto.randomUUID(), time: new Date().toISOString(), lot, type, hash: makeHash(), ...data };
    setLogs((l) => [entry, ...l].slice(0, 8));
  };

  const mintNFT = () => pushLog('NutrientPassportNFT:Minted', { tokenId: Math.floor(Math.random() * 1e6) });
  const proofOfUse = () => pushLog('ProofOfUse:Verified', { location: selectedLot?.location || 'Field' });
  const yieldSettlement = () => pushLog('YieldBackedSettlement:Released', { amount: (Math.random() * 50 + 10).toFixed(2) + ' token' });

  const badges = useMemo(() => [
    { label: 'Passport NFT', action: mintNFT, icon: KeySquare },
    { label: 'Proof of Use', action: proofOfUse, icon: CheckCircle2 },
    { label: 'Yield Settlement', action: yieldSettlement, icon: BadgeCheck },
  ], []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Blockchain Smart Contracts</h3>
        <span className="text-xs text-white/70">Lot: {lot}</span>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {badges.map(({ label, action, icon: Icon }) => (
          <button
            key={label}
            onClick={action}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-gradient-to-br from-blue-950/30 to-blue-900/20 p-3 text-left transition hover:border-blue-400/40 hover:bg-blue-900/30"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                <Icon size={18} className="text-blue-300" />
              </span>
              <div className="text-sm font-medium">{label}</div>
            </div>
            <div className="text-[10px] text-white/60">Execute</div>
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 bg-black/20">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-xs text-white/60">
          <Hash size={14} /> On-chain Logs (simulated)
        </div>
        <div className="max-h-40 overflow-auto p-3 text-xs">
          {logs.length === 0 ? (
            <div className="text-white/60">Execute a contract action to see transaction logs…</div>
          ) : (
            <ul className="space-y-2">
              {logs.map((l) => (
                <li key={l.id} className="rounded-lg border border-white/10 bg-white/5 p-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-emerald-300">{l.hash}</span>
                    <span className="text-white/60">{new Date(l.time).toLocaleTimeString()}</span>
                  </div>
                  <div className="mt-1 text-white/90">{l.type}</div>
                  <div className="text-white/60">Lot {l.lot} {l.location ? `@ ${l.location}` : ''} {l.amount ? `• ${l.amount}` : ''}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractsPanel;
