
import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Bell, Globe, Cloud, Zap, CheckCircle, Smartphone, Lock, HardDrive, User, Palette, RefreshCcw, DollarSign, Clock, Calendar, Fingerprint, Moon, Sun, Monitor, AlertCircle, Mail, MailCheck, MailWarning } from 'lucide-react';
import { TeamMember } from '../types';

interface SettingsProps {
  team: TeamMember[];
  onSwitchProfile: (id: string) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ team, onSwitchProfile, highContrast, setHighContrast }) => {
  const [activeTab, setActiveTab] = useState<'security' | 'interface' | 'account' | 'notifications' | 'comms'>('interface');
  const [isSaved, setIsSaved] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [themeMode, setThemeMode] = useState<'cyber' | 'monochrome' | 'classic'>('classic');
  const [notifs, setNotifs] = useState({ email: true, push: true, alerts: false });
  const [emailPrefs, setEmailPrefs] = useState({ incoming: true, starred: true, outgoing: false });

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 h-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Kernel Control</h1>
          <p className="text-slate-500 font-medium text-lg mt-4">Calibrating the global operational vectors of ZENtry.</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 active:scale-95">
          {isSaved ? <CheckCircle size={22} /> : <Cloud size={22} />}
          {isSaved ? 'Kernel Finalized' : 'Synchronize Node'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-20">
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/40">
              <nav className="space-y-2">
                 {[
                   { id: 'interface', icon: Palette, name: 'Interface Mode' },
                   { id: 'comms', icon: Mail, name: 'Comms Logic' },
                   { id: 'security', icon: Shield, name: 'Security Logic' },
                   { id: 'notifications', icon: Bell, name: 'Alert Vectors' },
                   { id: 'account', icon: User, name: 'Identity Hub' },
                 ].map(item => (
                   <button 
                    key={item.id} 
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-5 px-8 py-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-2xl scale-105' : 'text-slate-500 hover:bg-slate-50 hover:translate-x-2'}`}
                   >
                     <item.icon size={20} />
                     {item.name}
                   </button>
                 ))}
              </nav>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-10">
           {activeTab === 'interface' && (
             <div className="bg-white p-12 rounded-[64px] border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-12 animate-in slide-in-from-right-8">
                <div className="flex items-center gap-8 pb-10 border-b border-slate-100">
                   <div className="p-6 bg-indigo-50 text-indigo-600 rounded-[32px] border border-indigo-100 shadow-inner"><Palette size={40} /></div>
                   <div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Interface Modes</h3>
                      <p className="text-slate-400 font-medium">Calibrate the visual magnitude of your workspace.</p>
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                   {[
                     { id: 'classic', name: 'Classic', icon: Monitor },
                     { id: 'cyber', name: 'Cyber', icon: Moon },
                     { id: 'monochrome', name: 'Gray', icon: Sun },
                   ].map(t => (
                     <button 
                      key={t.id}
                      onClick={() => setThemeMode(t.id as any)}
                      className={`flex flex-col items-center gap-4 p-8 rounded-[32px] border transition-all ${themeMode === t.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xl scale-105' : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'}`}
                     >
                        <t.icon size={32} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t.name}</span>
                     </button>
                   ))}
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-[40px] flex items-center justify-between group">
                   <div className="flex-1 pr-10">
                      <h4 className="font-black text-xl tracking-tight mb-2">High Precision Focus</h4>
                      <p className="text-sm text-slate-500 font-medium">Maximizes contrast and removes soft gradients for analytical depth.</p>
                   </div>
                   <button onClick={() => setHighContrast(!highContrast)} className={`w-20 h-10 rounded-full relative transition-all duration-500 ${highContrast ? 'bg-emerald-500' : 'bg-slate-800 border border-white/10'}`}>
                      <div className={`absolute top-1.5 w-7 h-7 bg-white rounded-full transition-transform duration-500 ${highContrast ? 'translate-x-11 scale-110' : 'translate-x-1.5'}`} />
                   </button>
                </div>
             </div>
           )}

           {activeTab === 'comms' && (
             <div className="bg-white p-12 rounded-[64px] border border-slate-100 shadow-2xl space-y-12 animate-in slide-in-from-right-8">
                <div className="flex items-center gap-8 pb-10 border-b border-slate-100">
                   <div className="p-6 bg-indigo-50 text-indigo-600 rounded-[32px] border border-indigo-100 shadow-inner"><Mail size={40} /></div>
                   <div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Comms Configuration</h3>
                      <p className="text-slate-400 font-medium">Configure notification alerts for your encrypted comms vectors.</p>
                   </div>
                </div>

                <div className="space-y-4">
                   {[
                     { id: 'incoming', name: 'Incoming Vector Alerts', icon: MailWarning, desc: 'Real-time alerts for incoming operational data.' },
                     { id: 'starred', name: 'Priority Matrix Alerts', icon: MailCheck, desc: 'Notifications specifically for high-value starred vectors.' },
                     { id: 'outgoing', name: 'Transmission Confirmations', icon: Mail, desc: 'Alerts upon successful broadcast of outgoing data.' },
                   ].map(pref => (
                     <div key={pref.id} className="p-8 bg-slate-50 rounded-[40px] border border-slate-200 flex items-center justify-between group">
                        <div className="flex items-center gap-6 flex-1">
                           <div className="p-4 bg-white rounded-2xl text-indigo-500 shadow-sm"><pref.icon size={24} /></div>
                           <div>
                              <h4 className="font-black text-slate-900 text-lg tracking-tight">{pref.name}</h4>
                              <p className="text-xs text-slate-500 font-medium mt-1">{pref.desc}</p>
                           </div>
                        </div>
                        <button 
                          onClick={() => setEmailPrefs({...emailPrefs, [pref.id]: !((emailPrefs as any)[pref.id])})}
                          className={`w-16 h-8 rounded-full relative transition-all ${((emailPrefs as any)[pref.id]) ? 'bg-indigo-600' : 'bg-slate-300'}`}
                        >
                           <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${((emailPrefs as any)[pref.id]) ? 'translate-x-9' : 'translate-x-1'}`} />
                        </button>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'security' && (
             <div className="bg-white p-12 rounded-[64px] border border-slate-100 shadow-2xl space-y-12 animate-in slide-in-from-right-8">
                <div className="flex items-center gap-8 pb-10 border-b border-slate-100">
                   <div className="p-6 bg-rose-50 text-rose-600 rounded-[32px] border border-rose-100 shadow-inner"><Lock size={40} /></div>
                   <div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Security Protocols</h3>
                      <p className="text-slate-400 font-medium">Hardening access vectors to the global hub.</p>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="p-10 bg-slate-50 rounded-[48px] border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-8 flex-1">
                         <div className="p-5 bg-white rounded-[24px] shadow-sm text-indigo-600"><Fingerprint size={40} /></div>
                         <div className="flex-1">
                            <h4 className="text-2xl font-black text-slate-900 tracking-tight">Two-Factor Authentication</h4>
                            <p className="text-sm text-slate-500 font-medium mt-1">Multi-layered biometric verification for secure logins.</p>
                         </div>
                      </div>
                      <button onClick={() => setTwoFactor(!twoFactor)} className={`w-24 h-12 rounded-full relative transition-all duration-500 ${twoFactor ? 'bg-indigo-600' : 'bg-slate-300 shadow-inner'}`}>
                         <div className={`absolute top-2 w-8 h-8 bg-white rounded-full transition-transform duration-500 ${twoFactor ? 'translate-x-14' : 'translate-x-2'}`} />
                      </button>
                   </div>
                   
                   {twoFactor && (
                     <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[40px] animate-in zoom-in-95">
                        <div className="flex items-center gap-4 text-emerald-700 mb-4">
                           <Shield size={20} />
                           <span className="text-[10px] font-black uppercase tracking-widest">Safe Passage Active</span>
                        </div>
                        <p className="text-sm font-bold text-emerald-900 mb-6">Backup Recovery Key Generated:</p>
                        <div className="p-6 bg-white rounded-3xl font-mono text-lg font-black text-center tracking-widest border border-emerald-200">
                           ZNT-4293-F821-QR92
                        </div>
                     </div>
                   )}
                </div>
             </div>
           )}

           {activeTab === 'notifications' && (
             <div className="bg-white p-12 rounded-[64px] border border-slate-100 shadow-2xl space-y-12 animate-in slide-in-from-right-8">
                <div className="flex items-center gap-8 pb-10 border-b border-slate-100">
                   <div className="p-6 bg-amber-50 text-amber-600 rounded-[32px] border border-amber-100 shadow-inner"><Bell size={40} /></div>
                   <div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Alert Vectoring</h3>
                      <p className="text-slate-400 font-medium">Control the frequency and magnitude of system updates.</p>
                   </div>
                </div>

                <div className="space-y-4">
                   {[
                     { id: 'email', name: 'Global Workspace Alerts', desc: 'Notify on incoming workspace changes.' },
                     { id: 'push', name: 'Kernel Push Notifications', desc: 'Browser-level operational updates.' },
                     { id: 'alerts', name: 'Critical Sync Failures', desc: 'Emergency failsafe notifications.' },
                   ].map(pref => (
                     <div key={pref.id} className="p-8 bg-slate-50 rounded-[40px] border border-slate-200 flex items-center justify-between group">
                        <div className="flex-1">
                           <h4 className="font-black text-slate-900 text-lg tracking-tight">{pref.name}</h4>
                           <p className="text-xs text-slate-500 font-medium mt-1">{pref.desc}</p>
                        </div>
                        <button 
                          onClick={() => setNotifs({...notifs, [pref.id]: !((notifs as any)[pref.id])})}
                          className={`w-16 h-8 rounded-full relative transition-all ${((notifs as any)[pref.id]) ? 'bg-indigo-600' : 'bg-slate-300'}`}
                        >
                           <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${((notifs as any)[pref.id]) ? 'translate-x-9' : 'translate-x-1'}`} />
                        </button>
                     </div>
                   ))}
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
