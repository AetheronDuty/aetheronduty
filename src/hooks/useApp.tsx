import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Notification, Player } from '@/types';

interface AppState {
  isAuthenticated: boolean;
  user: Player | null;
  sidebarCollapsed: boolean;
  notifications: Notification[];
  toasts: Toast[];
  currentPage: string;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'achievement';
  title: string;
  message: string;
  persistent: boolean;
}

interface AppContextType extends AppState {
  toggleSidebar: () => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  login: (user: Player) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    isAuthenticated: false,
    user: null,
    sidebarCollapsed: false,
    notifications: [],
    toasts: [],
    currentPage: 'dashboard',
  });

  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setState(prev => ({ ...prev, toasts: [...prev.toasts, { ...toast, id }] }));
    
    if (!toast.persistent) {
      setTimeout(() => {
        setState(prev => ({ ...prev, toasts: prev.toasts.filter(t => t.id !== id) }));
      }, 5000);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setState(prev => ({ ...prev, toasts: prev.toasts.filter(t => t.id !== id) }));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setState(prev => ({
      ...prev,
      notifications: [{ ...notification, id, timestamp: new Date().toISOString() }, ...prev.notifications],
    }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    }));
  }, []);

  const login = useCallback((user: Player) => {
    setState(prev => ({ ...prev, isAuthenticated: true, user }));
  }, []);

  const logout = useCallback(() => {
    setState(prev => ({ ...prev, isAuthenticated: false, user: null }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleSidebar,
        addToast,
        removeToast,
        addNotification,
        markNotificationRead,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
