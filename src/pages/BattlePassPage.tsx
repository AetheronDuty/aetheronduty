import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, Zap } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';

const tiers = Array.from({ length: 20 }, (_, i) => {
  const tier = i + 40;
  const rarities = ['Common', 'Rare', 'Epic', 'Legendary'] as const;
  const types = ['skin', 'operator', 'weapon', 'emote', 'charm', 'currency'] as const;
  const names = [
    'Crystal Eagle Charm', 'Phoenix Emblem', 'Tactical ATV', 'Solar Flare AR',
    'Phoenix Rising Skin', '500 ATP', 'XP Boost', 'Elite Emote',
    'Winter Camo', 'Diamond Badge', '1000 ATP', 'Legendary Crate',
    'Ghost Walker Skin', 'Platinum Frame', '2000 ATP', 'Premium Pass',
    'Champion Title', 'Season 7 Banner', '5000 ATP', 'Mythic Skin'
  ];
  
  return {
    tier,
    free: i % 3 === 0 ? { name: names[i * 2], rarity: rarities[i % 3], type: types[i % 6], image: i % 2 === 0 ? '/images/battle-pass-reward-1.jpg' : '/images/battle-pass-reward-2.jpg' } : null,
    premium: { name: names[i * 2 + 1], rarity: rarities[(i + 1) % 4], type: types[(i + 2) % 6], image: i % 2 === 0 ? '/images/battle-pass-reward-3.jpg' : '/images/weapon-blueprint-1.jpg' },
    unlocked: tier <= 47,
    claimed: tier <= 46,
  };
});

const rarityColors = {
  Common: 'border-border-subtle',
  Rare: 'border-accent-teal',
  Epic: 'border-accent-violet',
  Legendary: 'border-accent-gold',
};

const rarityBadges = {
  Common: 'bg-border-subtle/10 text-text-muted',
  Rare: 'bg-accent-teal/20 text-accent-teal',
  Epic: 'bg-accent-violet/20 text-accent-violet',
  Legendary: 'bg-accent-gold/20 text-accent-gold',
};

export default function BattlePassPage() {
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const { ref, isInView } = useInView();
  const currentTier = 47;
  const progress = (currentTier / 100) * 100;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="label-uppercase text-accent-amber">SEASON 7</span>
        <h1 className="font-orbitron font-bold text-3xl mt-1">WINTER SIEGE BATTLE PASS</h1>
        
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 h-3 bg-elevated rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-accent-amber to-accent-gold progress-glow"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span className="font-orbitron font-bold text-accent-amber tabular-nums whitespace-nowrap">
            TIER {currentTier} / 100
          </span>
        </div>
        <p className="text-xs text-text-muted mt-2">2,340 / 3,000 XP to Tier 48</p>

        <label className="flex items-center gap-2 mt-4 cursor-pointer">
          <div 
            onClick={() => setShowFreeOnly(!showFreeOnly)}
            className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative ${showFreeOnly ? 'bg-accent-teal' : 'bg-elevated'}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${showFreeOnly ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-xs text-text-muted">SHOW FREE ONLY</span>
        </label>
      </div>

      {/* Tier Track */}
      <div ref={ref} className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.tier}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.02, duration: 0.22 }}
            className="flex-shrink-0 snap-start"
          >
            {/* Tier Number */}
            <div className="text-center mb-2">
              <span className={`font-orbitron font-bold text-xs ${tier.unlocked ? 'text-accent-amber' : 'text-text-muted'}`}>
                TIER {tier.tier}
              </span>
            </div>
            
            <div className="space-y-2">
              {/* Free Reward */}
              {!showFreeOnly && tier.free && (
                <div className={`w-36 glass-panel p-2 border ${tier.claimed ? rarityColors[tier.free.rarity] : 'border-border-subtle/30'} ${!tier.unlocked ? 'opacity-40' : ''}`}>
                  <div className="aspect-square rounded overflow-hidden mb-1.5 relative">
                    <img src={tier.free.image} alt={tier.free.name} className="w-full h-full object-cover" />
                    {tier.claimed && <div className="absolute inset-0 bg-accent-teal/20 flex items-center justify-center"><Check size={20} className="text-accent-teal" /></div>}
                    {!tier.unlocked && <div className="absolute inset-0 bg-void/60 flex items-center justify-center"><Lock size={16} className="text-text-muted" /></div>}
                  </div>
                  <p className="text-[10px] font-medium truncate">{tier.free.name}</p>
                  <span className={`text-[8px] px-1 py-0.5 rounded ${rarityBadges[tier.free.rarity]}`}>{tier.free.rarity}</span>
                </div>
              )}
              
              {/* Premium Reward */}
              <div className={`w-36 glass-panel p-2 border-2 ${tier.claimed ? rarityColors[tier.premium.rarity] : 'border-accent-gold/30'} ${!tier.unlocked ? 'opacity-40' : ''} ${tier.tier === currentTier ? 'ring-2 ring-accent-amber shadow-glow' : ''}`}>
                <div className="aspect-square rounded overflow-hidden mb-1.5 relative">
                  <img src={tier.premium.image} alt={tier.premium.name} className="w-full h-full object-cover" />
                  {tier.tier === currentTier && (
                    <div className="absolute top-1 right-1">
                      <Zap size={12} className="text-accent-amber" />
                    </div>
                  )}
                  {tier.claimed && <div className="absolute inset-0 bg-accent-teal/20 flex items-center justify-center"><Check size={20} className="text-accent-teal" /></div>}
                  {!tier.unlocked && <div className="absolute inset-0 bg-void/60 flex items-center justify-center"><Lock size={16} className="text-text-muted" /></div>}
                </div>
                <p className="text-[10px] font-medium truncate">{tier.premium.name}</p>
                <span className={`text-[8px] px-1 py-0.5 rounded ${rarityBadges[tier.premium.rarity]}`}>{tier.premium.rarity}</span>
              </div>
            </div>

            {/* Claim Button */}
            {tier.unlocked && !tier.claimed && tier.tier === currentTier && (
              <button className="w-full mt-2 btn-primary text-[10px] py-1.5">CLAIM</button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="mt-8 glass-panel p-6 max-w-lg">
        <h3 className="font-orbitron font-bold text-sm mb-4">YOUR PROGRESS</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Tiers Unlocked</span>
            <span className="font-bold">47 / 100</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Rewards Claimed</span>
            <span className="font-bold text-accent-teal">46</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Premium Rewards</span>
            <span className="font-bold text-accent-gold">47 / 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
