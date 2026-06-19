import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Gamepad2, Mic, MicOff, UserPlus } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';

const friendsList = [
  { id: 1, name: 'GHOST_WALKER', status: 'online' as const, rank: 'Diamond III', avatar: '/images/operator-skin-1.jpg', canInvite: true, inGame: 'Ranked Match' },
  { id: 2, name: 'VIPER_SQUAD', status: 'in-game' as const, rank: 'Platinum I', avatar: '/images/battle-pass-reward-1.jpg', canInvite: false, inGame: 'Tournament' },
  { id: 3, name: 'STORM_BRINGER', status: 'online' as const, rank: 'Platinum II', avatar: '/images/battle-pass-reward-2.jpg', canInvite: true, inGame: null },
  { id: 4, name: 'NIGHT_HAWK', status: 'away' as const, rank: 'Gold I', avatar: '/images/battle-pass-reward-3.jpg', canInvite: true, inGame: null },
  { id: 5, name: 'BLAZE_RUNNER', status: 'online' as const, rank: 'Diamond I', avatar: '/images/weapon-blueprint-1.jpg', canInvite: true, inGame: 'Squad Battle' },
  { id: 6, name: 'FROST_BITE', status: 'in-game' as const, rank: 'Platinum III', avatar: '/images/operator-skin-1.jpg', canInvite: false, inGame: 'Ranked' },
  { id: 7, name: 'IRON_CLAD', status: 'offline' as const, rank: 'Gold II', avatar: '/images/battle-pass-reward-1.jpg', canInvite: false, inGame: null },
  { id: 8, name: 'SHADOW_STRIKE', status: 'offline' as const, rank: 'Silver I', avatar: '/images/battle-pass-reward-2.jpg', canInvite: false, inGame: null },
];

const partyMembers = [
  { id: 1, name: 'GHOST_WALKER', avatar: '/images/operator-skin-1.jpg', isLeader: true, speaking: true },
  { id: 2, name: 'STORM_BRINGER', avatar: '/images/battle-pass-reward-2.jpg', isLeader: false, speaking: false },
];

const clanInfo = {
  name: 'PHOENIX LEGION',
  tag: '[PL]',
  members: 28,
  maxMembers: 50,
  points: 45200,
  rank: 12,
  warsWon: 8,
};

const statusConfig = {
  online: { dot: 'bg-accent-teal', label: 'Online' },
  'in-game': { dot: 'bg-accent-amber', label: 'In Match' },
  away: { dot: 'bg-text-muted', label: 'Away' },
  offline: { dot: 'bg-border-subtle', label: 'Offline' },
};

export default function FriendsPage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('friends');
  const { ref, isInView } = useInView();

  const tabs = [
    { id: 'friends', label: 'FRIENDS', count: friendsList.filter(f => f.status !== 'offline').length },
    { id: 'party', label: 'PARTY', count: partyMembers.length },
    { id: 'clan', label: 'CLAN', count: clanInfo.members },
  ];

  const filtered = friendsList.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-orbitron font-bold text-2xl mb-6">SOCIAL</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border-subtle">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
              tab === t.id ? 'text-accent-amber border-b-2 border-accent-amber' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {t.label}
            <span className="text-[10px] px-1.5 py-0.5 bg-elevated rounded-full">{t.count}</span>
          </button>
        ))}
      </div>

      {tab === 'friends' && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search friends..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-glass w-full pl-9 pr-4 py-2 text-sm"
              />
            </div>
            <button className="btn-teal text-xs py-2 px-4 flex items-center gap-2">
              <UserPlus size={14} /> ADD FRIEND
            </button>
          </div>

          <div ref={ref} className="space-y-1">
            {filtered.map((friend, i) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.02, duration: 0.22 }}
                className="glass-panel p-3 flex items-center gap-4 hover:bg-elevated-2/40 transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={friend.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 bg-void ${statusConfig[friend.status].dot}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{friend.name}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] ${friend.status === 'online' ? 'text-accent-teal' : friend.status === 'in-game' ? 'text-accent-amber' : 'text-text-muted'}`}>
                      {friend.inGame || statusConfig[friend.status].label}
                    </span>
                    <span className="text-[10px] text-text-muted">{friend.rank}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 glass-panel rounded-md flex items-center justify-center hover:bg-elevated-2/60 transition-colors">
                    <MessageSquare size={14} className="text-text-muted" />
                  </button>
                  {friend.canInvite && (
                    <button className="w-8 h-8 glass-panel rounded-md flex items-center justify-center hover:bg-accent-amber/20 transition-colors">
                      <Gamepad2 size={14} className="text-accent-amber" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {tab === 'party' && (
        <div className="max-w-md">
          <div className="glass-panel p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-orbitron font-bold text-sm">YOUR PARTY</h3>
              <span className="text-xs text-accent-teal">{partyMembers.length}/5</span>
            </div>
            <div className="space-y-2">
              {partyMembers.map(member => (
                <div key={member.id} className="flex items-center gap-3 p-2 bg-elevated/50 rounded-md">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={member.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    {member.speaking && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent-teal rounded-full flex items-center justify-center">
                        <Mic size={8} className="text-void" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {member.name}
                      {member.isLeader && <span className="text-[10px] text-accent-amber ml-2">LEADER</span>}
                    </p>
                  </div>
                  <button className="text-text-muted hover:text-text-primary">
                    {member.speaking ? <Mic size={14} className="text-accent-teal" /> : <MicOff size={14} />}
                  </button>
                </div>
              ))}
            </div>
            <button className="btn-amber w-full text-xs py-2 mt-4">FIND MATCH</button>
          </div>
        </div>
      )}

      {tab === 'clan' && (
        <div>
          <div className="glass-panel p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-orbitron font-bold text-xl">{clanInfo.name}</h3>
                <span className="text-xs text-text-muted">{clanInfo.tag}</span>
              </div>
              <div className="text-right">
                <p className="font-orbitron font-bold text-2xl text-accent-amber">#{clanInfo.rank}</p>
                <p className="text-[10px] text-text-muted">GLOBAL RANK</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <p className="font-orbitron font-bold text-lg">{clanInfo.members}/{clanInfo.maxMembers}</p>
                <p className="text-[10px] text-text-muted">MEMBERS</p>
              </div>
              <div className="text-center">
                <p className="font-orbitron font-bold text-lg text-accent-amber">{clanInfo.points.toLocaleString()}</p>
                <p className="text-[10px] text-text-muted">CLAN POINTS</p>
              </div>
              <div className="text-center">
                <p className="font-orbitron font-bold text-lg text-accent-gold">{clanInfo.warsWon}</p>
                <p className="text-[10px] text-text-muted">WARS WON</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-4">
            <h4 className="label-uppercase mb-4">CLAN ROSTER</h4>
            <div className="space-y-2">
              {friendsList.slice(0, 5).map((f, i) => (
                <div key={f.id} className="flex items-center gap-3 p-2 hover:bg-elevated-2/40 rounded transition-colors">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={f.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm flex-1">{f.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-elevated rounded text-text-muted">
                    {i === 0 ? 'LEADER' : i < 3 ? 'OFFICER' : 'MEMBER'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
