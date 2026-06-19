import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Search, Medal } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';

const leaderboardData = [
  { rank: 1, name: 'PHOENIX_RISING', league: 'DIAMOND', points: 24500, winRate: 72.4, matches: 482, trend: 0 },
  { rank: 2, name: 'GHOST_WALKER', league: 'DIAMOND', points: 23800, winRate: 68.1, matches: 445, trend: 2 },
  { rank: 3, name: 'VIPER_SQUAD', league: 'PLATINUM', points: 22100, winRate: 65.3, matches: 512, trend: -1 },
  { rank: 4, name: 'STORM_BRINGER', league: 'PLATINUM', points: 21500, winRate: 62.7, matches: 398, trend: 5 },
  { rank: 5, name: 'NIGHT_HAWK', league: 'PLATINUM', points: 20900, winRate: 61.2, matches: 367, trend: -2 },
  { rank: 6, name: 'BLAZE_RUNNER', league: 'PLATINUM', points: 20400, winRate: 60.8, matches: 421, trend: 1 },
  { rank: 7, name: 'FROST_BITE', league: 'GOLD', points: 19800, winRate: 59.4, matches: 389, trend: 3 },
  { rank: 8, name: 'IRON_CLAD', league: 'GOLD', points: 19200, winRate: 58.1, matches: 356, trend: -1 },
  { rank: 9, name: 'SHADOW_STRIKE', league: 'GOLD', points: 18700, winRate: 57.3, matches: 334, trend: 0 },
  { rank: 10, name: 'THUNDER_BOLT', league: 'GOLD', points: 18200, winRate: 56.8, matches: 312, trend: 4 },
];

const leagueColors: Record<string, string> = {
  DIAMOND: 'bg-accent-violet/20 text-accent-violet',
  PLATINUM: 'bg-accent-teal/20 text-accent-teal',
  GOLD: 'bg-accent-gold/20 text-accent-gold',
  SILVER: 'bg-[#C0C0C0]/20 text-[#C0C0C0]',
  BRONZE: 'bg-[#CD7F32]/20 text-[#CD7F32]',
};

const medalColors = ['text-accent-amber', 'text-[#C0C0C0]', 'text-[#CD7F32]'];

export default function LeaderboardPage() {
  const [filter, setFilter] = useState('global');
  const [search, setSearch] = useState('');
  const { ref, isInView } = useInView();

  const filters = ['Global', 'Regional', 'Friends', 'Weekly', 'Monthly', 'All-Time'];

  const filtered = leaderboardData.filter(p => 
    search ? p.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-orbitron font-bold text-2xl">GLOBAL LEADERBOARD</h1>
          <p className="text-text-muted text-sm mt-1">Season 7 — Winter Siege</p>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search player..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-glass pl-9 pr-4 py-2 text-sm w-56"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border-subtle overflow-x-auto">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f.toLowerCase())}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
              filter === f.toLowerCase() ? 'text-accent-amber border-b-2 border-accent-amber' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div ref={ref} className="glass-panel overflow-hidden">
        <div className="grid grid-cols-[50px_1fr_90px_80px_60px_80px_50px] gap-2 px-4 py-3 text-[10px] uppercase tracking-wider text-muted border-b border-border-subtle/30">
          <span>Rank</span>
          <span>Player</span>
          <span>League</span>
          <span className="text-right">Points</span>
          <span className="text-right">Win %</span>
          <span className="text-right">Matches</span>
          <span className="text-right">Trend</span>
        </div>
        {filtered.map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.03, duration: 0.22 }}
            className={`grid grid-cols-[50px_1fr_90px_80px_60px_80px_50px] gap-2 px-4 py-2.5 items-center border-b border-border-subtle/20 hover:bg-elevated-2/30 transition-colors ${
              entry.rank <= 3 ? 'bg-elevated-2/20' : ''
            } ${entry.rank <= 3 ? `border-l-2 ${entry.rank === 1 ? 'border-l-accent-amber' : entry.rank === 2 ? 'border-l-[#C0C0C0]' : 'border-l-[#CD7F32]'}` : ''}`}
          >
            <span className={`font-orbitron font-bold text-sm ${entry.rank <= 3 ? medalColors[entry.rank - 1] : 'text-text-muted'}`}>
              {entry.rank <= 3 ? <Medal size={18} className={medalColors[entry.rank - 1]} /> : `#${entry.rank}`}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden">
                <img src="/images/operator-skin-1.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-medium truncate">{entry.name}</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full w-fit ${leagueColors[entry.league]}`}>{entry.league}</span>
            <span className="text-right font-orbitron font-bold text-sm tabular-nums">{entry.points.toLocaleString()}</span>
            <span className="text-right text-xs text-accent-teal">{entry.winRate}%</span>
            <span className="text-right text-xs text-text-muted tabular-nums">{entry.matches}</span>
            <span className="text-right">
              {entry.trend > 0 ? <TrendingUp size={14} className="text-accent-amber inline" /> :
               entry.trend < 0 ? <TrendingDown size={14} className="text-accent-crimson inline" /> :
               <Minus size={14} className="text-text-muted inline" />}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Your Position */}
      <div className="mt-4 glass-panel border-l-2 border-l-accent-teal bg-elevated-2/60 p-4">
        <div className="grid grid-cols-[50px_1fr_90px_80px_60px_80px_50px] gap-2 items-center">
          <span className="font-orbitron font-bold text-accent-teal">#247</span>
          <span className="text-sm font-medium">YOUR POSITION</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold w-fit">GOLD</span>
          <span className="text-right font-orbitron font-bold text-sm text-accent-teal tabular-nums">8,432</span>
          <span className="text-right text-xs text-accent-teal">58.3%</span>
          <span className="text-right text-xs text-text-muted">142</span>
          <span className="text-right"><TrendingUp size={14} className="text-accent-amber inline" /></span>
        </div>
      </div>

      <div className="text-center mt-6">
        <button className="btn-secondary text-xs">LOAD MORE</button>
      </div>
    </div>
  );
}
