import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Gamepad2, ChevronRight, CheckCircle, Lock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import { useInView } from '@/hooks/useScrollAnimation';

// --- MOCK DATA ---
const recentMatches = [
  { id: 1, mode: 'Ranked', map: 'Desert Storm', result: 'win' as const, k: 12, d: 4, a: 6, score: 2500, date: '2m ago' },
  { id: 2, mode: 'Squad', map: 'Urban Warfare', result: 'win' as const, k: 8, d: 6, a: 9, score: 1800, date: '15m ago' },
  { id: 3, mode: 'Ranked', map: 'Arctic Base', result: 'loss' as const, k: 5, d: 9, a: 4, score: 900, date: '32m ago' },
  { id: 4, mode: '1v1', map: 'Duel Arena', result: 'win' as const, k: 15, d: 3, a: 0, score: 3000, date: '1h ago' },
  { id: 5, mode: 'Ranked', map: 'Jungle Outpost', result: 'win' as const, k: 10, d: 5, a: 7, score: 2100, date: '2h ago' },
];

const friends = [
  { id: 1, name: 'GHOST_WALKER', status: 'online' as const, avatar: '/images/operator-skin-1.jpg' },
  { id: 2, name: 'VIPER_SQUAD', status: 'in-game' as const, avatar: '/images/battle-pass-reward-1.jpg' },
  { id: 3, name: 'STORM_BRINGER', status: 'online' as const, avatar: '/images/battle-pass-reward-2.jpg' },
  { id: 4, name: 'NIGHT_HAWK', status: 'away' as const, avatar: '/images/battle-pass-reward-3.jpg' },
  { id: 5, name: 'BLAZE_RUNNER', status: 'online' as const, avatar: '/images/weapon-blueprint-1.jpg' },
  { id: 6, name: 'FROST_BITE', status: 'in-game' as const, avatar: '/images/operator-skin-1.jpg' },
  { id: 7, name: 'IRON_CLAD', status: 'offline' as const, avatar: '/images/battle-pass-reward-1.jpg' },
];

const dailyMissions = [
  { id: 1, name: 'Win 3 Ranked Matches', progress: 2, total: 3, reward: 250, claimed: false },
  { id: 2, name: 'Get 50 Kills', progress: 35, total: 50, reward: 150, claimed: false },
  { id: 3, name: 'Play for 1 Hour', progress: 45, total: 60, reward: 100, claimed: true },
];

const leaderboardPreview = [
  { rank: 1, name: 'PHOENIX_RISING', points: 24500, avatar: '/images/operator-skin-1.jpg' },
  { rank: 2, name: 'GHOST_WALKER', points: 23800, avatar: '/images/battle-pass-reward-1.jpg' },
  { rank: 3, name: 'VIPER_SQUAD', points: 22100, avatar: '/images/battle-pass-reward-2.jpg' },
  { rank: 4, name: 'STORM_BRINGER', points: 21500, avatar: '/images/battle-pass-reward-3.jpg' },
  { rank: 5, name: 'NIGHT_HAWK', points: 20900, avatar: '/images/weapon-blueprint-1.jpg' },
];

const tournaments = [
  { id: 1, name: 'WEEKEND WARRIOR CUP', prize: 5000, entry: 'FREE', participants: '64/128', time: '02:14:33', image: '/images/tournament-banner-1.jpg', status: 'registering' as const },
  { id: 2, name: 'WINTER SIEGE CHAMPIONSHIP', prize: 25000, entry: '500 ATP', participants: '112/256', time: 'LIVE', image: '/images/tournament-banner-2.jpg', status: 'live' as const },
];

const newsItems = [
  { id: 1, title: 'Season 7: Winter Siege Patch Notes', date: 'Dec 15, 2024', tag: 'PATCH' },
  { id: 2, title: 'New Ranked Maps Added to Rotation', date: 'Dec 14, 2024', tag: 'UPDATE' },
  { id: 3, title: 'Weekend Warrior Cup Registration Open', date: 'Dec 13, 2024', tag: 'EVENT' },
];

const matchChartData = [
  { match: 1, score: 1800 }, { match: 2, score: 2200 }, { match: 3, score: 1500 },
  { match: 4, score: 2800 }, { match: 5, score: 2000 }, { match: 6, score: 2400 },
  { match: 7, score: 3100 }, { match: 8, score: 1900 }, { match: 9, score: 2600 },
  { match: 10, score: 2900 },
];

const radarData = [
  { stat: 'Aim', value: 85 }, { stat: 'Movement', value: 72 }, { stat: 'Strategy', value: 90 },
  { stat: 'Teamwork', value: 78 }, { stat: 'Survival', value: 65 }, { stat: 'Objective', value: 88 },
];

// --- WIDGETS ---
function PlayerCard() {
  const { ref, isInView } = useInView();
  const xpPercent = (14230 / 15000) * 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.22 }}
      className="glass-panel p-5"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent-amber">
            <img src="/images/operator-skin-1.jpg" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-accent-amber text-void text-[10px] font-bold px-1.5 py-0.5 rounded-full">47</div>
        </div>
        <div className="flex-1">
          <h3 className="font-geist font-bold text-sm">PHOENIX_RISING</h3>
          <span className="text-[10px] px-2 py-0.5 bg-accent-violet/20 text-accent-violet rounded-full">DIAMOND III</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-[10px] text-text-muted mb-1">
          <span>14,230 / 15,000 XP</span>
          <span>LV. 47</span>
        </div>
        <div className="h-1.5 bg-elevated rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-accent-amber progress-glow"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${xpPercent}%` } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function QuickPlayCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.04 }}
      className="glass-panel p-0 overflow-hidden"
    >
      <button className="w-full h-full min-h-[140px] bg-accent-amber text-void flex flex-col items-center justify-center gap-2 hover:shadow-glow transition-all duration-120 hover:scale-[1.02]">
        <Gamepad2 size={40} />
        <span className="font-orbitron font-bold text-lg tracking-wider">QUICK PLAY</span>
        <span className="text-xs font-medium opacity-70">FIND MATCH</span>
      </button>
    </motion.div>
  );
}

function MissionsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.08 }}
      className="glass-panel p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="label-uppercase">DAILY MISSIONS</h4>
        <span className="text-[10px] text-accent-amber font-orbitron tabular-nums">04:32:18</span>
      </div>
      <div className="space-y-3">
        {dailyMissions.map(m => (
          <div key={m.id}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={m.claimed ? 'text-text-muted line-through' : ''}>{m.name}</span>
              <span className="text-accent-amber font-bold">{m.reward} ATP</span>
            </div>
            <div className="h-1 bg-elevated rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${m.claimed ? 'bg-accent-teal' : 'bg-accent-amber'}`}
                style={{ width: `${(m.progress / m.total) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[10px] text-text-muted">{m.progress}/{m.total}</span>
              {m.claimed && <CheckCircle size={12} className="text-accent-teal" />}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function BattlePassCard() {
  const { ref, isInView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.22, delay: 0.12 }}
      className="glass-panel p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="label-uppercase">BATTLE PASS</h4>
        <span className="font-orbitron font-bold text-accent-amber text-sm">TIER 47</span>
      </div>
      <div className="h-2 bg-elevated rounded-full overflow-hidden mb-3">
        <motion.div 
          className="h-full bg-accent-amber progress-glow"
          initial={{ width: 0 }}
          animate={isInView ? { width: '78%' } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
      <p className="text-[10px] text-text-muted mb-3">2,340 / 3,000 XP to next tier</p>
      <div className="flex items-center gap-3 p-2 bg-elevated/50 rounded-md">
        <Lock size={14} className="text-text-muted" />
        <div>
          <p className="text-xs font-medium">TIER 48: Epic Weapon Skin</p>
        </div>
      </div>
      <Link to="/battle-pass" className="btn-secondary text-xs w-full mt-3 text-center block py-2">VIEW PASS</Link>
    </motion.div>
  );
}

function RecentMatchesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.16 }}
      className="glass-panel p-5"
    >
      <h4 className="label-uppercase mb-4">RECENT MATCHES</h4>
      <div className="space-y-2">
        {recentMatches.map(m => (
          <div key={m.id} className="flex items-center gap-3 py-2 hover:bg-elevated-2/40 rounded px-2 -mx-2 transition-colors">
            <div className={`w-1 h-8 rounded-full ${m.result === 'win' ? 'bg-accent-teal' : 'bg-accent-crimson'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{m.map}</p>
              <p className="text-[10px] text-text-muted">{m.mode} — {m.date}</p>
            </div>
            <div className="text-right">
              <p className={`text-xs font-bold ${m.result === 'win' ? 'text-accent-teal' : 'text-accent-crimson'}`}>
                {m.result.toUpperCase()}
              </p>
              <p className="text-[10px] text-text-muted">{m.k}/{m.d}/{m.a}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FriendsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.2 }}
      className="glass-panel p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="label-uppercase">FRIENDS ONLINE</h4>
        <span className="text-xs text-text-muted">{friends.filter(f => f.status !== 'offline').length}/{friends.length}</span>
      </div>
      <div className="flex -space-x-2 mb-4">
        {friends.slice(0, 5).map(f => (
          <div key={f.id} className="relative">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 bg-void">
              <img src={f.avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ring-1 bg-void ${
              f.status === 'online' ? 'bg-accent-teal' : f.status === 'in-game' ? 'bg-accent-amber' : 'bg-text-muted'
            }`} />
          </div>
        ))}
        {friends.length > 5 && (
          <div className="w-8 h-8 rounded-full bg-elevated-2 flex items-center justify-center ring-2 bg-void text-[10px] font-bold">
            +{friends.length - 5}
          </div>
        )}
      </div>
      <Link to="/friends" className="btn-ghost text-xs w-full text-center">VIEW ALL</Link>
    </motion.div>
  );
}

function TournamentsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.24 }}
      className="glass-panel p-5 col-span-full md:col-span-2"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="label-uppercase">ACTIVE TOURNAMENTS</h4>
        <Link to="/tournaments" className="text-accent-amber text-xs flex items-center gap-1 hover:underline">
          VIEW ALL <ChevronRight size={12} />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {tournaments.map(t => (
          <div key={t.id} className="glass-panel-hover overflow-hidden">
            <div className="relative h-28">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-elevated to-transparent" />
              <span className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                t.status === 'live' ? 'bg-accent-crimson text-white animate-pulse' : 'bg-accent-teal text-void'
              }`}>
                {t.status === 'live' ? 'LIVE' : 'REGISTERING'}
              </span>
            </div>
            <div className="p-3">
              <h5 className="font-orbitron font-bold text-xs mb-1">{t.name}</h5>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-accent-gold font-bold">${t.prize.toLocaleString()}</span>
                <span className="text-text-muted">{t.entry}</span>
              </div>
              <p className="text-[10px] text-text-muted mt-1">{t.participants} players</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LeaderboardCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.28 }}
      className="glass-panel p-5"
    >
      <h4 className="label-uppercase mb-4">GLOBAL TOP 5</h4>
      <div className="space-y-2">
        {leaderboardPreview.map((l, i) => (
          <div key={l.rank} className={`flex items-center gap-3 py-1.5 px-2 -mx-2 rounded ${i < 3 ? 'bg-elevated-2/30' : ''}`}>
            <span className={`font-orbitron font-bold text-xs w-6 ${
              i === 0 ? 'text-accent-amber' : i === 1 ? 'text-[#C0C0C0]' : i === 2 ? 'text-[#CD7F32]' : 'text-text-muted'
            }`}>#{l.rank}</span>
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src={l.avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-medium flex-1 truncate">{l.name}</span>
            <span className="font-orbitron font-bold text-xs text-accent-amber tabular-nums">{l.points.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-accent-teal/30">
        <div className="flex items-center gap-3 text-xs">
          <span className="text-accent-teal font-orbitron font-bold">#247</span>
          <span className="flex-1 text-text-muted">YOU</span>
          <span className="font-orbitron text-accent-teal">8,432</span>
        </div>
      </div>
    </motion.div>
  );
}

function NewsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.32 }}
      className="glass-panel p-5"
    >
      <h4 className="label-uppercase mb-4">PATCH NOTES</h4>
      <div className="space-y-3">
        {newsItems.map(n => (
          <div key={n.id} className="group cursor-pointer">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                n.tag === 'PATCH' ? 'bg-accent-amber/20 text-accent-amber' :
                n.tag === 'UPDATE' ? 'bg-accent-teal/20 text-accent-teal' :
                'bg-accent-violet/20 text-accent-violet'
              }`}>{n.tag}</span>
              <span className="text-[10px] text-text-muted">{n.date}</span>
            </div>
            <p className="text-xs font-medium group-hover:text-accent-amber transition-colors">{n.title}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SeasonCountdown() {
  const [time, setTime] = useState({ d: 14, h: 8, m: 32, s: 18 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { d, h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.36 }}
      className="glass-panel p-5"
    >
      <span className="label-uppercase text-text-muted">SEASON 7 ENDS IN</span>
      <div className="flex items-center gap-2 mt-3">
        {[
          { value: time.d, label: 'D' },
          { value: time.h, label: 'H' },
          { value: time.m, label: 'M' },
          { value: time.s, label: 'S' },
        ].map((t, i) => (
          <div key={t.label} className="flex items-center gap-2">
            <div className="bg-elevated rounded px-2 py-1 min-w-[40px] text-center">
              <span className="font-orbitron font-bold text-lg text-accent-amber tabular-nums">
                {String(t.value).padStart(2, '0')}
              </span>
            </div>
            {i < 3 && <span className="text-text-muted">:</span>}
          </div>
        ))}
      </div>
      <p className="font-geist font-semibold text-sm mt-3">WINTER SIEGE</p>
    </motion.div>
  );
}

function StatsChartCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.4 }}
      className="glass-panel p-5 col-span-full md:col-span-2"
    >
      <h4 className="label-uppercase mb-4">PERFORMANCE</h4>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={matchChartData}>
              <XAxis dataKey="match" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ background: '#161B22', border: '1px solid #262C38', borderRadius: '6px', fontSize: '12px' }}
                itemStyle={{ color: '#FF7A1A' }}
              />
              <Line type="monotone" dataKey="score" stroke="#FF7A1A" strokeWidth={2} dot={{ fill: '#FF7A1A', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#262C38" />
              <PolarAngleAxis dataKey="stat" tick={{ fill: '#8A93A3', fontSize: 10 }} />
              <Radar dataKey="value" stroke="#FF7A1A" fill="#FF7A1A" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

// --- MAIN DASHBOARD ---
export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-orbitron font-bold text-2xl mb-6">OPERATOR DASHBOARD</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PlayerCard />
        <QuickPlayCard />
        <MissionsCard />
        <BattlePassCard />
        <RecentMatchesCard />
        <FriendsCard />
        <TournamentsCard />
        <LeaderboardCard />
        <NewsCard />
        <SeasonCountdown />
        <StatsChartCard />
      </div>
    </div>
  );
}
