import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Compass,
  GraduationCap,
  Lock,
  Moon,
  ShieldCheck,
  Sun,
  Wallet,
} from 'lucide-react';
import { useLifeOS } from '../context/LifeOSContext';
import { EASE_OUT_EXPO, LIFEOS_LOGO_SRC, LifeOSLogoMark } from './MotionPrimitives';
import { LifeOS3DCore } from './LifeOS3DCore';
import { PWAInstallButton } from './PWAInstallPrompt';

const OS_PILLARS = [
  {
    id: 'finance',
    label: 'Personal Finance',
    title: 'Every rand accounted for, without spreadsheets.',
    description:
      'Track income and expenses, allocate monthly category budgets, monitor savings goals, and clear bill reminders in real time.',
    highlights: [
      'Real-time cashflow splines and budget threshold alerts',
      'One-click bill clearance that updates your ledger automatically',
      'Multi-currency support (ZAR, USD, EUR, GBP)',
    ],
  },
  {
    id: 'business',
    label: 'Small Business',
    title: 'Client quotations, VAT invoices, and profit clarity.',
    description:
      'Manage customers, draft professional quotes, convert them to invoices in one click, and track net operating profit.',
    highlights: [
      'Instant 15% VAT calculation and printable client invoices',
      'Terminal payment locking with automatic income posting',
      'Client CRM directory synced across devices',
    ],
  },
  {
    id: 'intelligence',
    label: 'AI Control',
    title: 'An assistant that drafts, plans, and asks before acting.',
    description:
      'Ask LIFEOS Intelligence to summarize cashflow, structure a study plan, or prepare an invoice—with explicit approval cards before any commit.',
    highlights: [
      'Human-in-the-loop approval gates on every financial or schedule write',
      'Voice dictation and Google Search grounded web research',
      'Beginner-friendly tutoring across any learning track',
    ],
  },
  {
    id: 'privacy',
    label: 'POPIA Security',
    title: 'Privacy by design, governed under your consent.',
    description:
      'Personally identifiable details are isolated from general workspace preferences, with granular AI context toggles and instant JSON data export.',
    highlights: [
      'Verified Google Authentication with owner-scoped Firestore rules',
      'Granular POPIA consent controls for AI and alerts',
      'One-click Right of Access archive export',
    ],
  },
] as const;

export const SignInPortal: React.FC = () => {
  const { signInWithGoogle, theme, toggleTheme } = useLifeOS();
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<(typeof OS_PILLARS)[number]['id']>('finance');
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const currentPillar = OS_PILLARS.find((p) => p.id === activeTab) || OS_PILLARS[0];

  const handleSignIn = async () => {
    setSigningIn(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : 'Sign-in did not complete.';
      if (raw.includes('popup-blocked')) {
        setAuthError(
          'Your browser blocked the Google sign-in popup. On Android or iOS, allow popups for this site or open this link directly in Chrome or Safari.'
        );
      } else if (raw.includes('popup-closed-by-user') || raw.includes('cancelled-popup-request')) {
        setAuthError('Google sign-in was closed before finishing. Tap the button again when ready.');
      } else if (raw.includes('unauthorized-domain')) {
        setAuthError('This domain is not yet authorized in Firebase Authentication settings.');
      } else {
        setAuthError(raw);
      }
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FC] dark:bg-transparent text-zinc-900 dark:text-zinc-100 flex flex-col">
      <div className="h-[2px] w-full lifeos-gradient-bg shrink-0" />
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-[#050508]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <a href="#top" className="whitespace-nowrap shrink-0">
            <LifeOSLogoMark size="sm" showWordmark />
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <a href="#overview" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors whitespace-nowrap shrink-0">
              Overview
            </a>
            <a href="#modules" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors whitespace-nowrap shrink-0">
              Modules
            </a>
            <a href="#intelligence" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors whitespace-nowrap shrink-0">
              3D Core &amp; AI
            </a>
            <a href="#privacy" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors whitespace-nowrap shrink-0">
              POPIA Privacy
            </a>
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <PWAInstallButton compact />
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignIn}
              disabled={signingIn}
              className="px-4 py-2 text-sm font-semibold rounded-lg lifeos-gradient-bg text-white shadow-[0_8px_22px_-6px_rgba(236,72,153,0.45)] hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 disabled:opacity-60 cursor-pointer"
            >
              {signingIn ? 'Connecting...' : 'Sign In'}
            </motion.button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Split */}
        <section id="overview" className="max-w-7xl mx-auto px-6 pt-12 pb-10 lg:pt-16 lg:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              className="lg:col-span-6 flex flex-col justify-between py-2"
            >
              <div className="space-y-6">
                <p className="text-xs font-mono tracking-wide lifeos-gradient-text font-semibold">
                  Personal Operating System · South Africa &amp; Global
                </p>

                <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08] text-balance">
                  One platform. More control over{' '}
                  <span className="lifeos-gradient-text italic">everyday life.</span>
                </h1>

                <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
                  LIFEOS brings your personal money, small business invoicing, daily schedule,
                  verified opportunities, and guided skill learning into one unified workspace
                  orchestrated by an approval-first AI assistant.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.015, y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={handleSignIn}
                    disabled={signingIn}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl lifeos-gradient-bg text-white text-sm font-semibold shadow-[0_10px_28px_-8px_rgba(236,72,153,0.55)] hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
                  >
                    <span>{signingIn ? 'Signing in...' : 'Launch Workspace with Google'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0C0C14] text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:border-fuchsia-500/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-fuchsia-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>

                {authError && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                    {authError}
                  </p>
                )}
              </div>

              <div className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800/80 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-xl font-display font-semibold tabular-nums text-zinc-900 dark:text-white">
                    7 Modules
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Unified under one login
                  </div>
                </div>
                <div>
                  <div className="text-xl font-display font-semibold tabular-nums text-zinc-900 dark:text-white">
                    100% Gated
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    AI asks before writing
                  </div>
                </div>
                <div>
                  <div className="text-xl font-display font-semibold tabular-nums text-zinc-900 dark:text-white">
                    POPIA Ready
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Export &amp; consent controls
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Showcase Card featuring the authentic Logo Emblem + Workspace photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
              className="lg:col-span-6"
            >
              <div className="h-full min-h-[340px] rounded-2xl overflow-hidden border border-fuchsia-500/25 bg-black relative shadow-[0_24px_60px_-18px_rgba(236,72,153,0.32)]">
                {!heroImgFailed ? (
                  <img
                    src="/src/assets/images/lifeos_workspace_hero_1794946437806.jpg"
                    alt="Minimalist LIFEOS executive workspace surface in natural daylight"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgFailed(true)}
                    className="w-full h-full object-cover opacity-55"
                  />
                ) : (
                  <div className="w-full h-full bg-black" />
                )}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-6"
                  style={{
                    background:
                      'radial-gradient(circle at 75% 22%, rgba(236,72,153,0.22), transparent 52%), radial-gradient(circle at 20% 80%, rgba(99,102,241,0.24), transparent 55%), linear-gradient(to top, rgba(5,5,8,0.96), rgba(5,5,8,0.52), rgba(5,5,8,0.28))',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-20 rounded-2xl bg-black border border-fuchsia-500/45 overflow-hidden shadow-[0_12px_36px_-6px_rgba(236,72,153,0.6)]">
                      <img
                        src={LIFEOS_LOGO_SRC}
                        alt="LIFEOS official logo"
                        className="w-full h-full object-contain scale-105"
                      />
                    </div>
                    <span className="text-[11px] font-mono text-pink-200/80 tracking-wide">
                      Unified Personal OS
                    </span>
                  </div>
                  <div className="text-white space-y-1.5">
                    <p className="text-xs font-mono text-pink-300">
                      Finance · Business · Schedule · Places &amp; Routes · Learning
                    </p>
                    <p className="text-base font-medium text-zinc-100">
                      Designed around precision control across desktop and mobile.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Module Explorer */}
        <section id="modules" className="max-w-7xl mx-auto px-6 py-12 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-mono text-fuchsia-600 dark:text-fuchsia-400">
                Core Architecture
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white mt-1">
                Built as one coherent ecosystem
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-200/70 dark:bg-[#0C0C14] border border-zinc-200 dark:border-zinc-800">
              {OS_PILLARS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'text-white'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="landing-tab-bg"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        className="absolute inset-0 lifeos-gradient-bg rounded-lg shadow-sm"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPillar.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-[#0C0C14] border border-zinc-200 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-8"
            >
              <div className="lg:col-span-7 space-y-5">
                <h3 className="font-display text-2xl font-semibold text-zinc-900 dark:text-white">
                  {currentPillar.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {currentPillar.description}
                </p>
                <ul className="space-y-3 pt-2">
                  {currentPillar.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {[
                  { icon: Wallet, name: 'Finance', detail: 'Budgets & Savings', color: 'text-fuchsia-500' },
                  { icon: Briefcase, name: 'Business', detail: 'Quotes & Invoices', color: 'text-purple-500' },
                  { icon: Compass, name: 'Opportunities', detail: 'Grants & Roles', color: 'text-indigo-500' },
                  { icon: GraduationCap, name: 'Learning', detail: 'Guided Tracks', color: 'text-pink-500' },
                ].map((m) => (
                  <motion.div
                    key={m.name}
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                    className="p-4 rounded-xl bg-zinc-50 dark:bg-[#06060A] border border-zinc-200 dark:border-zinc-800/90 flex flex-col justify-between gap-4"
                  >
                    <m.icon className={`w-5 h-5 ${m.color}`} />
                    <div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-white">{m.name}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{m.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Interactive 3D Emblem & Central AI Core Spotlight */}
        <section id="intelligence" className="max-w-7xl mx-auto px-6 py-12 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <LifeOS3DCore darkSurface={theme === 'dark'} />
            </div>

            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-mono text-fuchsia-600 dark:text-fuchsia-400">
                Interactive 3D Core &amp; Approval-First AI
              </p>
              <h2 className="font-display text-3xl font-semibold text-zinc-900 dark:text-white text-balance">
                AI that drafts the work, while you hold the final key.
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Orbit the LIFEOS emblem or speak directly to your assistant. Ask LIFEOS to log a
                fuel expense, draft an invoice, schedule tomorrow’s study session, or search live
                opportunities online—every workspace write waits for your explicit approval.
              </p>
              <div id="privacy" className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">POPIA Compliant Controls</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Toggle AI context access, export your full JSON archive, or erase personal records anytime.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Isolated Owner Rules</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Verified Google authentication with strict owner-only Firestore security rules.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#050508]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-3">
            <LifeOSLogoMark size="xs" showWordmark={false} />
            <span>LIFEOS · One Platform. More Control Over Everyday Life.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>POPIA Privacy by Design</span>
            <button
              type="button"
              onClick={handleSignIn}
              className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold hover:underline cursor-pointer"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
