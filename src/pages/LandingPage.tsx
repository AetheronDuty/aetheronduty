import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Crosshair, Trophy, Wallet, ChevronRight, Target, 
  Users, Gamepad2, DollarSign, ExternalLink, ChevronDown,
  Quote, CheckCircle
} from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';

// --- HERO SECTION ---
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  // Mouse position for parallax effect
  
  const springX = useSpring(0, { stiffness: 50, damping: 20 });
  const springY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      springX.set(x);
      springY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.img 
          src="/images/hero-character.jpg" 
          alt="Hero"
          style={{ x: springX, y: springY }}
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/80 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 pb-24">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-16 flex items-center justify-between bg-gradient-to-b from-void/80 to-transparent">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/economy-atp.png" alt="Logo" className="w-8 h-8" />
            <span className="font-orbitron font-bold text-accent-amber text-sm">AETHERONDUTY</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {['HOME', 'PLAY', 'COMPETE', 'MARKETPLACE', 'PROFILE'].map(item => (
              <Link key={item} to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`} className="text-text-secondary hover:text-text-primary text-xs uppercase tracking-wider transition-colors">
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="text-text-secondary hover:text-text-primary text-xs uppercase tracking-wider transition-colors">
              SIGN IN
            </Link>
            <Link to="/auth?tab=register" className="btn-primary text-xs py-2 px-4">
              PLAY NOW
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h1 className="font-orbitron font-black text-5xl md:text-7xl text-text-primary uppercase leading-tight text-glow-amber">
            FIGHT. COMPETE. EARN.
          </h1>
          <p className="mt-4 text-text-secondary text-lg md:text-xl max-w-xl">
            Skill-based competitive gaming where you own every reward. Powered by Stellar blockchain.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link to="/auth" className="btn-primary text-sm">
              PLAY NOW
              <ChevronRight size={16} className="inline ml-1" />
            </Link>
            <button className="btn-secondary text-sm flex items-center gap-2">
              <Target size={16} />
              WATCH TRAILER
            </button>
          </div>
        </motion.div>

        {/* Live Ticker */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 overflow-hidden"
        >
          <div className="ticker-wrap">
            <div className="ticker-content text-xs uppercase tracking-wider text-text-muted">
              <span className="mx-8">
                <span className="text-accent-amber font-orbitron font-bold">14,832</span> OPERATORS ONLINE
              </span>
              <span className="mx-8 text-border-subtle">|</span>
              <span className="mx-8">
                <span className="text-accent-gold font-orbitron font-bold">$2.4M</span> PRIZE POOL
              </span>
              <span className="mx-8 text-border-subtle">|</span>
              <span className="mx-8">
                SEASON 7: <span className="text-accent-amber font-orbitron">WINTER SIEGE</span>
              </span>
              <span className="mx-8 text-border-subtle">|</span>
              <span className="mx-8">
                <span className="text-accent-teal font-orbitron font-bold">142,891</span> REGISTERED PLAYERS
              </span>
              <span className="mx-8 text-border-subtle">|</span>
              {/* Duplicate for seamless loop */}
              <span className="mx-8">
                <span className="text-accent-amber font-orbitron font-bold">14,832</span> OPERATORS ONLINE
              </span>
              <span className="mx-8 text-border-subtle">|</span>
              <span className="mx-8">
                <span className="text-accent-gold font-orbitron font-bold">$2.4M</span> PRIZE POOL
              </span>
              <span className="mx-8 text-border-subtle">|</span>
              <span className="mx-8">
                SEASON 7: <span className="text-accent-amber font-orbitron">WINTER SIEGE</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- FEATURES SECTION ---
function FeaturesSection() {
  const { ref, isInView } = useInView();
  const features = [
    { icon: Crosshair, title: 'TACTICAL COMPETITION', desc: 'Ranked seasons, tournaments, and leagues with anti-cheat protected matchmaking.' },
    { icon: Trophy, title: 'SKILL-BASED REWARDS', desc: 'Earn AetherPoints through performance. No pay-to-win. Your skill determines your progress.' },
    { icon: Wallet, title: 'BLOCKCHAIN OWNERSHIP', desc: 'Convert ATP to XLM on Stellar. Own your rewards, trade assets, withdraw anytime.' },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-surface">
      <div className="hud-grid" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.04, duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-hover p-8 corner-brackets"
            >
              <f.icon size={48} className="text-accent-amber mb-4" />
              <h3 className="font-orbitron font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- TOURNAMENT SECTION ---
function TournamentSection() {
  const { ref, isInView } = useInView();
  
  return (
    <section ref={ref} className="relative py-24 bg-void overflow-hidden">
      <div className="glow-orb glow-orb-amber -top-40 -right-40" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bracket Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="glass-panel p-6">
              {/* Mini bracket visualization */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 glass-panel p-3 text-xs">Player 1</div>
                  <ChevronRight size={14} className="text-accent-amber" />
                </div>
                <div className="flex items-center gap-4 ml-8">
                  <div className="flex-1 glass-panel p-3 text-xs border-l-2 border-accent-amber">Winner →</div>
                  <ChevronRight size={14} className="text-accent-amber" />
                </div>
                <div className="flex items-center gap-4 ml-16">
                  <div className="flex-1 glass-panel p-3 text-xs font-bold text-accent-amber border-accent-amber">CHAMPION</div>
                </div>
                <div className="flex items-center gap-4 ml-8">
                  <div className="flex-1 glass-panel p-3 text-xs opacity-50">Player 4</div>
                  <ChevronRight size={14} className="text-accent-crimson" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 glass-panel p-3 text-xs">Player 3</div>
                  <ChevronRight size={14} className="text-accent-crimson" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-uppercase text-accent-amber">TOURNAMENT SYSTEM</span>
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl mt-2 mb-4">CLIMB THE BRACKET</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              From daily cups to seasonal championships. Single and double elimination brackets with live spectator support.
            </p>
            <Link to="/tournaments" className="btn-primary text-sm inline-flex items-center gap-2">
              VIEW TOURNAMENTS
              <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- BATTLE PASS SECTION ---
function BattlePassSection() {
  const { ref, isInView } = useInView();
  const rewards = [
    { image: '/images/battle-pass-reward-1.jpg', name: 'Crystal Eagle Charm', tier: 45, rarity: 'Epic' as const },
    { image: '/images/battle-pass-reward-2.jpg', name: 'Phoenix Emblem', tier: 46, rarity: 'Rare' as const },
    { image: '/images/battle-pass-reward-3.jpg', name: 'Tactical ATV', tier: 47, rarity: 'Legendary' as const },
    { image: '/images/weapon-blueprint-1.jpg', name: 'Solar Flare AR', tier: 48, rarity: 'Epic' as const },
    { image: '/images/operator-skin-1.jpg', name: 'Phoenix Rising', tier: 50, rarity: 'Legendary' as const },
  ];

  const rarityColors = {
    Common: 'border-border-subtle',
    Rare: 'border-accent-teal',
    Epic: 'border-accent-violet',
    Legendary: 'border-accent-gold',
  };

  return (
    <section ref={ref} className="relative py-24 bg-surface">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="label-uppercase text-accent-amber">SEASON 7</span>
          <div className="flex items-end justify-between mt-2">
            <div>
              <h2 className="font-orbitron font-bold text-3xl md:text-4xl">BATTLE PASS</h2>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-48 h-2 bg-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-accent-amber progress-glow" style={{ width: '47%' }} />
                </div>
                <span className="text-sm text-text-muted">TIER 47 / 100</span>
              </div>
            </div>
            <Link to="/battle-pass" className="btn-secondary text-sm">
              VIEW FULL PASS
            </Link>
          </div>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {rewards.map((reward, i) => (
            <motion.div
              key={reward.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.04, duration: 0.22 }}
              className={`flex-shrink-0 w-48 glass-panel p-3 snap-start border-2 ${rarityColors[reward.rarity]} hover:scale-[1.02] transition-transform duration-220`}
            >
              <div className="aspect-square rounded overflow-hidden mb-2">
                <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs font-medium truncate">{reward.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-text-muted">TIER {reward.tier}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  reward.rarity === 'Legendary' ? 'bg-accent-gold/20 text-accent-gold' :
                  reward.rarity === 'Epic' ? 'bg-accent-violet/20 text-accent-violet' :
                  'bg-accent-teal/20 text-accent-teal'
                }`}>{reward.rarity}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- ECONOMY SECTION ---
function EconomySection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative py-24 bg-void overflow-hidden">
      <div className="hud-grid" style={{ opacity: 0.5 }} />
      <div className="glow-orb glow-orb-teal -bottom-40 -left-40" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.22 }}
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl">YOUR REWARDS. YOUR CURRENCY.</h2>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto">
            Skill earns points. Points become assets. Assets are yours to keep.
          </p>
        </motion.div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {[
            { icon: '/images/economy-atp.png', label: 'AETHERPOINTS', sub: 'Earned through matches', balance: '12,450 ATP', color: 'border-accent-amber', glow: 'shadow-glow' },
            { icon: '/images/economy-xlm.png', label: 'STELLAR XLM', sub: 'On-chain conversion', balance: '340.5 XLM', color: 'border-accent-teal', glow: 'shadow-glow-teal' },
            { icon: '/images/economy-wallet.png', label: 'YOUR WALLET', sub: 'Freighter / Albedo', balance: 'CONNECTED', color: 'border-accent-gold', glow: 'shadow-glow-gold' },
          ].map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.22 }}
              className="flex flex-col items-center"
            >
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full glass-panel ${node.color} border-2 ${node.glow} flex items-center justify-center p-6 hover:scale-105 transition-transform duration-220`}>
                <img src={node.icon} alt={node.label} className="w-full h-full object-contain" />
              </div>
              <h4 className="font-orbitron font-bold text-sm mt-4">{node.label}</h4>
              <p className="text-text-muted text-xs mt-1">{node.sub}</p>
              <p className={`font-orbitron font-bold text-sm mt-1 ${node.color === 'border-accent-amber' ? 'text-accent-amber' : node.color === 'border-accent-teal' ? 'text-accent-teal' : 'text-accent-gold'}`}>
                {node.balance}
              </p>
              {i < 2 && (
                <div className="hidden md:block absolute mt-[-200px] ml-[180px]">
                  <ChevronRight size={24} className="text-accent-teal/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- LEADERBOARD SECTION ---
function LeaderboardSection() {
  const { ref, isInView } = useInView();
  const leaders = [
    { rank: 1, name: 'PHOENIX_RISING', league: 'DIAMOND', points: 24500, winRate: 72.4, medal: 'gold' },
    { rank: 2, name: 'GHOST_WALKER', league: 'DIAMOND', points: 23800, winRate: 68.1, medal: 'silver' },
    { rank: 3, name: 'VIPER_SQUAD', league: 'PLATINUM', points: 22100, winRate: 65.3, medal: 'bronze' },
    { rank: 4, name: 'STORM_BRINGER', league: 'PLATINUM', points: 21500, winRate: 62.7 },
    { rank: 5, name: 'NIGHT_HAWK', league: 'PLATINUM', points: 20900, winRate: 61.2 },
  ];

  const medalColors: Record<string, string> = {
    gold: 'border-l-accent-amber bg-elevated-2/40',
    silver: 'border-l-[#C0C0C0]/50',
    bronze: 'border-l-[#CD7F32]/50',
  };

  return (
    <section ref={ref} className="relative py-24 bg-surface">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.22 }}
          className="text-center mb-12"
        >
          <span className="label-uppercase text-accent-crimson">SEASON 7</span>
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl mt-2">LEAGUE STANDINGS</h2>
          <p className="text-accent-amber font-orbitron font-bold text-xl mt-3 tabular-nums">SEASON ENDS: 14D 08:32:18</p>
        </motion.div>

        <div className="glass-panel overflow-hidden">
          <div className="grid grid-cols-[60px_1fr_100px_80px_80px] gap-4 px-6 py-3 text-xs uppercase tracking-wider text-muted border-b border-border-subtle/30">
            <span>Rank</span>
            <span>Player</span>
            <span>League</span>
            <span className="text-right">Points</span>
            <span className="text-right">Win %</span>
          </div>
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.04, duration: 0.22 }}
              className={`grid grid-cols-[60px_1fr_100px_80px_80px] gap-4 px-6 py-3 items-center border-l-2 border-transparent hover:bg-elevated-2/40 transition-colors ${
                leader.medal ? medalColors[leader.medal] : ''
              }`}
            >
              <span className="font-orbitron font-bold text-accent-amber">#{leader.rank}</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-elevated-2 overflow-hidden">
                  <img src="/images/operator-skin-1.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <span className="font-medium text-sm">{leader.name}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full w-fit ${
                leader.league === 'DIAMOND' ? 'bg-accent-violet/20 text-accent-violet' :
                'bg-accent-teal/20 text-accent-teal'
              }`}>{leader.league}</span>
              <span className="text-right font-orbitron font-bold text-sm">{leader.points.toLocaleString()}</span>
              <span className="text-right text-sm text-accent-teal">{leader.winRate}%</span>
            </motion.div>
          ))}
          {/* Your Position */}
          <div className="border-t-2 border-accent-teal/50 bg-elevated-2/60 px-6 py-3">
            <div className="grid grid-cols-[60px_1fr_100px_80px_80px] gap-4 items-center">
              <span className="font-orbitron font-bold text-accent-teal">#247</span>
              <span className="text-sm font-medium">YOUR POSITION</span>
              <span></span>
              <span className="text-right font-orbitron font-bold text-sm text-accent-teal">8,432</span>
              <span className="text-right text-sm">58.3%</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/leaderboard" className="btn-secondary text-sm">FULL LEADERBOARD</Link>
        </div>
      </div>
    </section>
  );
}

// --- WALLET SECTION ---
function WalletSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative py-24 bg-void overflow-hidden">
      <div className="glow-orb glow-orb-amber top-20 right-20" style={{ animationDelay: '-5s' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.22 }}
          >
            <span className="label-uppercase text-accent-teal">SECURE BY DESIGN</span>
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl mt-2 mb-4">STELLAR WALLET INTEGRATION</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Connect your Freighter or Albedo wallet. Every transaction requires your explicit signature. No silent deductions. Full transparency.
            </p>
            <div className="space-y-3 mb-6">
              {[
                'Non-custodial — we never hold your keys',
                'Every transaction previewed before signing',
                'On-chain explorer links for all operations',
                'Escrow-protected tournament entries',
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-accent-teal flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/wallet" className="btn-teal text-sm inline-flex items-center gap-2">
              <Wallet size={16} />
              CONNECT WALLET
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.22 }}
            className="glass-panel p-6 max-w-sm mx-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img src="/images/economy-wallet.png" alt="Freighter" className="w-8 h-8" />
                <span className="font-medium text-sm">Freighter</span>
              </div>
              <span className="text-[10px] px-2 py-1 bg-accent-teal/20 text-accent-teal rounded-full">NON-CUSTODIAL</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <code className="text-xs text-text-muted bg-elevated px-2 py-1 rounded">G...7X2K</code>
              <button className="text-text-muted hover:text-text-primary">
                <ExternalLink size={14} />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-border-subtle/30">
                <span className="text-sm text-text-muted">ATP Balance</span>
                <span className="font-orbitron font-bold text-accent-amber">12,450</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border-subtle/30">
                <span className="text-sm text-text-muted">XLM Balance</span>
                <span className="font-orbitron font-bold text-accent-teal">340.5</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { type: 'MATCH REWARD', amount: '+250 ATP', color: 'text-accent-teal' },
                { type: 'CONVERSION', amount: '-1000 ATP → +25 XLM', color: 'text-accent-amber' },
                { type: 'TOURNAMENT PRIZE', amount: '+5000 ATP', color: 'text-accent-gold' },
              ].map(tx => (
                <div key={tx.type} className="flex items-center justify-between text-xs py-1">
                  <span className="text-text-muted">{tx.type}</span>
                  <span className={`font-medium ${tx.color}`}>{tx.amount}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- COMMUNITY SECTION ---
function CommunitySection() {
  const { ref, isInView } = useInView();
  const stats = [
    { icon: Users, value: '89,432', label: 'DISCORD MEMBERS' },
    { icon: Gamepad2, value: '142,891', label: 'REGISTERED PLAYERS' },
    { icon: Target, value: '2.4M', label: 'MATCHES PLAYED' },
    { icon: DollarSign, value: '$4.2M', label: 'PRIZES DISTRIBUTED' },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-surface">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.22 }}
          className="font-orbitron font-bold text-3xl md:text-4xl mb-16"
        >
          JOIN THE OPERATORS
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.04, duration: 0.22 }}
              className="flex flex-col items-center"
            >
              <stat.icon size={32} className="text-accent-amber mb-3" />
              <span className="font-orbitron font-bold text-2xl md:text-3xl text-accent-amber tabular-nums">{stat.value}</span>
              <span className="label-uppercase mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.22 }}
          className="glass-panel p-6 inline-flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center">
            <Users size={24} className="text-white" />
          </div>
          <div className="text-left">
            <p className="font-medium text-sm">AetheronDuty Official</p>
            <p className="text-xs text-text-muted">3,241 online now</p>
          </div>
          <button className="btn-teal text-xs py-2 px-4 ml-4">JOIN SERVER</button>
        </motion.div>
      </div>
    </section>
  );
}

// --- TESTIMONIALS SECTION ---
function TestimonialsSection() {
  const { ref, isInView } = useInView();
  const [current, setCurrent] = useState(0);
  const quotes = [
    { text: "AetheronDuty changed how I think about competitive gaming. My tournament winnings are real assets I control.", name: 'PHOENIX_RISING', rank: 'Diamond League', season: 'Season 6 Finalist' },
    { text: "The anti-cheat and transparent brackets make this the most trustworthy platform I've played on.", name: 'GHOST_OPERATOR', rank: 'Platinum League', season: 'Season 6 Semifinalist' },
    { text: "From Bronze to Gold in one season. The skill-based matchmaking is the best in the industry.", name: 'VIPER_SQUAD', rank: 'Gold League', season: 'Season 6 Quarterfinalist' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % quotes.length), 6000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <section ref={ref} className="relative py-24 bg-void">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.22 }}
          className="font-orbitron font-bold text-3xl md:text-4xl text-center mb-12"
        >
          OPERATOR REPORTS
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.22 }}
          className="glass-panel p-8 md:p-12"
        >
          <Quote size={48} className="text-accent-amber mb-6" />
          <p className="text-lg md:text-xl text-text-primary italic leading-relaxed mb-8">
            "{quotes[current].text}"
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-elevated-2 overflow-hidden">
              <img src="/images/operator-skin-1.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-geist font-semibold text-sm">{quotes[current].name}</p>
              <p className="text-xs text-text-muted">{quotes[current].rank} — {quotes[current].season}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center gap-2 mt-6">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-accent-amber' : 'bg-border-subtle'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- ROADMAP SECTION ---
function RoadmapSection() {
  const { ref, isInView } = useInView();
  const items = [
    { quarter: 'Q4 2023', year: 2023, title: 'PLATFORM LAUNCH', desc: 'Beta release with ranked play', status: 'completed' as const },
    { quarter: 'Q1 2024', year: 2024, title: 'TOURNAMENT SYSTEM', desc: 'Full bracket support', status: 'completed' as const },
    { quarter: 'Q2 2024', year: 2024, title: 'STELLAR INTEGRATION', desc: 'Wallet connect + ATP', status: 'completed' as const },
    { quarter: 'Q3 2024', year: 2024, title: 'BATTLE PASS V2', desc: 'Premium reward tracks', status: 'current' as const },
    { quarter: 'Q4 2024', year: 2024, title: 'CLAN WARS', desc: 'Team-based seasonal competitions', status: 'future' as const },
    { quarter: 'Q1 2025', year: 2025, title: 'MARKETPLACE', desc: 'Peer-to-peer asset trading', status: 'future' as const },
  ];

  const statusColors = {
    completed: 'bg-accent-teal',
    current: 'bg-accent-amber animate-pulse',
    future: 'bg-border-subtle',
  };

  return (
    <section ref={ref} className="relative py-24 bg-surface overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.22 }}
          className="font-orbitron font-bold text-3xl md:text-4xl text-center mb-16"
        >
          MISSION TIMELINE
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-6 left-0 right-0 h-px bg-border-subtle hidden md:block" />
          
          <div className="grid md:grid-cols-6 gap-8">
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.04, duration: 0.22 }}
                className="flex flex-col items-center text-center"
              >
                <div className={`w-3 h-3 rounded-full ${statusColors[item.status]} mb-4 relative z-10`} />
                <span className="text-[10px] text-text-muted uppercase">{item.quarter}</span>
                <h4 className="font-geist font-semibold text-sm mt-1">{item.title}</h4>
                <p className="text-xs text-text-muted mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- FAQ SECTION ---
function FAQSection() {
  const { ref, isInView } = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: 'How do I start earning AetherPoints?', a: 'Play ranked matches. Every match awards ATP based on your performance, win streaks, and rank tier.' },
    { q: 'What wallets are supported?', a: 'We support Freighter and Albedo wallets on the Stellar network. Both are non-custodial browser extensions.' },
    { q: 'How does tournament entry work?', a: 'Tournament entries are held in Soroban escrow smart contracts. When the tournament completes, prizes are automatically distributed based on final standings.' },
    { q: 'Is there a pay-to-win element?', a: 'No. All gameplay-affecting progression is earned through skill. Battle Pass and Marketplace items are cosmetic only.' },
    { q: 'How do I withdraw my earnings?', a: 'Convert ATP to XLM in your wallet, then use any Stellar exchange or keep it in your wallet.' },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-void">
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.22 }}
          className="font-orbitron font-bold text-3xl md:text-4xl text-center mb-12"
        >
          OPERATOR BRIEFING
        </motion.h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.04, duration: 0.22 }}
              className="glass-panel overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-geist font-semibold text-sm">{faq.q}</span>
                <ChevronDown 
                  size={16} 
                  className={`text-accent-amber transition-transform duration-220 ${openIndex === i ? 'rotate-180' : ''}`} 
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 text-sm text-text-secondary">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="bg-surface border-t border-border-subtle/30">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/images/economy-atp.png" alt="Logo" className="w-8 h-8" />
              <span className="font-orbitron font-bold text-sm">AETHERONDUTY</span>
            </div>
            <p className="text-text-muted text-sm">Fight. Compete. Earn.</p>
          </div>
          <div>
            <h4 className="label-uppercase mb-4">PLATFORM</h4>
            <div className="space-y-2">
              {['Home', 'Play', 'Compete', 'Leaderboards', 'Battle Pass'].map(link => (
                <Link key={link} to={`/${link.toLowerCase().replace(' ', '-')}`} className="block text-text-muted hover:text-text-primary text-sm transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="label-uppercase mb-4">SUPPORT</h4>
            <div className="space-y-2">
              {['FAQ', 'Contact', 'Bug Report', 'Status Page'].map(link => (
                <a key={link} href="#" className="block text-text-muted hover:text-text-primary text-sm transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="label-uppercase mb-4">LEGAL</h4>
            <div className="space-y-2">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map(link => (
                <a key={link} href="#" className="block text-text-muted hover:text-text-primary text-sm transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border-subtle/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-disabled text-xs">© 2024 AetheronDuty. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-text-muted">EN ▾</span>
            <div className="flex items-center gap-3">
              {['Discord', 'X', 'YouTube', 'Twitch'].map(social => (
                <a key={social} href="#" className="text-text-muted hover:text-text-primary transition-colors text-xs uppercase">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- MAIN LANDING PAGE ---
export default function LandingPage() {
  return (
    <div className="bg-void">
      <HeroSection />
      <FeaturesSection />
      <TournamentSection />
      <BattlePassSection />
      <EconomySection />
      <LeaderboardSection />
      <WalletSection />
      <CommunitySection />
      <TestimonialsSection />
      <RoadmapSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
