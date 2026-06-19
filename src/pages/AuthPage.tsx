import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ChevronRight, Shield, Lock, Key, ArrowLeft, CheckCircle, Wallet } from 'lucide-react';

function LoginForm({ onSwitch }: { onSwitch: (tab: string) => void }) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email';
    if (!password) errs.password = 'Password required';
    else if (password.length < 6) errs.password = 'Min 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Login logic
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label-uppercase mb-2 block">EMAIL</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="operator@aetheron.gg"
          className={`input-glass w-full ${errors.email ? 'input-error' : ''}`}
        />
        {errors.email && <p className="text-accent-crimson text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="label-uppercase mb-2 block">PASSWORD</label>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`input-glass w-full pr-10 ${errors.password ? 'input-error' : ''}`}
          />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-accent-crimson text-xs mt-1">{errors.password}</p>}
      </div>
      <button type="button" onClick={() => onSwitch('forgot')} className="text-accent-teal text-xs hover:underline">
        FORGOT PASSWORD?
      </button>
      <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
        SIGN IN
        <ChevronRight size={16} />
      </button>
    </form>
  );
}

function RegisterForm() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '', agreed: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.username) errs.username = 'Username required';
    else if (form.username.length < 3) errs.username = 'Min 3 characters';
    if (!form.email) errs.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password) errs.password = 'Password required';
    else if (form.password.length < 6) errs.password = 'Min 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (!form.agreed) errs.agreed = 'You must agree to the terms';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Register logic
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label-uppercase mb-2 block">USERNAME</label>
        <input
          type="text"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          placeholder="OperatorTag"
          className={`input-glass w-full ${errors.username ? 'input-error' : ''}`}
        />
        {errors.username && <p className="text-accent-crimson text-xs mt-1">{errors.username}</p>}
      </div>
      <div>
        <label className="label-uppercase mb-2 block">EMAIL</label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="operator@aetheron.gg"
          className={`input-glass w-full ${errors.email ? 'input-error' : ''}`}
        />
        {errors.email && <p className="text-accent-crimson text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="label-uppercase mb-2 block">PASSWORD</label>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            className={`input-glass w-full pr-10 ${errors.password ? 'input-error' : ''}`}
          />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-accent-crimson text-xs mt-1">{errors.password}</p>}
      </div>
      <div>
        <label className="label-uppercase mb-2 block">CONFIRM PASSWORD</label>
        <input
          type="password"
          value={form.confirm}
          onChange={e => setForm({ ...form, confirm: e.target.value })}
          placeholder="••••••••"
          className={`input-glass w-full ${errors.confirm ? 'input-error' : ''}`}
        />
        {errors.confirm && <p className="text-accent-crimson text-xs mt-1">{errors.confirm}</p>}
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.agreed}
          onChange={e => setForm({ ...form, agreed: e.target.checked })}
          className="rounded border-border-subtle bg-elevated accent-accent-amber"
        />
        <span className="text-xs text-text-secondary">I agree to the <a href="#" className="text-accent-amber hover:underline">Terms of Service</a></span>
      </label>
      {errors.agreed && <p className="text-accent-crimson text-xs">{errors.agreed}</p>}
      <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
        CREATE ACCOUNT
        <ChevronRight size={16} />
      </button>
    </form>
  );
}

function WalletConnectForm({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-text-muted hover:text-text-primary text-xs mb-2">
        <ArrowLeft size={14} /> BACK
      </button>
      
      <div className="text-center mb-4">
        <Wallet size={32} className="text-accent-teal mx-auto mb-2" />
        <h3 className="font-orbitron font-bold text-lg">CONNECT WALLET</h3>
        <p className="text-text-muted text-xs mt-1">
          Connect your Stellar wallet to manage rewards. We never hold your keys.
        </p>
      </div>

      <div className="space-y-2">
        {[
          { id: 'freighter', name: 'Freighter', desc: 'Browser Extension', icon: '/images/economy-wallet.png' },
          { id: 'albedo', name: 'Albedo', desc: 'Web Wallet', icon: '/images/economy-xlm.png' },
        ].map(wallet => (
          <button
            key={wallet.id}
            onClick={() => setSelected(wallet.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-md border transition-all ${
              selected === wallet.id 
                ? 'border-accent-teal bg-accent-teal/10' 
                : 'border-border-subtle/50 hover:border-accent-teal/30 hover:bg-elevated-2/40'
            }`}
          >
            <img src={wallet.icon} alt={wallet.name} className="w-8 h-8 rounded" />
            <div className="text-left">
              <p className="font-medium text-sm">{wallet.name}</p>
              <p className="text-[10px] text-text-muted">{wallet.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass-panel p-3 text-xs text-text-muted space-y-2"
        >
          <p className="font-medium text-text-primary">Before you sign:</p>
          <div className="flex items-center gap-2"><CheckCircle size={12} className="text-accent-teal" /> View wallet balance</div>
          <div className="flex items-center gap-2"><CheckCircle size={12} className="text-accent-teal" /> Request transaction signatures</div>
          <div className="flex items-center gap-2"><Lock size={12} className="text-accent-crimson" /> Never access private keys</div>
          <button className="btn-teal w-full text-xs py-2 mt-2">REQUEST SIGNATURE</button>
        </motion.div>
      )}
    </div>
  );
}

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get('tab') === 'register' ? 'register' : 'login');
  const [showWallet, setShowWallet] = useState(false);

  const switchTab = (t: string) => {
    setTab(t);
    setShowWallet(false);
    if (t === 'register') setSearchParams({ tab: 'register' });
    else setSearchParams({});
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-surface relative">
        <div className="hud-grid" />
        <div className="relative z-10 w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src="/images/economy-atp.png" alt="Logo" className="w-10 h-10" />
              <span className="font-orbitron font-bold text-accent-amber text-lg">AETHERONDUTY</span>
            </Link>
          </div>

          {/* Tabs */}
          {!showWallet && (
            <div className="flex mb-6 border-b border-border-subtle">
              <button
                onClick={() => switchTab('login')}
                className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  tab === 'login' ? 'text-accent-amber border-b-2 border-accent-amber' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                SIGN IN
              </button>
              <button
                onClick={() => switchTab('register')}
                className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  tab === 'register' ? 'text-accent-amber border-b-2 border-accent-amber' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                SIGN UP
              </button>
            </div>
          )}

          {/* Forms */}
          <AnimatePresence mode="wait">
            {showWallet ? (
              <motion.div key="wallet" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <WalletConnectForm onBack={() => setShowWallet(false)} />
              </motion.div>
            ) : tab === 'login' ? (
              <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LoginForm onSwitch={switchTab} />
              </motion.div>
            ) : (
              <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <RegisterForm />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Login */}
          {!showWallet && (
            <>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border-subtle" />
                <span className="text-[10px] text-text-muted uppercase">OR</span>
                <div className="flex-1 h-px bg-border-subtle" />
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 glass-panel text-xs font-medium hover:bg-elevated-2/60 transition-colors">
                  <Users size={16} /> Discord Login
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 glass-panel text-xs font-medium hover:bg-elevated-2/60 transition-colors">
                  <Shield size={16} /> Google Login
                </button>
                <button 
                  onClick={() => setShowWallet(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-accent-teal/30 text-accent-teal text-xs font-medium hover:bg-accent-teal/10 transition-colors rounded-md"
                >
                  <Key size={16} /> Wallet Connect
                </button>
              </div>
            </>
          )}

          {/* Back to home */}
          <div className="text-center mt-8">
            <Link to="/" className="text-text-muted hover:text-text-primary text-xs transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Cinematic Art */}
      <div className="hidden lg:block lg:w-[45%] relative">
        <img 
          src="/images/auth-character.jpg" 
          alt="Tactical Operator" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/50 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <h2 className="font-orbitron font-bold text-2xl text-text-primary mb-2">JOIN THE ELITE</h2>
          <p className="text-text-secondary text-sm">Fight. Compete. Earn. Your skill determines your rewards.</p>
        </div>
      </div>
    </div>
  );
}

function Users(props: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
