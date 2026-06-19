import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Zap, Globe } from 'lucide-react';
import { useApp } from '@/hooks/useApp';

export default function Navbar() {
  const { notifications } = useApp();
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 glass-panel border-b-0 border-l-0 border-r-0 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left: Search */}
      <div className="relative w-80">
        <Search 
          size={16} 
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${searchFocused ? 'text-accent-teal' : 'text-muted'}`} 
        />
        <input
          type="text"
          placeholder="Search players, tournaments..."
          className="w-full bg-elevated/60 border border-border-subtle/50 rounded-md pl-10 pr-4 py-2 text-sm text-text-primary placeholder:text-muted focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30 transition-all duration-120 outline-none"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      {/* Center: Season Badge */}
      <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-elevated/60 border border-accent-amber/30 rounded-full">
        <span className="text-accent-amber text-xs font-orbitron font-bold tracking-wider">SEASON 7</span>
        <span className="text-border-subtle">|</span>
        <span className="text-text-muted text-xs uppercase tracking-wider">WINTER SIEGE</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* ATP Balance */}
        <Link to="/wallet" className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-elevated/60 border border-accent-amber/20 rounded-md hover:border-accent-amber/50 transition-colors">
          <Zap size={14} className="text-accent-amber" />
          <span className="text-accent-amber font-orbitron font-bold text-sm tabular-nums">12,450</span>
          <span className="text-text-muted text-[10px] uppercase">ATP</span>
        </Link>

        {/* XLM Balance */}
        <Link to="/wallet" className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-elevated/60 border border-accent-teal/20 rounded-md hover:border-accent-teal/50 transition-colors">
          <Globe size={14} className="text-accent-teal" />
          <span className="text-accent-teal font-orbitron font-bold text-sm tabular-nums">340.5</span>
          <span className="text-text-muted text-[10px] uppercase">XLM</span>
        </Link>

        {/* Notifications */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-md hover:bg-elevated-2/60 transition-colors"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={18} className="text-text-secondary" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-crimson text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <Link to="/profile" className="relative">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-elevated-2 hover:border-accent-amber transition-colors">
            <img 
              src="/images/operator-skin-1.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent-teal rounded-full border-2 bg-void" />
        </Link>
      </div>

      {/* Notification Dropdown */}
      {showNotifications && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
          <div className="absolute right-4 top-16 w-80 glass-panel rounded-md p-4 z-50 space-y-3 max-h-96 overflow-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-geist font-semibold text-sm">NOTIFICATIONS</h3>
              <button className="text-xs text-accent-teal hover:underline">Mark all read</button>
            </div>
            {notifications.length === 0 ? (
              <p className="text-text-muted text-sm text-center py-4">No notifications</p>
            ) : (
              notifications.map(n => (
                <div key={n.id} className={`p-3 rounded-md ${n.read ? 'bg-elevated/40' : 'bg-elevated/80 border-l-2 border-accent-amber'}`}>
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-text-muted mt-0.5">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </header>
  );
}
