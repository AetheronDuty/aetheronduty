// Player Types
export interface Player {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  banner?: string;
  level: number;
  xp: number;
  xpToNext: number;
  rank: RankTier;
  kd: number;
  wins: number;
  matches: number;
  winRate: number;
  status: PlayerStatus;
  league?: string;
  clan?: Clan;
  wallet?: Wallet;
  createdAt: string;
}

export type RankTier = 
  | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Master' | 'Grandmaster';

export type PlayerStatus = 'online' | 'in-game' | 'away' | 'offline';

// Match Types
export interface Match {
  id: string;
  mode: GameMode;
  map: string;
  result: 'win' | 'loss' | 'draw';
  kills: number;
  deaths: number;
  assists: number;
  score: number;
  duration: number;
  date: string;
  xpEarned: number;
  atpEarned: number;
}

export type GameMode = 
  | 'Solo' | '1v1' | 'Ranked' | 'Squad' | 'Tournament' | 'League' | 'Custom';

// Tournament Types
export interface Tournament {
  id: string;
  name: string;
  description: string;
  banner: string;
  status: TournamentStatus;
  mode: GameMode;
  format: 'single-elim' | 'double-elim' | 'round-robin';
  prizePool: number;
  prizeCurrency: 'USD' | 'XLM' | 'ATP';
  entryFee: number;
  entryFeeCurrency: 'ATP' | 'XLM' | 'FREE';
  maxParticipants: number;
  currentParticipants: number;
  region: string;
  startTime: string;
  endTime?: string;
  registered: boolean;
  bracket?: Bracket;
}

export type TournamentStatus = 'upcoming' | 'registering' | 'live' | 'completed';

export interface Bracket {
  rounds: BracketRound[];
}

export interface BracketRound {
  round: number;
  name: string;
  matches: BracketMatch[];
}

export interface BracketMatch {
  id: string;
  player1?: BracketPlayer;
  player2?: BracketPlayer;
  winner?: string;
  score1?: number;
  score2?: number;
  status: 'pending' | 'live' | 'completed';
}

export interface BracketPlayer {
  id: string;
  name: string;
  avatar: string;
  seed: number;
}

// Battle Pass Types
export interface BattlePass {
  season: number;
  seasonName: string;
  currentTier: number;
  totalTiers: number;
  currentXP: number;
  xpPerTier: number;
  isPremium: boolean;
  tiers: BattlePassTier[];
}

export interface BattlePassTier {
  tier: number;
  freeReward?: BattlePassReward;
  premiumReward?: BattlePassReward;
  unlocked: boolean;
  claimed: boolean;
}

export interface BattlePassReward {
  id: string;
  name: string;
  type: RewardType;
  rarity: Rarity;
  image: string;
}

export type RewardType = 
  | 'skin' | 'operator' | 'weapon' | 'emote' | 'charm' | 'currency' | 'xp_boost';

export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

// Wallet Types
export interface Wallet {
  address: string;
  type: 'freighter' | 'albedo' | 'rabet';
  atpBalance: number;
  xlmBalance: number;
  usdValue: number;
  connected: boolean;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  currency: 'ATP' | 'XLM' | 'USD';
  fee?: number;
  status: 'confirmed' | 'pending' | 'failed';
  timestamp: string;
  explorerUrl?: string;
}

export type TransactionType = 
  | 'match_reward' | 'conversion' | 'tournament_prize' | 'withdrawal' 
  | 'deposit' | 'purchase' | 'battle_pass' | 'entry_fee';

// Marketplace Types
export interface MarketItem {
  id: string;
  name: string;
  type: RewardType;
  rarity: Rarity;
  category: 'skin' | 'operator' | 'weapon' | 'emote' | 'bundle';
  image: string;
  price: number;
  priceCurrency: 'ATP' | 'XLM';
  originalPrice?: number;
  owned: boolean;
  equipped: boolean;
  wishlisted: boolean;
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  player: PlayerSummary;
  points: number;
  winRate: number;
  matches: number;
  trend: number;
  league: string;
}

export interface PlayerSummary {
  id: string;
  username: string;
  avatar: string;
  rank: RankTier;
}

// Mission Types
export interface Mission {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'seasonal';
  progress: number;
  total: number;
  reward: number;
  rewardCurrency: 'ATP' | 'XP';
  completed: boolean;
  claimed: boolean;
  icon: string;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: Rarity;
  progress: number;
  total: number;
  unlocked: boolean;
  unlockedAt?: string;
}

// Clan Types
export interface Clan {
  id: string;
  name: string;
  tag: string;
  avatar: string;
  banner?: string;
  members: ClanMember[];
  maxMembers: number;
  points: number;
  rank: number;
  warsWon: number;
}

export interface ClanMember {
  player: PlayerSummary;
  role: 'leader' | 'officer' | 'member';
  joinedAt: string;
}

// Friend Types
export interface Friend {
  player: PlayerSummary;
  status: PlayerStatus;
  friendSince: string;
  canInvite: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
  persistent: boolean;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'achievement';

// Stats Types
export interface PlayerStats {
  overall: OverallStats;
  weapons: WeaponStat[];
  modes: ModeStat[];
  recentMatches: Match[];
}

export interface OverallStats {
  kd: number;
  wins: number;
  losses: number;
  draws: number;
  matches: number;
  winRate: number;
  avgKills: number;
  avgDeaths: number;
  headshotRate: number;
  accuracy: number;
  playTime: number;
}

export interface WeaponStat {
  weapon: string;
  image: string;
  kills: number;
  accuracy: number;
  usage: number;
  kd: number;
}

export interface ModeStat {
  mode: GameMode;
  matches: number;
  wins: number;
  winRate: number;
  avgScore: number;
}

// Roadmap Types
export interface RoadmapItem {
  quarter: string;
  year: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'future';
}

// FAQ Types
export interface FAQItem {
  question: string;
  answer: string;
}
