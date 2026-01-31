
import React, { useState, useEffect, useRef } from 'react';
import { NAVIGATION } from '../constants';
import { Screen, TeamMember, Notification } from '../types';
import { 
  Bell, 
  Search, 
  Plus, 
  Menu, 
  X,
  Sparkles,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Command,
  ArrowRight,
  Terminal,
  Zap
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onOpenAi: () => void;
  user: TeamMember;
  notifications: Notification[];
  markNotificationsAsRead: () => void;
  syncStatus: 'success' | 'fail' | 'syncing';
  onSearch: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, onNavigate, onOpenAi, user, notifications, markNotificationsAsRead, syncStatus, onSearch }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [commandQuery, setCommandQuery] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const commandInputRef = useRef<HTMLInputElement>(null);

  const categories = Array.from(new Set(NAVIGATION.map(item => item.category)));
  const unreadCount = notifications.filter(n => !n.read).length;

  // Keyboard Shortcuts (CMD+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => commandInputRef.current?.focus(), 100);
    }
  }, [isCommandPaletteOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const navigateTo = (screen: Screen) => {
    setIsTransitioning(true);
    onNavigate(screen);
    setIsSidebarOpen(false);
    setIsCommandPaletteOpen(false);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-emerald-500" size={16} />;
      case 'warning': return <AlertTriangle className="text-amber-500" size={16} />;
      case 'error': return <XCircle className="text-rose-500" size={16} />;
      default: return <Info className="text-blue-500" size={16} />;
    }
  };

  const filteredCommands = NAVIGATION.filter(item => 
    item.name.toLowerCase().includes(commandQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-inter">
      {/* Command Palette Modal */}
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsCommandPaletteOpen(false)} />
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-200 relative">
            <div className="p-8 border-b border-slate-100 flex items-center gap-6">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><Command size={24} /></div>
              <input 
                ref={commandInputRef}
                type="text" 
                placeholder="Type a command or search nodes..." 
                className="flex-1 bg-transparent border-none text-2xl font-black text-slate-900 outline-none placeholder:text-slate-300"
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
              />
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-200">ESC</div>
            </div>
            
            <div className="max-h-[50vh] overflow-y-auto no-scrollbar p-4">
              <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Navigation</div>
              <div className="space-y-1 mt-2">
                {filteredCommands.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => navigateTo(item.id as Screen)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-slate-100 text-slate-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">{item.icon}</div>
                      <span className="font-bold text-slate-900">{item.name}</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:translate-x-1 group-hover:text-indigo-600 transition-all" />
                  </button>
                ))}
              </div>

              <div className="px-4 py-2 mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quick Actions</div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                 <button className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all text-left">
                    <Plus size={18} /> <span className="text-xs font-black uppercase tracking-widest">Deploy Task</span>
                 </button>
                 <button className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all text-left">
                    <User size={18} /> <span className="text-xs font-black uppercase tracking-widest">New Entity</span>
                 </button>
              </div>
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"><Terminal size={12} /> Status: Core Online</div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"><Zap size={12} /> Latency: 4ms</div>
               </div>
               <span className="text-[10px] font-bold text-slate-300 italic">ZENtry OS v2.4.0</span>
            </div>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0f172a] text-white transition-all duration-300 transform lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-teal-500/20">Z</div>
            <div>
              <span className="text-xl font-bold tracking-tight block">ZENtry</span>
              <span className="text-[10px] text-teal-400 font-bold tracking-widest uppercase opacity-70">Workspace</span>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 hover:bg-slate-800 rounded-lg"><X size={20} /></button>
        </div>

        <div className="px-4 py-2 space-y-8 overflow-y-auto no-scrollbar h-[calc(100vh-180px)]">
          {categories.map(category => (
            <div key={category}>
              <h3 className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">{category}</h3>
              <nav className="space-y-1">
                {NAVIGATION.filter(item => item.category === category).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id as Screen)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      activeScreen === item.id ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className={`${activeScreen === item.id ? 'text-white' : 'text-slate-500 group-hover:text-teal-400'}`}>{item.icon}</span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 w-full p-4 space-y-3 bg-[#0f172a] border-t border-slate-800">
          <button onClick={onOpenAi} className="w-full relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 via-blue-600 to-red-500 p-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 group">
            <Sparkles size={16} className="animate-pulse" />
            <span>CoPilot Assistant</span>
          </button>
          
          <button 
            onClick={() => navigateTo('profile')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
              activeScreen === 'profile' ? 'bg-slate-800 border-teal-500/50' : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800'
            }`}
          >
            <img src={user.avatar} className="w-10 h-10 rounded-lg object-cover" alt="Profile" />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-bold truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 font-medium truncate uppercase">{user.role}</p>
            </div>
            <Settings size={16} className="text-slate-500" />
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] relative">
        <header className="h-18 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 sticky top-0 z-30 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"><Menu size={24} /></button>
            <div className="relative hidden md:flex items-center group">
              <Search className="absolute left-3 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Global Search Node..." 
                value={searchQuery}
                onFocus={() => setIsCommandPaletteOpen(true)}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2.5 bg-slate-100/50 border border-transparent rounded-xl text-sm w-80 focus:bg-white focus:border-teal-500/30 transition-all outline-none cursor-pointer" 
                readOnly
              />
              <div className="absolute right-3 hidden lg:flex items-center gap-1.5 px-2 py-1 bg-slate-200/50 rounded-lg text-[10px] font-black text-slate-400 border border-slate-300/30 pointer-events-none uppercase">
                <Command size={10} /> K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className={`hidden sm:flex items-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
               syncStatus === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
               syncStatus === 'fail' ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' :
               'bg-blue-50 text-blue-600 border-blue-100'
             }`}>
              {syncStatus === 'syncing' ? <RefreshCw className="animate-spin mr-2" size={12} /> : 
               <div className={`w-1.5 h-1.5 rounded-full mr-2 ${syncStatus === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`} />}
              Sync: {syncStatus}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => { setIsNotifyOpen(!isNotifyOpen); markNotificationsAsRead(); }}
                className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl relative transition-colors"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-red-600 rounded-full border-2 border-white text-[8px] font-black text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifyOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Inbox</h4>
                    <button onClick={() => setIsNotifyOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
                  </div>
                  <div className="max-h-96 overflow-y-auto no-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="p-10 text-center">
                        <Bell className="mx-auto text-slate-200 mb-2" size={32} />
                        <p className="text-xs font-bold text-slate-400">Nothing new here</p>
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-4 border-b border-slate-50 flex gap-3 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-teal-50/30' : ''}`}>
                          <div className="mt-1">{getIcon(n.type)}</div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{n.title}</p>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{n.message}</p>
                            <p className="text-[8px] text-slate-400 mt-1 uppercase font-black">{n.timestamp}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => navigateTo('projects')} className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm hover:bg-teal-700 active:scale-95 transition-all shadow-lg">
              <Plus size={18} /> <span className="hidden lg:inline">Initiative</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          {isTransitioning && (
            <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center p-20 animate-in fade-in duration-300">
               <div className="w-full max-w-4xl space-y-12">
                  <div className="h-12 w-1/3 bg-slate-200 rounded-[20px] animate-pulse" />
                  <div className="grid grid-cols-4 gap-8">
                     <div className="h-48 bg-slate-200 rounded-[40px] animate-pulse" />
                     <div className="h-48 bg-slate-200 rounded-[40px] animate-pulse" />
                     <div className="h-48 bg-slate-200 rounded-[40px] animate-pulse" />
                     <div className="h-48 bg-slate-200 rounded-[40px] animate-pulse" />
                  </div>
                  <div className="h-[400px] w-full bg-slate-200 rounded-[48px] animate-pulse" />
               </div>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
