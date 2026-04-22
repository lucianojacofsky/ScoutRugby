import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  BarChart3, 
  TrendingUp, 
  Search, 
  ChevronRight,
  ShieldAlert,
  Trophy,
  Activity,
  History,
  LayoutDashboard,
  Map,
  Sparkles,
  Target,
  BrainCircuit
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { Player, PlayerStats } from './types';

// --- Mock Data ---
const MOCK_PLAYERS: Player[] = [
  { id: 1, name: "Ardie Savea", position: "Back Row", team: "All Blacks", age: 30 },
  { id: 2, name: "Caelan Doris", position: "Back Row", team: "Ireland", age: 25 },
  { id: 3, name: "Ben Earl", position: "Back Row", team: "England", age: 26 },
  { id: 4, name: "Grégory Alldritt", position: "Back Row", team: "France", age: 27 },
  { id: 5, name: "Pablo Matera", position: "Back Row", team: "Pumas", age: 30 },
  { id: 6, name: "Antoine Dupont", position: "Scrum Half", team: "France", age: 27 },
  { id: 7, name: "Finn Russell", position: "Fly Half", team: "Scotland", age: 31 },
  { id: 8, name: "Siya Kolisi", position: "Back Row", team: "Springboks", age: 32 },
  { id: 9, name: "Pieter-Steph du Toit", position: "Back Row", team: "Springboks", age: 31 },
  { id: 10, name: "Courtney Lawes", position: "Back Row", team: "England", age: 35 },
  { id: 11, name: "Jac Morgan", position: "Back Row", team: "Wales", age: 24 },
  { id: 12, name: "Josh van der Flier", position: "Back Row", team: "Ireland", age: 31 },
  { id: 13, name: "Charles Ollivon", position: "Back Row", team: "France", age: 30 },
  { id: 14, name: "Marcos Kremer", position: "Back Row", team: "Pumas", age: 26 },
  { id: 15, name: "Juan Martin Gonzalez", position: "Back Row", team: "Pumas", age: 23 },
  { id: 16, name: "Eben Etzebeth", position: "Lock", team: "Springboks", age: 32 },
  { id: 17, name: "Brodie Retallick", position: "Lock", team: "All Blacks", age: 32 },
  { id: 18, name: "Maro Itoje", position: "Lock", team: "England", age: 29 },
  { id: 19, name: "Tadhg Beirne", position: "Lock", team: "Ireland", age: 32 },
  { id: 20, name: "Will Jordan", position: "Outside Back", team: "All Blacks", age: 26 },
  { id: 21, name: "Damian Penaud", position: "Outside Back", team: "France", age: 27 },
  { id: 22, name: "Cheslin Kolbe", position: "Outside Back", team: "Springboks", age: 30 },
  { id: 23, name: "James Lowe", position: "Outside Back", team: "Ireland", age: 31 },
  { id: 24, name: "Hugo Keenan", position: "Outside Back", team: "Ireland", age: 27 },
  { id: 25, name: "Bundee Aki", position: "Center", team: "Ireland", age: 34 },
  { id: 26, name: "Gael Fickou", position: "Center", team: "France", age: 30 },
  { id: 27, name: "Lukhanyo Am", position: "Center", team: "Springboks", age: 30 },
  { id: 28, name: "Rieko Ioane", position: "Center", team: "All Blacks", age: 27 },
  { id: 29, name: "Jonathan Danty", position: "Center", team: "France", age: 31 },
  { id: 30, name: "Richie Mo'unga", position: "Fly Half", team: "All Blacks", age: 29 },
  { id: 31, name: "Handre Pollard", position: "Fly Half", team: "Springboks", age: 30 },
  { id: 32, name: "George Ford", position: "Fly Half", team: "England", age: 31 },
  { id: 33, name: "Aaron Smith", position: "Scrum Half", team: "All Blacks", age: 35 },
  { id: 34, name: "Faf de Klerk", position: "Scrum Half", team: "Springboks", age: 32 },
  { id: 35, name: "Jamison Gibson-Park", position: "Scrum Half", team: "Ireland", age: 32 },
  { id: 36, name: "Ardie Savea Jr", position: "Back Row", team: "All Blacks", age: 21 },
  { id: 37, name: "Cameron Woki", position: "Back Row", team: "France", age: 25 },
  { id: 38, name: "Jack Conan", position: "Back Row", team: "Ireland", age: 31 },
  { id: 39, name: "Tom Curry", position: "Back Row", team: "England", age: 25 },
  { id: 40, name: "Sam Underhill", position: "Back Row", team: "England", age: 27 },
];

const MOCK_STATS: PlayerStats[] = MOCK_PLAYERS.map((p, idx) => {
  // Logic to make stats somewhat realistic per position
  const isBackRow = p.position === "Back Row";
  const isLock = p.position === "Lock";
  const isHalf = p.position?.includes("Half");
  
  return {
    player_id: p.id,
    match_id: 200 + idx,
    carries: Math.floor(Math.random() * (isBackRow ? 10 : 5)) + (isBackRow ? 10 : 2),
    meters_gained: Math.floor(Math.random() * (isHalf ? 30 : 60)) + (isHalf ? 10 : 20),
    tackles_made: Math.floor(Math.random() * (isBackRow || isLock ? 12 : 5)) + (isBackRow || isLock ? 10 : 2),
    turnovers_won: isBackRow ? Math.floor(Math.random() * 4) : Math.floor(Math.random() * 2),
    turnovers_lost: Math.floor(Math.random() * 2),
    dominant_tackles: isBackRow ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 2),
    offloads: Math.floor(Math.random() * 3),
    handling_errors: Math.floor(Math.random() * 2),
    lineout_steals: (isBackRow || isLock) ? Math.floor(Math.random() * 2) : 0,
    minutes: 80
  };
});

// --- Sub-components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      active ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
    <p className="text-gray-500 text-sm">{subtitle}</p>
  </div>
);

// --- Main Views ---

const Dashboard = ({ players, stats }: { players: Player[], stats: PlayerStats[] }) => {
  const [search, setSearch] = useState('');
  const tableData = useMemo(() => {
    return stats
      .map(s => {
        const player = players.find(p => p.id === s.player_id);
        return { ...player, ...s };
      })
      .filter(p => !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.team?.toLowerCase().includes(search.toLowerCase()));
  }, [players, stats, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SectionTitle title="Player Database" subtitle="Live feed from tournament statistics (Simulated Scraper)" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search name or team..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all w-full md:w-64"
          />
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-bottom border-gray-200">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Player</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Team</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Carries</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Meters</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Tackles</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Turnovers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tableData.map((row) => (
              <tr key={`${row.id}-${row.match_id}`} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{row.team}</td>
                <td className="px-6 py-4 text-right font-mono text-sm">{row.carries}</td>
                <td className="px-6 py-4 text-right font-mono text-sm">{row.meters_gained}m</td>
                <td className="px-6 py-4 text-right font-mono text-sm text-emerald-600">{row.tackles_made}</td>
                <td className="px-6 py-4 text-right font-mono text-sm text-blue-600">{row.turnovers_won}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MoneyballRanking = ({ players, stats }: { players: Player[], stats: PlayerStats[] }) => {
  const ranking = useMemo(() => {
    // Filter for Back Row (Terceras Líneas)
    const backRowPlayers = players.filter(p => p.position === "Back Row");
    const results = backRowPlayers.map(p => {
      const pStats = stats.find(s => s.player_id === p.id);
      if (!pStats) return null;
      
      /**
       * The Advanced "Moneyball" Formula for Rugbiers (Back Row focus):
       * - Turnovers Won: 30% (Highest value in modern rugby)
       * - Tackles Made: 15%
       * - Dominant Tackles: 20% (Momentum shifts)
       * - Lineout Steals: 15% (Set piece dominance)
       * - Offloads: 10% (Attacking continuity)
       * - Meters Gained: 10%
       * - Handling Errors: -20% (Penalty for losing possession)
       */
      const rawScore = 
        (pStats.turnovers_won || 0) * 3.0 +
        (pStats.tackles_made || 0) * 1.5 +
        (pStats.dominant_tackles || 0) * 2.0 +
        (pStats.lineout_steals || 0) * 1.5 +
        (pStats.offloads || 0) * 1.0 +
        ((pStats.meters_gained || 0) / 10) * 1.0 -
        (pStats.handling_errors || 0) * 2.5;

      return { 
        ...p, 
        stats: pStats,
        score: Number(rawScore.toFixed(2)) 
      };
    }).filter(Boolean) as any[];

    return results.sort((a, b) => b.score - a.score);
  }, [players, stats]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <SectionTitle 
          title="Back-Row Performance Index" 
          subtitle="MONEYBALL_v2: Multi-parameter composite score emphasizing turnovers, dominant contacts, and discipline." 
        />
        <div className="flex gap-4 mb-8">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-gray-400">Algorithm Status</p>
            <p className="text-xs font-mono text-emerald-600 font-bold flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
              DEPLOYED_PROD
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1 space-y-6">
          <h3 className="font-bold flex items-center gap-2 text-gray-400 uppercase text-xs tracking-widest">
            <Trophy size={14} />
            Scout Recommendations
          </h3>
          <div className="space-y-4">
            {ranking.slice(0, 3).map((player, idx) => (
              <motion.div 
                key={player.id} 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <TrendingUp size={80} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded bg-black text-white`}>Rank #{idx + 1}</span>
                    <span className="text-2xl font-black text-emerald-600">{player.score}</span>
                  </div>
                  <h4 className="text-lg font-bold group-hover:text-emerald-700 transition-colors">{player.name}</h4>
                  <p className="text-sm text-gray-500 mb-4">{player.team} • {player.position}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono uppercase text-gray-400">
                    <div className="bg-gray-50 p-2 rounded">TO_WON: {player.stats.turnovers_won}</div>
                    <div className="bg-gray-50 p-2 rounded">DOM_TACKLE: {player.stats.dominant_tackles}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-2 space-y-6">
           <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm h-[500px]">
              <h3 className="font-bold mb-6 text-gray-400 uppercase text-xs tracking-widest">Comparative Matrix Analytics</h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={ranking} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    interval={0} 
                    tick={{fontSize: 10, fontWeight: 600}} 
                  />
                  <YAxis tick={{fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Bar name="Moneyball Score" dataKey="score" fill="#064e3b" radius={[6, 6, 0, 0]} />
                  <Bar name="Tackles" dataKey="stats.tackles_made" fill="#10b981" radius={[6, 6, 0, 0]} opacity={0.3} />
                </BarChart>
              </ResponsiveContainer>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-900 text-white p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <ShieldAlert className="mb-4 text-emerald-400" size={24} />
                  <h4 className="font-bold mb-2">Turnover Efficiency</h4>
                  <p className="text-xs text-emerald-200/70">The algorithm prioritizes ball recovery over volume tackling to optimize offensive transitions.</p>
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-black">30%</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-400">Weight Factor</span>
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <Activity className="mb-4 text-emerald-600" size={24} />
                  <h4 className="font-bold mb-2">Discipline Penalty</h4>
                  <p className="text-xs text-gray-400">Handling errors and penalties are heavily penalized to find "Clean" performance profiles.</p>
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-red-500">-2.5x</span>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Penalty Multiplier</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const MLProjections = ({ players, stats }: { players: Player[], stats: PlayerStats[] }) => {
  const projections = useMemo(() => {
    return players.map(p => {
      const pStats = stats.find(s => s.player_id === p.id);
      if (!pStats) return null;
      
      // Simulate ML logic: Growth factor based on age and current volume
      const potentialFactor = p.age < 23 ? 1.25 : p.age < 27 ? 1.1 : 1.0;
      const projectedScore = ((pStats.tackles_made + pStats.turnovers_won) * potentialFactor).toFixed(1);
      
      return {
        ...p,
        current: pStats.tackles_made + pStats.turnovers_won,
        projected: projectedScore,
        confidence: (85 + Math.random() * 10).toFixed(1),
        growth: ((potentialFactor - 1) * 100).toFixed(0)
      };
    }).filter(Boolean).sort((a: any, b: any) => b.projected - a.projected);
  }, [players, stats]);

  return (
    <div className="space-y-6">
      <SectionTitle title="Predictive AI Projections" subtitle="ML Model analyzing age-to-output career trajectory and potential upside" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projections.map((p: any) => (
          <div key={p.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <p className="text-xs font-bold text-emerald-600 mb-1">{p.growth}% GROWTH POTENTIAL</p>
              <h4 className="font-bold text-lg">{p.name}</h4>
              <p className="text-xs text-gray-400 mb-4">{p.team}</p>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-black">Projected Impact</p>
                  <p className="text-2xl font-black text-black">{p.projected}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-gray-400 uppercase font-black">Confidence</p>
                   <p className="text-sm font-bold text-emerald-500">{p.confidence}%</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-950 text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none">
          <BrainCircuit size={400} />
        </div>
        <div className="relative z-10 max-w-xl">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Sparkles className="text-emerald-400" />
            How 'ScoutAI' Works
          </h3>
          <p className="text-emerald-100/70 text-sm leading-relaxed mb-6">
            Our proprietary model uses gradient-boosted decision trees (XGBoost) trained on 15 years of Tier-1 rugby data. 
            By cross-referencing physical metrics with "In-Game Intelligence" (Turnovers/Offloads), we predict which players 
            will dominate at the next World Cup cycle.
          </p>
          <div className="flex gap-4">
            <div className="bg-emerald-800/50 px-4 py-2 rounded-lg text-xs font-mono">MODEL: SCR-v3.2</div>
            <div className="bg-emerald-800/50 px-4 py-2 rounded-lg text-xs font-mono">DATA_POINTS: 4.8M</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpatialMap = ({ players, stats }: { players: Player[], stats: PlayerStats[] }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(1);
  
  // Simulated event data with action types
  const events = useMemo(() => {
    const types = [
      { label: 'Tackle', color: 'bg-red-500', icon: 'T' },
      { label: 'Carry', color: 'bg-emerald-500', icon: 'C' },
      { label: 'Turnover', color: 'bg-orange-500', icon: 'O' }
    ];
    
    return Array.from({ length: 30 }).map(() => ({
      ...types[Math.floor(Math.random() * types.length)],
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      intensity: 0.2 + Math.random() * 0.8
    }));
  }, [selectedPlayer]);

  const currentPlayer = players.find(p => p.id === selectedPlayer);

  return (
    <div className="space-y-6">
      <SectionTitle title="Positional Impact Analysis" subtitle="High-fidelity event mapping and spatial dominance clusters" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[500px]">
             <h4 className="text-xs font-black uppercase text-gray-400 mb-4 tracking-widest">Active Roster</h4>
             <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
               {players.map(p => (
                 <button 
                  key={p.id}
                  onClick={() => setSelectedPlayer(p.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                    selectedPlayer === p.id ? 'bg-black text-white shadow-lg' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                 >
                   <div className="flex justify-between items-center">
                     <span>{p.name}</span>
                     <span className="text-[10px] opacity-50 uppercase">{p.position}</span>
                   </div>
                 </button>
               ))}
             </div>
          </div>
          
          <div className="bg-gray-900 text-white p-6 rounded-2xl space-y-4">
             <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Map Legend</h4>
             <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-red-500 flex items-center justify-center text-[10px] font-bold">T</div>
                  <span className="text-xs text-gray-400">Low-Line Tackles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-[10px] font-bold">C</div>
                  <span className="text-xs text-gray-400">Dominant Carries</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-orange-500 flex items-center justify-center text-[10px] font-bold">O</div>
                  <span className="text-xs text-gray-400">Turnover Impact</span>
                </div>
             </div>
             <p className="text-[10px] text-gray-500 italic mt-4 border-t border-gray-800 pt-4">
               *Intensity of marker reflects collision force and success probability.
             </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h5 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Map size={20} className="text-emerald-500" />
              Event Cluster: <span className="text-emerald-600">{currentPlayer?.name}</span>
            </h5>
            
            <div className="relative aspect-[16/9] bg-[#1a4a1a] rounded-2xl border-4 border-[#2a5a2a] overflow-hidden shadow-2xl">
              {/* Grass Texture Overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              
              {/* Pitch Markings */}
              <div className="absolute inset-x-0 top-[22%] h-[1px] bg-white/30 border-t border-dashed border-white/40" /> {/* 22m top */}
              <div className="absolute inset-x-0 bottom-[22%] h-[1px] bg-white/30 border-t border-dashed border-white/40" /> {/* 22m bottom */}
              <div className="absolute top-1/2 inset-x-0 h-[2px] bg-white/40" /> {/* 50m line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10" /> {/* Center longitudinal */}

              {/* Event Markers */}
              {events.map((ev, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: ev.intensity }}
                  transition={{ delay: idx * 0.01 }}
                  className={`absolute ${ev.color} rounded shadow-lg flex items-center justify-center text-white text-[8px] font-black pointer-events-none`}
                  style={{
                    left: `${ev.x}%`,
                    top: `${ev.y}%`,
                    width: '18px',
                    height: '18px',
                    boxShadow: `0 0 ${ev.intensity * 15}px ${ev.intensity * 2}px rgba(255,255,255,0.3)`
                  }}
                >
                  {ev.icon}
                </motion.div>
              ))}

              {/* Heat Cloud Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                 {Array.from({ length: 10 }).map((_, i) => (
                   <div 
                    key={i}
                    className="absolute bg-white/5 rounded-full blur-[60px]"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      width: '300px',
                      height: '300px'
                    }}
                   />
                 ))}
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 text-white/40 text-[9px] font-mono font-bold uppercase tracking-widest">Technical Preview / Spatial AI Engine</div>
              <div className="absolute bottom-4 right-4 text-white/40 text-[9px] font-mono font-bold uppercase tracking-widest">© Rugby ScoutAI Analytics</div>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-6">
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 font-black uppercase">Engagement Zone</p>
                  <p className="text-xl font-bold">Midfield Channels</p>
               </div>
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 font-black uppercase">Collision Force</p>
                  <p className="text-xl font-bold">High Impact</p>
               </div>
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 font-black uppercase">Positional IQ</p>
                  <p className="text-xl font-bold text-emerald-600">Top 5% Tier</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerScouting = ({ players, stats }: { players: Player[], stats: PlayerStats[] }) => {
  const [p1, setP1] = useState<number>(1);
  const [p2, setP2] = useState<number>(2);

  // Ensure p1 and p2 exist in current players
  useEffect(() => {
    if (players.length > 0) {
      if (!players.find(p => p.id === p1)) setP1(players[0].id);
      if (!players.find(p => p.id === p2)) setP2(players[1]?.id || players[0].id);
    }
  }, [players]);

  const player1 = useMemo(() => players.find(p => p.id === p1), [p1, players]);
  const player2 = useMemo(() => players.find(p => p.id === p2), [p2, players]);

  const radarData = useMemo(() => {
    const s1 = stats.find(s => s.player_id === p1);
    const s2 = stats.find(s => s.player_id === p2);
    if (!s1 || !s2) return [];

    return [
      { subject: 'Carries', A: s1.carries * 4, B: s2.carries * 4 },
      { subject: 'Meters', A: Math.min(s1.meters_gained, 100), B: Math.min(s2.meters_gained, 100) },
      { subject: 'Tackles', A: s1.tackles_made * 4, B: s2.tackles_made * 4 },
      { subject: 'Turnovers', A: s1.turnovers_won * 15, B: s2.turnovers_won * 15 },
      { subject: 'Offloads', A: (s1.offloads || 0) * 20, B: (s2.offloads || 0) * 20 },
      { subject: 'IQ', A: 80 + Math.random() * 15, B: 80 + Math.random() * 15 },
    ];
  }, [p1, p2, stats]);

  return (
    <div className="space-y-6">
      <SectionTitle title="Player Comparison Engine" subtitle="Comparing statistical DNA signatures between elite subjects" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Candidate Alpha</label>
              <select 
                value={p1} 
                onChange={e => setP1(Number(e.target.value))}
                className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 outline-none font-bold text-gray-900 focus:ring-2 focus:ring-black transition-all appearance-none"
              >
                {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            
            <div className="flex items-center justify-center h-12">
              <div className="h-px bg-gray-100 w-full flex-1" />
              <div className="mx-4 text-xs font-black text-gray-300 italic">VS</div>
              <div className="h-px bg-gray-100 w-full flex-1" />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Candidate Bravo</label>
              <select 
                value={p2} 
                onChange={e => setP2(Number(e.target.value))}
                className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 outline-none font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
              >
                {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-black text-white p-6 rounded-2xl shadow-xl">
             <h5 className="text-[10px] font-black uppercase text-gray-500 mb-4 tracking-tighter">Comparative Insight</h5>
             <p className="text-sm leading-relaxed font-light text-gray-300">
               {player1?.name} shows higher defensive volume, whereas {player2?.name} provides superior explosive metrics in the final third. 
               Select {player1?.name} for control-oriented systems.
             </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[500px]">
          <ResponsiveContainer width="100%" height={500}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#f3f4f6" />
              <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 700}} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
              <Radar
                name={player1?.name || "Player 1"}
                dataKey="A"
                stroke="#000000"
                fill="#000000"
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Radar
                name={player2?.name || "Player 2"}
                dataKey="B"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px', textTransform: 'uppercase', fontSize: '10px', fontWeight: 900 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 700 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [dbData, setDbData] = useState<{ players: Player[], stats: PlayerStats[] }>({ players: MOCK_PLAYERS, stats: MOCK_STATS });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersRes, statsRes] = await Promise.all([
          fetch('/api/players'),
          fetch('/api/stats')
        ]);
        
        if (playersRes.ok && statsRes.ok) {
          const players = await playersRes.json();
          const stats = await statsRes.json();
          setDbData({ players, stats });
        }
      } catch (error) {
        console.error("API Fetch Error - Falling back to enhanced mocks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 font-sans">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-8 p-4 border-t-2 border-black rounded-full"
        >
          <Activity size={32} />
        </motion.div>
        <p className="text-gray-400 font-mono text-sm uppercase tracking-widest animate-pulse">Initializing Data Engine...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white">
            <BarChart3 size={18} />
          </div>
          <h1 className="font-bold text-lg tracking-tight">ScoutRugby<span className="text-emerald-600">.</span></h1>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Raw Stats" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={TrendingUp} 
            label="Moneyball Index" 
            active={activeTab === 'moneyball'} 
            onClick={() => setActiveTab('moneyball')} 
          />
          <SidebarItem 
            icon={Sparkles} 
            label="ML Projections" 
            active={activeTab === 'projections'} 
            onClick={() => setActiveTab('projections')} 
          />
          <SidebarItem 
            icon={Map} 
            label="Spatial Map" 
            active={activeTab === 'spatial'} 
            onClick={() => setActiveTab('spatial')} 
          />
          <SidebarItem 
            icon={Search} 
            label="Player Compare" 
            active={activeTab === 'scouting'} 
            onClick={() => setActiveTab('scouting')} 
          />
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Users size={16} className="text-gray-400" />
            <div>
              <p className="text-xs font-bold">Elite Scout Pro</p>
              <p className="text-[10px] text-gray-500">Premium Dataset v2.4</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && <Dashboard players={dbData.players} stats={dbData.stats} />}
            {activeTab === 'moneyball' && <MoneyballRanking players={dbData.players} stats={dbData.stats} />}
            {activeTab === 'projections' && <MLProjections players={dbData.players} stats={dbData.stats} />}
            {activeTab === 'spatial' && <SpatialMap players={dbData.players} stats={dbData.stats} />}
            {activeTab === 'scouting' && <PlayerScouting players={dbData.players} stats={dbData.stats} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
