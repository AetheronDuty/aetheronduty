import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, TrendingUp, Gamepad2, Star, Users, Swords } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import { useInView } from '@/hooks/useScrollAnimation';

const matchHistory = [
  { id: 1, mode: 'Ranked', map: 'Desert Storm', result: 'win' as const, k: 12, d: 4, a: 6, score: 2500, duration: '12:34', date: '2024-12-15' },
  { id: 2, mode: 'Squad', map: 'Urban Warfare', result: 'win' as const, k: 8, d: 6, a: 9, score: 1800, duration: '15:22', date: '2024-12-15' },
  { id: 3, mode: 'Ranked', map: 'Arctic Base', result: 'loss' as const, k: 5, d: 9, a: 4, score: 900, duration: '8:45', date: '2024-12-14' },
  { id: 4, mode: '1v1', map: 'Duel Arena', result: 'win' as const, k: 15, d: 3, a: 0, score: 3000, duration: '6:12', date: '2024-12-14' },
  { id: 5, mode: 'Ranked', map: 'Jungle Outpost', result: 'win' as const, k: 10, d: 5, a: 7, score: 2100, duration: '14:08', date: '2024-12-13' },
  { id: 6, mode: 'Tournament', map: 'Winter Siege', result: 'win' as const, k: 18, d: 7, a: 5, score: 4200, duration: '22:15', date: '2024-12-12' },
  { id: 7, mode: 'Ranked', map: 'Coastal Defense', result: 'loss' as const, k: 7, d: 8, a: 3, score: 1100, duration: '11:42', date: '2024-12-12' },
  { id: 8, mode: 'Squad', map: 'Desert Storm', result: 'win' as const, k: 14, d: 4, a: 8, score: 2800, duration: '18:30', date: '2024-12-11' },
];

const achievements = [
  { id: 1, name: 'First Blood', desc: 'Get the first kill in a match', icon: Swords, rarity: 'Common' as const, progress: 1, total: 1 },
  { id: 2, name: 'Clutch Master', desc: 'Win a 1v3 situation', icon: Target, rarity: 'Rare' as const, progress: 12, total: 25 },
  { id: 3, name: 'Tournament Champion', desc: 'Win a tournament', icon: Trophy, rarity: 'Legendary' as const, progress: 3, total: 5 },
  { id: 4, name: 'Sharpshooter', desc: 'Achieve 80% accuracy in 10 matches', icon: Target, rarity: 'Epic' as const, progress: 7, total: 10 },
  { id: 5, name: 'Team Player', desc: 'Get 100 assists', icon: Users, rarity: 'Rare' as const, progress: 87, total: 100 },
  { id: 6, name: 'Unstoppable', desc: 'Win 20 matches in a row', icon: Star, rarity: 'Legendary' as const, progress: 14, total: 20 },
];

const weapons = [
  { name: 'AK-47', image: '/images/weapon-blueprint-1.jpg', kills: 2847, accuracy: 72.4, usage: 42 },
  { name: 'M4A1', image: '/images/weapon-blueprint-1.jpg', kills: 1923, accuracy: 68.1, usage: 28 },
  { name: 'AWP', image: '/images/weapon-blueprint-1.jpg', kills: 1456, accuracy: 45.3, usage: 18 },
];

const friends = [
  { id: 1, name: 'GHOST_WALKER', status: 'online' as const, rank: 'Diamond' },
  { id: 2, name: 'VIPER_SQUAD', status: 'in-game' as const, rank: 'Platinum' },
  { id: 3, name: 'STORM_BRINGER', status: 'online' as const, rank: 'Platinum' },
  { id: 4, name: 'NIGHT_HAWK', status: 'away' as const, rank: 'Gold' },
];

const chartData = [
  { match: 1, score: 1800 }, { match: 2, score: 2200 }, { match: 3, score: 1500 },
  { match: 4, score: 2800 }, { match: 5, score: 2000 }, { match: 6, score: 2400 },
  { match: 7, score: 3100 }, { match: 8, score: 1900 }, { match: 9, score: 2600 },
  { match: 10, score: 2900 },
];

const radarData = [
  { stat: 'Aim', value: 85 }, { stat: 'Movement', value: 72 }, { stat: 'Strategy', value: 90 },
  { stat: 'Teamwork', value: 78 }, { stat: 'Survival', value: 65 }, { stat: 'Objective', value: 88 },
];

const rarityColors = {
  Common: 'border-border-subtle bg-border-subtle/10',
  Rare: 'border-accent-teal bg-accent-teal/10',
  Epic: 'border-accent-violet bg-accent-violet/10',
  Legendary: 'border-accent-gold bg-accent-gold/10',
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { ref, isInView } = useInView();

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: TrendingUp },
    { id: 'matches', label: 'MATCHES', icon: Gamepad2 },
    { id: 'achievements', label: 'ACHIEVEMENTS', icon: Trophy },
    { id: 'weapons', label: 'WEAPONS', icon: Swords },
    { id: 'friends', label: 'FRIENDS', icon: Users },
  ];

  return (
    <div>
      {/* Banner */}
      <div className="relative h-48 -mx-6 -mt-6 mb-0 overflow-hidden">
        <img src="/images/profile-banner.jpg" alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="relative -mt-16 px-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 bg-void ring-accent-amber">
              <img src="/images/operator-skin-1.jpg" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-elevated text-accent-amber text-xs font-bold px-2 py-0.5 rounded-full border border-accent-amber">
              LV.47
            </div>
          </div>
          <div className="flex-1">
            <h1 className="font-orbitron font-bold text-2xl">PHOENIX_RISING</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs px-2 py-0.5 bg-accent-violet/20 text-accent-violet rounded-full font-medium">DIAMOND III</span>
              <span className="text-xs text-text-muted">Joined Dec 2023</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs py-2 px-4">EDIT PROFILE</button>
            <button className="btn-ghost text-xs py-2 px-4">SHARE</button>
          </div>
        </div>

        {/* Stats Row */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'K/D RATIO', value: '2.34', icon: Target, color: 'text-accent-amber' },
            { label: 'WINS', value: '1,247', icon: Trophy, color: 'text-accent-amber' },
            { label: 'WIN RATE', value: '58.3%', icon: TrendingUp, color: 'text-accent-teal' },
            { label: 'MATCHES', value: '4,892', icon: Gamepad2, color: 'text-accent-amber' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.04, duration: 0.22 }}
              className="glass-panel p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <stat.icon size={14} className="text-text-muted" />
                <span className="label-uppercase">{stat.label}</span>
              </div>
              <p className={`font-orbitron font-bold text-2xl ${stat.color} tabular-nums`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border-subtle overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'text-accent-amber border-b-2 border-accent-amber' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="glass-panel p-5">
            <h3 className="label-uppercase mb-4">MATCH HISTORY</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="match" tick={{ fill: '#8A93A3', fontSize: 10 }} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: '#161B22', border: '1px solid #262C38', borderRadius: '6px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="score" stroke="#FF7A1A" strokeWidth={2} dot={{ fill: '#FF7A1A', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="glass-panel p-5">
            <h3 className="label-uppercase mb-4">STAT BREAKDOWN</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#262C38" />
                  <PolarAngleAxis dataKey="stat" tick={{ fill: '#8A93A3', fontSize: 10 }} />
                  <Radar dataKey="value" stroke="#FF7A1A" fill="#FF7A1A" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="glass-panel overflow-hidden">
          <div className="grid grid-cols-[80px_1fr_60px_60px_80px_60px_80px] gap-2 px-4 py-2 text-[10px] uppercase tracking-wider text-muted border-b border-border-subtle/30">
            <span>Mode</span>
            <span>Map</span>
            <span>Result</span>
            <span>K/D/A</span>
            <span>Score</span>
            <span>Time</span>
            <span>Date</span>
          </div>
          {matchHistory.map(m => (
            <div key={m.id} className="grid grid-cols-[80px_1fr_60px_60px_80px_60px_80px] gap-2 px-4 py-2.5 items-center hover:bg-elevated-2/40 transition-colors border-b border-border-subtle/20">
              <span className="text-xs text-text-muted">{m.mode}</span>
              <span className="text-xs font-medium truncate">{m.map}</span>
              <span className={`text-xs font-bold ${m.result === 'win' ? 'text-accent-teal' : 'text-accent-crimson'}`}>{m.result.toUpperCase()}</span>
              <span className="text-xs tabular-nums">{m.k}/{m.d}/{m.a}</span>
              <span className="text-xs font-orbitron tabular-nums">{m.score.toLocaleString()}</span>
              <span className="text-xs text-text-muted tabular-nums">{m.duration}</span>
              <span className="text-xs text-text-muted">{m.date}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map(a => (
            <div key={a.id} className={`glass-panel p-4 border-l-2 ${rarityColors[a.rarity].split(' ')[0]}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-md ${rarityColors[a.rarity].split(' ')[1]}`}>
                  <a.icon size={20} className={
                    a.rarity === 'Legendary' ? 'text-accent-gold' : a.rarity === 'Epic' ? 'text-accent-violet' : 'text-accent-teal'
                  } />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{a.name}</h4>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${rarityColors[a.rarity]}`}>{a.rarity}</span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{a.desc}</p>
                  <div className="mt-2">
                    <div className="h-1 bg-elevated rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${a.progress >= a.total ? 'bg-accent-teal' : 'bg-accent-amber'}`} style={{ width: `${Math.min((a.progress / a.total) * 100, 100)}%` }} />
                    </div>
                    <p className="text-[10px] text-text-muted mt-1">{a.progress} / {a.total}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'weapons' && (
        <div className="space-y-4">
          {weapons.map((w) => (
            <div key={w.name} className="glass-panel p-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <img src={w.image} alt={w.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{w.name}</h4>
                <div className="flex items-center gap-4 mt-1 text-xs text-text-muted">
                  <span>{w.kills.toLocaleString()} Kills</span>
                  <span>{w.accuracy}% Accuracy</span>
                </div>
              </div>
              <div className="w-24">
                <div className="h-2 bg-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-accent-amber" style={{ width: `${w.usage}%` }} />
                </div>
                <p className="text-[10px] text-text-muted mt-1 text-right">{w.usage}% Usage</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'friends' && (
        <div className="space-y-2">
          {friends.map(f => (
            <div key={f.id} className="glass-panel p-3 flex items-center gap-3 hover:bg-elevated-2/40 transition-colors">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="/images/operator-skin-1.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 bg-void ${
                  f.status === 'online' ? 'bg-accent-teal' : f.status === 'in-game' ? 'bg-accent-amber' : 'bg-text-muted'
                }`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{f.name}</p>
                <p className="text-[10px] text-text-muted capitalize">{f.status} — {f.rank}</p>
              </div>
              <button className="btn-ghost text-xs py-1.5 px-3">INVITE</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
