import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Bell,
  Home,
  Image as ImageIcon,
  FileText,
  BookOpen,
  QrCode,
  Calendar,
  Users,
  Phone,
  Navigation,
  Clock,
  Trophy,
  FileCheck,
  Database,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import AdminLogin from './AdminLogin';
import TabOverview from './TabOverview';
import TabAnnouncements from './TabAnnouncements';
import TabHomepage from './TabHomepage';
import TabGallery from './TabGallery';
import TabPoster from './TabPoster';
import TabBrochure from './TabBrochure';
import TabRegistration from './TabRegistration';
import TabEvents from './TabEvents';
import TabTeam from './TabTeam';
import TabContact from './TabContact';
import TabReachUs from './TabReachUs';
import TabSchedule from './TabSchedule';
import TabPrizes from './TabPrizes';
import TabRules from './TabRules';
import TabSettings from './TabSettings';
import { useCMS } from '@/hooks/useCMS';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AdminDashboardProps {
  onGoHome: () => void;
}

export default function AdminDashboard({ onGoHome }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const { cmsData } = useCMS();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = sessionStorage.getItem('prayuddha_admin_auth');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
        return;
      }

      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          sessionStorage.setItem('prayuddha_admin_auth', 'true');
          setIsAuthenticated(true);
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    sessionStorage.removeItem('prayuddha_admin_auth');
    sessionStorage.removeItem('prayuddha_admin_user');
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} onGoHome={onGoHome} />;
  }

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'homepage', label: 'Homepage', icon: Home },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'poster', label: 'Poster', icon: FileText },
    { id: 'brochure', label: 'Brochure', icon: BookOpen },
    { id: 'registration', label: 'Registration', icon: QrCode },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'reachus', label: 'Reach Us', icon: Navigation },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'prizes', label: 'Prizes', icon: Trophy },
    { id: 'rules', label: 'Rules', icon: FileCheck },
    { id: 'settings', label: 'Database & Setup', icon: Database },
  ];

  return (
    <div className="admin-portal min-h-screen bg-zinc-950 text-white flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 h-16 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-2 rounded-lg bg-zinc-800 text-zinc-300 lg:hidden"
            aria-label="Toggle Navigation Sidebar"
          >
            {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-sm sm:text-base text-white leading-tight flex items-center gap-1.5">
                PRAYUDDHA <span className="text-[var(--accent)]">CMS</span>
              </h1>
              <span className="text-[10px] text-zinc-400 font-mono">Live Content Management System</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="btn btn-secondary text-xs flex items-center gap-1.5 !py-1.5 !px-3"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-secondary text-xs !py-1.5 !px-3 text-red-400 hover:bg-red-500/10 flex items-center gap-1.5"
            title="Log out of Admin CMS"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:block w-64 bg-zinc-900 border-r border-zinc-800 p-4 space-y-1 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
            CMS Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[var(--accent)] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <aside className="relative z-50 w-64 bg-zinc-900 border-r border-zinc-800 p-4 space-y-1 h-full overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-2">
                <span className="font-display font-bold text-sm text-white">Admin Navigation</span>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[var(--accent)] text-white shadow-md'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </aside>
          </div>
        )}

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'overview' && <TabOverview data={cmsData} onNavigateTab={(tab) => setActiveTab(tab)} />}
          {activeTab === 'announcements' && <TabAnnouncements announcements={cmsData.announcements} />}
          {activeTab === 'homepage' && <TabHomepage siteConfig={cmsData.siteConfig} />}
          {activeTab === 'gallery' && <TabGallery gallery={cmsData.gallery} />}
          {activeTab === 'poster' && <TabPoster poster={cmsData.poster} />}
          {activeTab === 'brochure' && <TabBrochure brochure={cmsData.brochure} />}
          {activeTab === 'registration' && <TabRegistration siteConfig={cmsData.siteConfig} />}
          {activeTab === 'events' && <TabEvents events={cmsData.events} />}
          {activeTab === 'team' && <TabTeam team={cmsData.team} />}
          {activeTab === 'contact' && <TabContact contact={cmsData.contact} />}
          {activeTab === 'reachus' && <TabReachUs travel={cmsData.travel} />}
          {activeTab === 'schedule' && <TabSchedule schedule={cmsData.schedule} />}
          {activeTab === 'prizes' && <TabPrizes prizes={cmsData.prizes} />}
          {activeTab === 'rules' && <TabRules rules={cmsData.rules} />}
          {activeTab === 'settings' && <TabSettings data={cmsData} />}
        </main>
      </div>
    </div>
  );
}
