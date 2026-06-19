import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';

const tournaments = [
  { id: 1, name: 'WEEKEND WARRIOR CUP', prize: 5000, entry: 'FREE', entryType: 'FREE' as const, participants: 64, maxParticipants: 128, region: 'Global', startTime: 'Dec 20, 18:00 UTC', image: '/images/tournament-banner-1.jpg', status: 'registering' as const, mode: 'Squad' },
  { id: 2, name: 'WINTER SIEGE CHAMPIONSHIP', prize: 25000, entry: '500', entryType: 'PAID' as const, participants: 112, maxParticipants: 256, region: 'Global', startTime: 'LIVE', image: '/images/tournament-banner-2.jpg', status: 'live' as const, mode: 'Ranked' },
  { id: 3, name: 'DAILY DUEL CUP', prize: 1000, entry: 'FREE', entryType: 'FREE' as const, participants: 32, maxParticipants: 64, region: 'NA', startTime: 'Dec 16, 12:00 UTC', image: '/images/tournament-banner-1.jpg', status: 'registering' as const, mode: '1v1' },
  { id: 4, name: 'PRO LEAGUE QUALIFIER', prize: 10000, entry: '1000', entryType: 'PAID' as const, participants: 48, maxParticipants: 128, region: 'EU', startTime: 'Dec 18, 20:00 UTC', image: '/images/tournament-banner-2.jpg', status: 'upcoming' as const, mode: 'Ranked' },
  { id: 5, name: 'CLAN WARS OPEN', prize: 15000, entry: '2500', entryType: 'PAID' as const, participants: 8, maxParticipants: 32, region: 'Global', startTime: 'Dec 22, 18:00 UTC', image: '/images/tournament-banner-1.jpg', status: 'registering' as const, mode: 'Squad' },
  { id: 6, name: 'ROOKIE SHOWDOWN', prize: 500, entry: 'FREE', entryType: 'FREE' as const, participants: 16, maxParticipants: 64, region: 'Global', startTime: 'Dec 17, 14:00 UTC', image: '/images/tournament-banner-2.jpg', status: 'registering' as const, mode: 'Solo' },
];

const statusConfig = {
  registering: { color: 'bg-accent-teal text-void', label: 'REGISTERING' },
  live: { color: 'bg-accent-crimson text-white animate-pulse', label: 'LIVE' },
  upcoming: { color: 'bg-elevated-2 text-text-muted', label: 'UPCOMING' },
  completed: { color: 'bg-border-subtle text-text-muted', label: 'COMPLETED' },
};

export default function TournamentHubPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [modeFilter, setModeFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [entryFilter, setEntryFilter] = useState('all');
  const [selectedTournament, setSelectedTournament] = useState<number | null>(null);
  const { ref, isInView } = useInView();

  const tabs = ['Upcoming', 'Live', 'My Tournaments', 'Past'];

  const filtered = tournaments.filter(t => {
    if (activeTab === 'live' && t.status !== 'live') return false;
    if (activeTab === 'upcoming' && t.status !== 'upcoming' && t.status !== 'registering') return false;
    if (modeFilter !== 'all' && t.mode !== modeFilter) return false;
    if (regionFilter !== 'all' && t.region !== regionFilter) return false;
    if (entryFilter !== 'all' && t.entryType !== entryFilter.toUpperCase()) return false;
    return true;
  });

  return (
    <div>
      <h1 className="font-orbitron font-bold text-2xl mb-6">TOURNAMENT HUB</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-border-subtle overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
              activeTab === tab.toLowerCase() ? 'text-accent-amber border-b-2 border-accent-amber' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select value={modeFilter} onChange={e => setModeFilter(e.target.value)} className="input-glass text-xs py-2 pr-8">
          <option value="all">All Modes</option>
          <option value="Solo">Solo</option>
          <option value="1v1">1v1</option>
          <option value="Ranked">Ranked</option>
          <option value="Squad">Squad</option>
        </select>
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className="input-glass text-xs py-2 pr-8">
          <option value="all">All Regions</option>
          <option value="Global">Global</option>
          <option value="NA">North America</option>
          <option value="EU">Europe</option>
        </select>
        <select value={entryFilter} onChange={e => setEntryFilter(e.target.value)} className="input-glass text-xs py-2 pr-8">
          <option value="all">All Entry Types</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* Tournament Grid */}
      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.04, duration: 0.22 }}
            className="glass-panel-hover overflow-hidden cursor-pointer"
            onClick={() => setSelectedTournament(selectedTournament === t.id ? null : t.id)}
          >
            <div className="relative h-32">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-elevated to-transparent" />
              <span className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-bold ${statusConfig[t.status].color}`}>
                {statusConfig[t.status].label}
              </span>
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-elevated/80 text-text-muted">
                {t.mode}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-orbitron font-bold text-sm mb-2">{t.name}</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-accent-gold font-orbitron font-bold text-lg">${t.prize.toLocaleString()}</span>
                <span className="text-xs text-text-muted">{t.entry === 'FREE' ? 'FREE' : `${t.entry} ATP`}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="flex items-center gap-1"><Users size={12} /> {t.participants}/{t.maxParticipants}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {t.startTime}</span>
              </div>
            </div>

            <AnimatePresence>
              {selectedTournament === t.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-border-subtle/30 pt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">Region</span>
                      <span>{t.region}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">Format</span>
                      <span>Single Elimination</span>
                    </div>
                    <button className="btn-primary w-full text-xs py-2 mt-2">
                      {t.status === 'live' ? 'VIEW BRACKET' : t.status === 'registering' ? 'REGISTER' : 'VIEW DETAILS'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
