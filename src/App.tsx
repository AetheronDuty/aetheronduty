import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider } from '@/hooks/useApp';
import Layout from '@/components/Layout';
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/DashboardPage';
import AuthPage from '@/pages/AuthPage';
import ProfilePage from '@/pages/ProfilePage';
import LeaderboardPage from '@/pages/LeaderboardPage';
import BattlePassPage from '@/pages/BattlePassPage';
import TournamentHubPage from '@/pages/TournamentHubPage';
import WalletPage from '@/pages/WalletPage';
import MarketplacePage from '@/pages/MarketplacePage';
import FriendsPage from '@/pages/FriendsPage';
import AdminDashboard from '@/pages/AdminDashboard';
import ToastContainer from '@/components/ToastContainer';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile/:id?" element={<ProfilePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/battle-pass" element={<BattlePassPage />} />
            <Route path="/tournaments" element={<TournamentHubPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-void text-text-primary">
        <AnimatedRoutes />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}

export default App;
