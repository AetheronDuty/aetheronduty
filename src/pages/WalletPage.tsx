import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowDownLeft, ArrowUpRight, Repeat, ExternalLink, CheckCircle, Clock, XCircle, Copy, Zap } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimation';

const transactions = [
  { id: 1, type: 'match_reward', description: 'Ranked Match Win', amount: 250, currency: 'ATP' as const, fee: 0, status: 'confirmed' as const, timestamp: '2 min ago', explorerUrl: '#' },
  { id: 2, type: 'conversion', description: 'ATP → XLM', amount: -1000, currency: 'ATP' as const, fee: 0.0001, status: 'confirmed' as const, timestamp: '15 min ago', explorerUrl: '#' },
  { id: 3, type: 'conversion', description: 'ATP → XLM', amount: 25, currency: 'XLM' as const, fee: 0, status: 'confirmed' as const, timestamp: '15 min ago', explorerUrl: '#' },
  { id: 4, type: 'tournament_prize', description: 'Weekend Cup Prize', amount: 5000, currency: 'ATP' as const, fee: 0, status: 'confirmed' as const, timestamp: '2 hours ago', explorerUrl: '#' },
  { id: 5, type: 'purchase', description: 'Battle Pass Premium', amount: -1500, currency: 'ATP' as const, fee: 0, status: 'confirmed' as const, timestamp: '1 day ago', explorerUrl: '#' },
  { id: 6, type: 'withdrawal', description: 'XLM Withdrawal', amount: -50, currency: 'XLM' as const, fee: 0.00001, status: 'pending' as const, timestamp: '1 day ago', explorerUrl: '#' },
];

const typeIcons: Record<string, React.ElementType> = {
  match_reward: Zap,
  conversion: Repeat,
  tournament_prize: CheckCircle,
  withdrawal: ArrowUpRight,
  deposit: ArrowDownLeft,
  purchase: Wallet,
  battle_pass: Wallet,
  entry_fee: Wallet,
};

const typeColors: Record<string, string> = {
  match_reward: 'text-accent-teal',
  conversion: 'text-accent-amber',
  tournament_prize: 'text-accent-gold',
  withdrawal: 'text-text-primary',
  deposit: 'text-accent-teal',
  purchase: 'text-accent-crimson',
  battle_pass: 'text-accent-violet',
  entry_fee: 'text-text-muted',
};

const statusIcons = {
  confirmed: <CheckCircle size={14} className="text-accent-teal" />,
  pending: <Clock size={14} className="text-accent-amber" />,
  failed: <XCircle size={14} className="text-accent-crimson" />,
};

export default function WalletPage() {
  const [showConvert, setShowConvert] = useState(false);
  const { ref, isInView } = useInView();

  const copyAddress = () => {
    navigator.clipboard.writeText('GB3QJ7YQ3...X2K');
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-orbitron font-bold text-2xl">WALLET</h1>
          <div className="flex items-center gap-2 mt-2">
            <code className="text-xs text-text-muted bg-elevated px-2 py-1 rounded">G...7X2K</code>
            <button onClick={copyAddress} className="text-text-muted hover:text-text-primary transition-colors">
              <Copy size={14} />
            </button>
            <a href="#" className="text-text-muted hover:text-accent-teal transition-colors">
              <ExternalLink size={14} />
            </a>
            <span className="text-[10px] px-2 py-0.5 bg-accent-teal/20 text-accent-teal rounded-full">NON-CUSTODIAL</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowConvert(true)} className="btn-amber text-xs py-2 px-4 flex items-center gap-2">
            <Repeat size={14} /> CONVERT
          </button>
          <button className="btn-teal text-xs py-2 px-4 flex items-center gap-2">
            <ArrowDownLeft size={14} /> DEPOSIT
          </button>
        </div>
      </div>

      {/* Balance Cards */}
      <div ref={ref} className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'AETHERPOINTS', value: '12,450', symbol: 'ATP', icon: '/images/economy-atp.png', color: 'text-accent-amber', border: 'border-accent-amber/30', actions: ['EARN', 'CONVERT'] },
          { label: 'STELLAR LUMENS', value: '340.5', symbol: 'XLM', icon: '/images/economy-xlm.png', color: 'text-accent-teal', border: 'border-accent-teal/30', actions: ['DEPOSIT', 'WITHDRAW'] },
          { label: 'ESTIMATED VALUE', value: '$89.42', symbol: 'USD', icon: '/images/economy-wallet.png', color: 'text-accent-gold', border: 'border-accent-gold/30', actions: [] },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.04, duration: 0.22 }}
            className={`glass-panel p-6 border ${card.border}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <img src={card.icon} alt={card.symbol} className="w-10 h-10" />
              <span className="label-uppercase">{card.label}</span>
            </div>
            <p className={`font-orbitron font-bold text-3xl ${card.color} tabular-nums`}>{card.value}</p>
            <p className="text-xs text-text-muted mt-1">{card.symbol}</p>
            {card.actions.length > 0 && (
              <div className="flex gap-2 mt-4">
                {card.actions.map(a => (
                  <button key={a} className="btn-ghost text-[10px] py-1.5 px-3">{a}</button>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Conversion Modal */}
      {showConvert && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 mb-8 max-w-md"
        >
          <h3 className="font-orbitron font-bold text-sm mb-4">CONVERT ATP → XLM</h3>
          <div className="space-y-4">
            <div>
              <label className="label-uppercase mb-2 block">AMOUNT (ATP)</label>
              <div className="relative">
                <input type="number" placeholder="1000" className="input-glass w-full pr-16" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-accent-amber font-bold">MAX</button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>Exchange Rate: 1 XLM = 40 ATP</span>
              <span>Network Fee: 0.00001 XLM</span>
            </div>
            <div className="glass-panel p-3 text-xs">
              <div className="flex justify-between mb-1">
                <span className="text-text-muted">You will send</span>
                <span className="font-bold">1,000 ATP</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-text-muted">Fee</span>
                <span className="text-text-muted">0.00001 XLM</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border-subtle/30">
                <span className="text-text-muted">You will receive</span>
                <span className="font-orbitron font-bold text-accent-teal">24.99975 XLM</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowConvert(false)} className="btn-secondary flex-1 text-xs py-2">CANCEL</button>
              <button className="btn-teal flex-1 text-xs py-2">CONFIRM CONVERSION</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Transaction History */}
      <div>
        <h3 className="font-orbitron font-bold text-sm mb-4">TRANSACTION HISTORY</h3>
        <div className="glass-panel overflow-hidden">
          <div className="grid grid-cols-[40px_1fr_80px_60px_40px_80px_30px] gap-2 px-4 py-3 text-[10px] uppercase tracking-wider text-muted border-b border-border-subtle/30">
            <span>Type</span>
            <span>Description</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Fee</span>
            <span>Status</span>
            <span className="text-right">Time</span>
            <span></span>
          </div>
          {transactions.map(tx => {
            const Icon = typeIcons[tx.type];
            return (
              <div key={tx.id} className="grid grid-cols-[40px_1fr_80px_60px_40px_80px_30px] gap-2 px-4 py-2.5 items-center border-b border-border-subtle/20 hover:bg-elevated-2/30 transition-colors">
                <Icon size={16} className={typeColors[tx.type]} />
                <span className="text-xs truncate">{tx.description}</span>
                <span className={`text-right text-xs font-bold tabular-nums ${tx.amount > 0 ? 'text-accent-teal' : 'text-text-primary'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} {tx.currency}
                </span>
                <span className="text-right text-[10px] text-text-muted tabular-nums">{tx.fee > 0 ? tx.fee : '—'}</span>
                <span>{statusIcons[tx.status]}</span>
                <span className="text-right text-[10px] text-text-muted">{tx.timestamp}</span>
                <a href={tx.explorerUrl} className="text-text-muted hover:text-accent-teal">
                  <ExternalLink size={12} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
