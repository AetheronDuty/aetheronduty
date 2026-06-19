import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Trophy, DollarSign, AlertTriangle, Activity,
  Shield, Ban, Eye, BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useInView } from '@/hooks/useScrollAnimation';

const analytics = [
  { label: 'TOTAL PLAYERS', value: '142,891', change: '+12.5%', icon: Users, color: 'text-accent-teal' },
  { label: 'DAILY ACTIVE', value: '14,832', change: '+8.2%', icon: Activity, color: 'text-accent-amber' },
  { label: 'MATCHES TODAY', value: '3,421', change: '+15.1%', icon: Trophy, color: 'text-accent-gold' },
  { label: 'REVENUE (USD)', value: '$12.4K', change: '+22.3%', icon: DollarSign, color: 'text-accent-teal' },
];

const chartData = [
  { day: 'Mon', players: 12000, matches: 2800, revenue: 8200 },
  { day: 'Tue', players: 13200, matches: 3100, revenue: 9400 },
  { day: 'Wed', players: 12800, matches: 2900, revenue: 8800 },
  { day: 'Thu', players: 14100, matches: 3400, revenue: 11200 },
  { day: 'Fri', players: 14800, matches: 3600, revenue: 12400 },
  { day: 'Sat', players: 15200, matches: 3800, revenue: 13100 },
  { day: 'Sun', players: 14832, matches: 3421, revenue: 11800 },
];

const fraudAlerts = [
  { id: 1, type: 'SUSPICIOUS WALLET', player: 'CHEAT_X_99', details: 'Multiple rapid transactions from new wallets', severity: 'high', time: '5m ago' },
  { id: 2, type: 'MATCH MANIPULATION', player: 'BOOSTER_CLAN', details: 'Unusual win streak pattern in ranked', severity: 'high', time: '12m ago' },
  { id: 3, type: 'BOT ACTIVITY', player: 'FARMER_BOT_7', details: 'Consistent timing patterns across 50 matches', severity: 'medium', time: '1h ago' },
  { id: 4, type: 'SMURF ACCOUNT', player: 'NEW_PLAYER_99', details: 'Diamond-level skill on fresh account', severity: 'low', time: '2h ago' },
];

const recentUsers = [
  { id: 1, name: 'PHOENIX_RISING', status: 'active', joined: 'Dec 2023', matches: 4892, atp: 12450 },
  { id: 2, name: 'GHOST_WALKER', status: 'active', joined: 'Jan 2024', matches: 3451, atp: 8920 },
  { id: 3, name: 'VIPER_SQUAD', status: 'flagged', joined: 'Feb 2024', matches: 2100, atp: 5600 },
  { id: 4, name: 'STORM_BRINGER', status: 'active', joined: 'Mar 2024', matches: 1876, atp: 4300 },
  { id: 5, name: 'NIGHT_HAWK', status: 'banned', joined: 'Apr 2024', matches: 654, atp: 1200 },
];

const moderationQueue = [
  { id: 1, type: 'REPORT', reporter: 'GHOST_WALKER', reported: 'TOXIC_PLAYER', reason: 'Harassment in voice chat', time: '10m ago' },
  { id: 2, type: 'APPEAL', reporter: 'BANNED_USER_42', reported: '—', reason: 'Ban appeal for match manipulation', time: '1h ago' },
  { id: 3, type: 'REPORT', reporter: 'VIPER_SQUAD', reported: 'AIMBOTTER_X', reason: 'Suspicious aim patterns', time: '2h ago' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { ref, isInView } = useInView();

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: BarChart3 },
    { id: 'users', label: 'USERS', icon: Users },
    { id: 'fraud', label: 'FRAUD DETECTION', icon: AlertTriangle },
    { id: 'moderation', label: 'MODERATION', icon: Shield },
    { id: 'economy', label: 'ECONOMY', icon: DollarSign },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Shield size={24} className="text-accent-crimson" />
        <h1 className="font-orbitron font-bold text-2xl">ADMIN DASHBOARD</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border-subtle overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id ? 'text-accent-crimson border-b-2 border-accent-crimson' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Stats Cards */}
          <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {analytics.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.04, duration: 0.22 }}
                className="glass-panel p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon size={16} className={stat.color} />
                  <span className="label-uppercase text-[10px]">{stat.label}</span>
                </div>
                <p className="font-orbitron font-bold text-xl tabular-nums">{stat.value}</p>
                <span className="text-[10px] text-accent-teal">{stat.change} this week</span>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-4 mb-6">
            <div className="glass-panel p-5">
              <h3 className="label-uppercase mb-4">PLAYER ACTIVITY (7 DAYS)</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="day" tick={{ fill: '#8A93A3', fontSize: 10 }} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: '#161B22', border: '1px solid #262C38', borderRadius: '6px', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="players" stroke="#2DE2C5" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="matches" stroke="#FF7A1A" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="glass-panel p-5">
              <h3 className="label-uppercase mb-4">REVENUE (7 DAYS)</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="day" tick={{ fill: '#8A93A3', fontSize: 10 }} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: '#161B22', border: '1px solid #262C38', borderRadius: '6px', fontSize: '12px' }} />
                    <Bar dataKey="revenue" fill="#FF7A1A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="glass-panel p-5">
            <h3 className="label-uppercase mb-4 text-accent-crimson">RECENT ALERTS</h3>
            <div className="space-y-2">
              {fraudAlerts.slice(0, 3).map(alert => (
                <div key={alert.id} className="flex items-center gap-3 p-2 bg-elevated/50 rounded-md">
                  <AlertTriangle size={14} className={alert.severity === 'high' ? 'text-accent-crimson' : alert.severity === 'medium' ? 'text-accent-amber' : 'text-text-muted'} />
                  <div className="flex-1">
                    <p className="text-xs font-medium">{alert.type}: {alert.player}</p>
                    <p className="text-[10px] text-text-muted">{alert.details}</p>
                  </div>
                  <span className="text-[10px] text-text-muted">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="glass-panel overflow-hidden">
          <div className="grid grid-cols-[1fr_80px_80px_60px_80px_100px] gap-2 px-4 py-3 text-[10px] uppercase tracking-wider text-muted border-b border-border-subtle/30">
            <span>Player</span>
            <span>Status</span>
            <span>Joined</span>
            <span className="text-right">Matches</span>
            <span className="text-right">ATP Balance</span>
            <span className="text-right">Actions</span>
          </div>
          {recentUsers.map(user => (
            <div key={user.id} className="grid grid-cols-[1fr_80px_80px_60px_80px_100px] gap-2 px-4 py-2.5 items-center border-b border-border-subtle/20 hover:bg-elevated-2/30 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden">
                  <img src="/images/operator-skin-1.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-medium">{user.name}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full w-fit ${
                user.status === 'active' ? 'bg-accent-teal/20 text-accent-teal' :
                user.status === 'flagged' ? 'bg-accent-amber/20 text-accent-amber' :
                'bg-accent-crimson/20 text-accent-crimson'
              }`}>{user.status.toUpperCase()}</span>
              <span className="text-[10px] text-text-muted">{user.joined}</span>
              <span className="text-right text-xs tabular-nums">{user.matches.toLocaleString()}</span>
              <span className="text-right text-xs text-accent-amber tabular-nums">{user.atp.toLocaleString()}</span>
              <div className="flex justify-end gap-1">
                <button className="w-6 h-6 glass-panel rounded flex items-center justify-center hover:bg-elevated-2/60">
                  <Eye size={10} className="text-text-muted" />
                </button>
                <button className="w-6 h-6 glass-panel rounded flex items-center justify-center hover:bg-accent-crimson/20">
                  <Ban size={10} className="text-accent-crimson" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'fraud' && (
        <div className="space-y-3">
          {fraudAlerts.map(alert => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`glass-panel p-4 border-l-2 ${
                alert.severity === 'high' ? 'border-l-accent-crimson' :
                alert.severity === 'medium' ? 'border-l-accent-amber' :
                'border-l-text-muted'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={16} className={
                    alert.severity === 'high' ? 'text-accent-crimson' :
                    alert.severity === 'medium' ? 'text-accent-amber' :
                    'text-text-muted'
                  } />
                  <div>
                    <p className="text-sm font-medium">{alert.type}: <span className="text-accent-amber">{alert.player}</span></p>
                    <p className="text-xs text-text-muted mt-0.5">{alert.details}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] px-2 py-0.5 rounded ${
                    alert.severity === 'high' ? 'bg-accent-crimson/20 text-accent-crimson' :
                    alert.severity === 'medium' ? 'bg-accent-amber/20 text-accent-amber' :
                    'bg-elevated text-text-muted'
                  }`}>{alert.severity.toUpperCase()}</span>
                  <p className="text-[10px] text-text-muted mt-1">{alert.time}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3 ml-7">
                <button className="btn-ghost text-[10px] py-1 px-3">INVESTIGATE</button>
                <button className="btn-danger text-[10px] py-1 px-3">SUSPEND</button>
                <button className="btn-ghost text-[10px] py-1 px-3">DISMISS</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'moderation' && (
        <div className="glass-panel overflow-hidden">
          <div className="grid grid-cols-[80px_1fr_1fr_1fr_80px] gap-2 px-4 py-3 text-[10px] uppercase tracking-wider text-muted border-b border-border-subtle/30">
            <span>Type</span>
            <span>Reporter</span>
            <span>Target</span>
            <span>Reason</span>
            <span className="text-right">Time</span>
          </div>
          {moderationQueue.map(item => (
            <div key={item.id} className="grid grid-cols-[80px_1fr_1fr_1fr_80px] gap-2 px-4 py-2.5 items-center border-b border-border-subtle/20 hover:bg-elevated-2/30 transition-colors">
              <span className={`text-[10px] px-1.5 py-0.5 rounded w-fit ${
                item.type === 'REPORT' ? 'bg-accent-crimson/20 text-accent-crimson' : 'bg-accent-amber/20 text-accent-amber'
              }`}>{item.type}</span>
              <span className="text-xs">{item.reporter}</span>
              <span className="text-xs text-text-muted">{item.reported}</span>
              <span className="text-xs text-text-muted truncate">{item.reason}</span>
              <span className="text-right text-[10px] text-text-muted">{item.time}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'economy' && (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="glass-panel p-5">
            <h3 className="label-uppercase mb-4">CURRENCY FLOW (24H)</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">ATP Minted (Match Rewards)</span>
                <span className="text-accent-teal font-bold">+2,450,000 ATP</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">ATP Burned (Purchases)</span>
                <span className="text-accent-crimson font-bold">-890,000 ATP</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">XLM Volume (Conversions)</span>
                <span className="text-accent-amber font-bold">12,450 XLM</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">Tournament Entry Fees</span>
                <span className="text-accent-gold font-bold">456,000 ATP</span>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-border-subtle/30">
                <span className="text-text-muted">Net ATP Flow</span>
                <span className="text-accent-teal font-bold">+1,560,000 ATP</span>
              </div>
            </div>
          </div>
          <div className="glass-panel p-5">
            <h3 className="label-uppercase mb-4">CONVERSION RATE</h3>
            <div className="text-center py-6">
              <p className="text-xs text-text-muted">Current Rate</p>
              <p className="font-orbitron font-bold text-3xl text-accent-teal mt-1">1 XLM = 40 ATP</p>
              <p className="text-xs text-accent-amber mt-2">+2.5% this week</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="btn-secondary flex-1 text-xs py-2">ADJUST RATE</button>
              <button className="btn-secondary flex-1 text-xs py-2">VIEW HISTORY</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
