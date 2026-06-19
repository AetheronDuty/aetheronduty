import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, Gamepad2, Ticket, ShoppingCart, Wallet, User, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, Shield, Swords
} from 'lucide-react';
import { useApp } from '@/hooks/useApp';

const navItems = [
  { icon: Home, label: 'HOME', path: '/dashboard' },
  { icon: Gamepad2, label: 'PLAY', path: '/dashboard?tab=play' },
  { icon: Swords, label: 'COMPETE', path: '/tournaments' },
  { icon: Ticket, label: 'BATTLE PASS', path: '/battle-pass' },
  { icon: ShoppingCart, label: 'MARKETPLACE', path: '/marketplace' },
  { icon: Wallet, label: 'WALLET', path: '/wallet' },
  { icon: User, label: 'PROFILE', path: '/profile' },
];

const bottomItems = [
  { icon: Shield, label: 'ADMIN', path: '/admin' },
  { icon: Settings, label: 'SETTINGS', path: '/dashboard?tab=settings' },
  { icon: HelpCircle, label: 'HELP', path: '/dashboard?tab=help' },
  { icon: LogOut, label: 'LOGOUT', path: '/auth' },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, isAuthenticated } = useApp();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path.includes('?')) {
      return location.pathname === path.split('?')[0];
    }
    return location.pathname === path;
  };

  return (
    <motion.aside
      className="fixed left-0 top-0 h-full bg-surface/95 backdrop-blur-md border-r border-border-subtle/50 z-50 flex flex-col"
      animate={{ width: sidebarCollapsed ? 64 : 240 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border-subtle/30">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <img 
            src="/images/economy-atp.png" 
            alt="AetheronDuty" 
            className="w-8 h-8 rounded-md flex-shrink-0"
          />
          <motion.span
            className="font-orbitron font-bold text-accent-amber text-sm whitespace-nowrap"
            animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          >
            AETHERONDUTY
          </motion.span>
        </Link>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-18 w-6 h-6 bg-elevated border border-border-subtle rounded-full flex items-center justify-center text-text-muted hover:text-text-primary transition-colors z-10"
      >
        {sidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-220 relative
                ${active 
                  ? 'bg-elevated-2/60 text-text-primary' 
                  : 'text-text-muted hover:text-text-primary hover:bg-elevated-2/40'
                }
              `}
              title={sidebarCollapsed ? item.label : undefined}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-accent-amber rounded-r-full"
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <item.icon size={20} className={active ? 'text-accent-amber' : ''} />
              <motion.span
                className="font-geist font-medium text-xs uppercase tracking-wider whitespace-nowrap"
                animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
                transition={{ duration: 0.15 }}
              >
                {item.label}
              </motion.span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 px-2 space-y-1 border-t border-border-subtle/30">
        {bottomItems.map((item) => {
          if (item.label === 'ADMIN' && !isAuthenticated) return null;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-text-muted hover:text-text-primary hover:bg-elevated-2/40 transition-all duration-220"
              title={sidebarCollapsed ? item.label : undefined}
              onClick={item.label === 'LOGOUT' ? () => {} : undefined}
            >
              <item.icon size={18} />
              <motion.span
                className="font-geist text-xs uppercase tracking-wider whitespace-nowrap"
                animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
                transition={{ duration: 0.15 }}
              >
                {item.label}
              </motion.span>
            </Link>
          );
        })}
      </div>
    </motion.aside>
  );
}
