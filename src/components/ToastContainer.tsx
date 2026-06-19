import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, Trophy, X } from 'lucide-react';
import { useApp } from '@/hooks/useApp';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
  achievement: Trophy,
};

const styles = {
  success: 'border-l-accent-teal',
  error: 'border-l-accent-crimson',
  info: 'border-l-accent-teal',
  warning: 'border-l-warning',
  achievement: 'border-l-accent-gold',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`w-80 glass-panel border-l-4 ${styles[toast.type]} p-4 rounded-md shadow-lg`}
            >
              <div className="flex items-start gap-3">
                <Icon size={18} className="mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-geist font-semibold text-sm">{toast.title}</p>
                  {toast.message && (
                    <p className="text-text-muted text-xs mt-0.5">{toast.message}</p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
              {!toast.persistent && (
                <div className="mt-3 h-0.5 bg-elevated rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent-amber"
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
