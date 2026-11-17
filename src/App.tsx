import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LifeOSProvider, useLifeOS } from './context/LifeOSContext';
import { SignInPortal } from './components/SignInPortal';
import { DashboardShell } from './components/DashboardShell';
import { OverviewModule } from './components/modules/OverviewModule';
import { FinanceModule } from './components/modules/FinanceModule';
import { BusinessModule } from './components/modules/BusinessModule';
import { TasksModule } from './components/modules/TasksModule';
import { PlacesModule } from './components/modules/PlacesModule';
import { OpportunitiesModule } from './components/modules/OpportunitiesModule';
import { LearningModule } from './components/modules/LearningModule';
import { AiAssistantModule } from './components/modules/AiAssistantModule';
import { AccountModule } from './components/modules/AccountModule';
import { EASE_OUT_EXPO, LIFEOS_LOGO_SRC } from './components/MotionPrimitives';
import { OfflineIndicator } from './components/PWAInstallPrompt';

const LifeOSRouter: React.FC = () => {
  const { user, authReady, workspaceLoading, activeModule } = useLifeOS();

  if (!authReady || (user && workspaceLoading)) {
    return (
      <div className="min-h-screen bg-[#F8F7FC] dark:bg-[#050508] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="flex flex-col items-center gap-5 text-center"
        >
          <div className="relative w-20 h-20 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
              className="absolute inset-0 rounded-2xl border border-fuchsia-500/40"
            />
            <div className="w-16 h-16 rounded-2xl bg-black overflow-hidden border border-zinc-800 shadow-[0_10px_35px_-8px_rgba(236,72,153,0.5)]">
              <img
                src={LIFEOS_LOGO_SRC}
                alt="LIFEOS emblem"
                className="w-full h-full object-contain scale-110"
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-display text-2xl font-bold italic tracking-tight text-zinc-900 dark:text-white">
              LIFE<span className="lifeos-gradient-text">OS</span>
            </div>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Initializing secure personal operating system...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <SignInPortal />;
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return <OverviewModule />;
      case 'finance':
        return <FinanceModule />;
      case 'business':
        return <BusinessModule />;
      case 'tasks':
        return <TasksModule />;
      case 'places':
        return <PlacesModule />;
      case 'opportunities':
        return <OpportunitiesModule />;
      case 'learning':
        return <LearningModule />;
      case 'assistant':
        return <AiAssistantModule />;
      case 'account':
        return <AccountModule />;
      default:
        return <OverviewModule />;
    }
  };

  return <DashboardShell>{renderModule()}</DashboardShell>;
};

export default function App() {
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  return (
    <ErrorBoundary>
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}
      <LifeOSProvider>
        <LifeOSRouter />
        <OfflineIndicator />
      </LifeOSProvider>
    </ErrorBoundary>
  );
}
