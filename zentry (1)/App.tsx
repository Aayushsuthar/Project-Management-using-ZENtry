
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CRM from './components/CRM';
import Sales from './components/Sales';
import Projects from './components/Projects';
import Collaboration from './components/Collaboration';
import Sites from './components/Sites';
import HR from './components/HR';
import Marketing from './components/Marketing';
import Automation from './components/Automation';
import CoPilot from './components/CoPilot';
import Profile from './components/Profile';
import Settings from './components/Settings';
import EmailTerminal from './components/Email';
import { Screen, Deal, Task, FeedPost, Contact, TeamMember, Project, MarketingCampaign, AutomationFlow, Notification, Site, FileEntry, Invoice, Email } from './types';
import { ArrowRight, LogIn } from 'lucide-react';
import { MOCK_DEALS, MOCK_TASKS, MOCK_FEED, MOCK_CONTACTS, MOCK_TEAM, MOCK_PROJECTS, MOCK_CAMPAIGNS, MOCK_FLOWS, MOCK_EMAILS } from './constants';

const Login: React.FC<{ onLogin: (user: TeamMember) => void }> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-inter">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-indigo-600/30 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-violet-600/30 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="w-full max-w-lg bg-white/5 backdrop-blur-3xl rounded-[64px] p-16 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)] relative z-10 border border-white/10 animate-in zoom-in duration-700">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-500 rounded-[40px] mb-10 shadow-[0_30px_60px_-15px_rgba(79,70,229,0.5)] -rotate-6 hover:rotate-0 transition-all cursor-pointer group">
            <span className="text-white font-black text-6xl group-hover:scale-110 transition-transform">Z</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter leading-none">ZENtry Core</h1>
          <p className="text-slate-400 mt-4 font-medium text-xl">The Industrial OS for Modern Scale</p>
        </div>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onLogin(MOCK_TEAM[0]); }}>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Secure Vector</label>
            <input type="email" defaultValue="admin@zentry.io" className="w-full px-10 py-7 bg-white/5 border border-white/10 rounded-[32px] text-white outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-lg" placeholder="id_signature" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Access Key</label>
            <input type="password" defaultValue="password" className="w-full px-10 py-7 bg-white/5 border border-white/10 rounded-[32px] text-white outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-lg" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full py-8 bg-indigo-600 text-white rounded-[40px] font-black text-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-6 group">Authorize Access <ArrowRight size={28} /></button>
        </form>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('login');
  const [currentUser, setCurrentUser] = useState<TeamMember | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [syncStatus, setSyncStatus] = useState<'success' | 'fail' | 'syncing'>('success');
  const [searchQuery, setSearchQuery] = useState('');
  const [highContrast, setHighContrast] = useState(false);

  // Global State Stores
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(MOCK_FEED);
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);
  const [team, setTeam] = useState<TeamMember[]>(MOCK_TEAM);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(MOCK_CAMPAIGNS);
  const [flows, setFlows] = useState<AutomationFlow[]>(MOCK_FLOWS);
  const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS as any);
  const [files, setFiles] = useState<FileEntry[]>([
    { id: 'f1', name: 'Infrastructure_Map_2024.pdf', size: '12.4 MB', type: 'application/pdf', uploadedBy: 'Abhinav Sharma', timestamp: 'Yesterday', url: '#', category: 'document' },
  ]);

  useEffect(() => {
    const syncLoop = setInterval(() => {
      setSyncStatus('syncing');
      setTimeout(() => setSyncStatus('success'), 1500);
    }, 60000);
    return () => clearInterval(syncLoop);
  }, []);

  const addNotification = (title: string, message: string, type: Notification['type'] = 'info') => {
    setNotifications(prev => [{ id: Date.now().toString(), title, message, type, timestamp: 'Just now', read: false }, ...prev]);
  };

  const updateEmail = (id: string, updates: Partial<Email>) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const renderContent = () => {
    if (!currentUser) return null;
    switch (activeScreen) {
      case 'dashboard': return <Dashboard deals={deals} tasks={tasks} projects={projects} />;
      case 'email': return <EmailTerminal emails={emails} addEmail={e => setEmails(p => [e, ...p])} updateEmail={updateEmail} searchQuery={searchQuery} />;
      case 'sales': return <Sales deals={deals} invoices={[]} updateDeal={(id, u) => setDeals(p => p.map(d => d.id === id ? {...d, ...u} : d))} addDeal={d => setDeals(p => [d, ...p])} deleteDeal={id => setDeals(p => p.filter(d => d.id !== id))} searchQuery={searchQuery} />;
      case 'projects': return <Projects tasks={tasks} projects={projects} team={team} updateTask={(id, u) => setTasks(p => p.map(t => t.id === id ? {...t, ...u} : t))} addTask={t => setTasks(p => [t, ...p])} addProject={p => setProjects(prev => [p, ...prev])} deleteProject={id => setProjects(p => p.filter(proj => proj.id !== id))} onShare={(sub, body) => {}} />;
      case 'company': return <Collaboration user={currentUser} feedPosts={feedPosts} files={files} addFile={f => setFiles(prev => [f, ...prev])} updatePost={(id, u) => setFeedPosts(p => p.map(post => post.id === id ? {...post, ...u} : post))} addFeedPost={p => setFeedPosts(prev => [p, ...prev])} deletePost={id => setFeedPosts(p => p.filter(post => post.id !== id))} searchQuery={searchQuery} />;
      case 'hr': return <HR team={team} addMember={m => setTeam(prev => [m, ...prev])} updateMember={(id, u) => setTeam(p => p.map(m => m.id === id ? {...m, ...u} : m))} deleteMember={id => setTeam(p => p.filter(m => m.id !== id))} searchQuery={searchQuery} />;
      case 'marketing': return <Marketing campaigns={campaigns} addCampaign={c => setCampaigns(p => [c, ...p])} updateCampaign={(id, u) => setCampaigns(p => p.map(c => c.id === id ? {...c, ...u} : c))} onLaunch={c => {}} deleteCampaign={id => {}} />;
      case 'automation': return <Automation flows={flows} addFlow={f => setFlows(prev => [f, ...prev])} />;
      case 'profile': return <Profile user={currentUser} onUpdate={u => setCurrentUser(p => p ? {...p, ...u} : null)} />;
      case 'settings': return <Settings team={team} onSwitchProfile={id => setCurrentUser(team.find(t => t.id === id) || null)} highContrast={highContrast} setHighContrast={setHighContrast} />;
      case 'sites': return <Sites sites={[]} addSite={() => {}} updateSite={() => {}} deleteSite={() => {}} duplicateSite={() => {}} />;
      default: return null;
    }
  };

  if (activeScreen === 'login') return <Login onLogin={u => { setCurrentUser(u); setActiveScreen('dashboard'); }} />;

  return (
    <>
      <Layout 
        activeScreen={activeScreen} 
        onNavigate={setActiveScreen}
        onOpenAi={() => setIsAiOpen(true)}
        user={currentUser!}
        notifications={notifications}
        markNotificationsAsRead={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}
        syncStatus={syncStatus}
        onSearch={setSearchQuery}
      >
        {renderContent()}
      </Layout>
      <CoPilot isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} context={{ tasks, deals, projects }} />
    </>
  );
};

export default App;
