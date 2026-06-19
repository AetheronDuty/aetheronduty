import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, ChevronRight } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';

const featuredBundles = [
  { id: 1, name: 'WINTER SIEGE OPERATOR PACK', items: 8, price: 2500, currency: 'ATP', image: '/images/marketplace-bundle.jpg', rarity: 'Legendary' as const, discount: 20 },
  { id: 2, name: 'TACTICAL ELITE BUNDLE', items: 5, price: 50, currency: 'XLM', image: '/images/tournament-banner-1.jpg', rarity: 'Epic' as const, discount: 15 },
];

const items = [
  { id: 1, name: 'Phoenix Rising Skin', category: 'skin', rarity: 'Legendary' as const, price: 1200, currency: 'ATP', image: '/images/operator-skin-1.jpg', owned: false, wishlisted: false },
  { id: 2, name: 'Solar Flare AR', category: 'weapon', rarity: 'Epic' as const, price: 800, currency: 'ATP', image: '/images/weapon-blueprint-1.jpg', owned: false, wishlisted: true },
  { id: 3, name: 'Crystal Eagle Charm', category: 'charm', rarity: 'Rare' as const, price: 300, currency: 'ATP', image: '/images/battle-pass-reward-1.jpg', owned: true, wishlisted: false },
  { id: 4, name: 'Tactical ATV', category: 'skin', rarity: 'Legendary' as const, price: 25, currency: 'XLM', image: '/images/battle-pass-reward-3.jpg', owned: false, wishlisted: false },
  { id: 5, name: 'Phoenix Emblem', category: 'skin', rarity: 'Rare' as const, price: 150, currency: 'ATP', image: '/images/battle-pass-reward-2.jpg', owned: false, wishlisted: false },
  { id: 6, name: 'Winter Camo Pack', category: 'skin', rarity: 'Epic' as const, price: 600, currency: 'ATP', image: '/images/tournament-banner-2.jpg', owned: false, wishlisted: false },
  { id: 7, name: 'Elite Operator Frame', category: 'skin', rarity: 'Epic' as const, price: 15, currency: 'XLM', image: '/images/profile-banner.jpg', owned: true, wishlisted: false },
  { id: 8, name: 'Season 7 Banner', category: 'skin', rarity: 'Rare' as const, price: 200, currency: 'ATP', image: '/images/hero-character.jpg', owned: false, wishlisted: false },
];

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

export default function MarketplacePage() {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const { ref, isInView } = useInView();

  const categories = ['All', 'Skins', 'Weapons', 'Charms', 'Bundles'];

  const filtered = items.filter(item => {
    if (category !== 'all' && item.category !== category) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <h1 className="font-orbitron font-bold text-2xl mb-6">MARKETPLACE</h1>

      {/* Featured Carousel */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8 snap-x snap-mandatory">
        {featuredBundles.map((bundle, i) => (
          <motion.div
            key={bundle.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.22 }}
            className="flex-shrink-0 w-[450px] snap-start glass-panel-hover overflow-hidden"
          >
            <div className="relative h-48">
              <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-elevated via-elevated/40 to-transparent" />
              {bundle.discount && (
                <span className="absolute top-3 left-3 bg-accent-crimson text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  -{bundle.discount}%
                </span>
              )}
              <span className={`absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full ${rarityBadges[bundle.rarity]}`}>
                {bundle.rarity}
              </span>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-orbitron font-bold text-lg">{bundle.name}</h3>
                <p className="text-xs text-text-muted mt-1">{bundle.items} items</p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`font-orbitron font-bold text-lg ${bundle.currency === 'ATP' ? 'text-accent-amber' : 'text-accent-teal'}`}>
                    {bundle.price} {bundle.currency}
                  </span>
                  <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1">
                    VIEW BUNDLE <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-glass w-full pl-9 pr-4 py-2 text-sm"
          />
        </div>
        <div className="flex gap-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c.toLowerCase())}
              className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-colors ${
                category === c.toLowerCase() ? 'bg-accent-amber text-void' : 'glass-panel text-text-muted hover:text-text-primary'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} className="input-glass text-xs py-2 pr-8">
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rarity">Rarity</option>
        </select>
      </div>

      {/* Items Grid */}
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.03, duration: 0.22 }}
            className={`glass-panel-hover overflow-hidden group ${rarityColors[item.rarity]} border-2`}
          >
            <div className="relative aspect-square overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-220" />
              <button className="absolute top-2 right-2 w-7 h-7 glass-panel rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart size={14} className={item.wishlisted ? 'text-accent-crimson fill-accent-crimson' : 'text-text-muted'} />
              </button>
              {item.owned && (
                <div className="absolute inset-0 bg-void/60 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent-teal bg-accent-teal/20 px-2 py-0.5 rounded">OWNED</span>
                </div>
              )}
            </div>
            <div className="p-3">
              <span className={`text-[8px] px-1.5 py-0.5 rounded ${rarityBadges[item.rarity]}`}>{item.rarity}</span>
              <p className="font-medium text-xs mt-1 truncate">{item.name}</p>
              <p className="text-[10px] text-text-muted capitalize">{item.category}</p>
              <div className="flex items-center justify-between mt-2">
                <span className={`font-orbitron font-bold text-sm ${item.currency === 'ATP' ? 'text-accent-amber' : 'text-accent-teal'}`}>
                  {item.price} {item.currency}
                </span>
                {!item.owned && (
                  <button className="btn-primary text-[10px] py-1.5 px-3">BUY</button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
