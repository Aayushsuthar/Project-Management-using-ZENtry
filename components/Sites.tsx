
import React, { useState } from 'react';
import { Globe, ShoppingBag, BarChart3, Edit3, Trash2, Plus, X, LayoutGrid, Monitor, Smartphone, Search, Rocket, MoreVertical, Copy, Shield, Cloud, Loader2, CheckCircle } from 'lucide-react';
import { Site } from '../types';

interface SitesProps {
  sites: Site[];
  addSite: (site: Site) => void;
  updateSite: (id: string, updates: Partial<Site>) => void;
  deleteSite: (id: string) => void;
  duplicateSite: (id: string) => void;
}

const TEMPLATES = [
  { id: 't1', name: 'Vector Core', type: 'Site', img: 'https://picsum.photos/id/10/800/600' },
  { id: 't2', name: 'Nexus Store', type: 'Store', img: 'https://picsum.photos/id/20/800/600' },
  { id: 't3', name: 'Industrial Landing', type: 'Site', img: 'https://picsum.photos/id/30/800/600' },
];

const Sites: React.FC<SitesProps> = ({ sites, addSite, updateSite, deleteSite, duplicateSite }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<'manage' | 'templates'>('manage');
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [deployingId, setDeployingId] = useState<string | null>(null);
  const [deployProgress, setDeployProgress] = useState(0);

  const [formData, setFormData] = useState<{
    name: string;
    url: string;
    type: Site['type'];
    status: Site['status'];
  }>({ name: '', url: '', type: 'Site', status: 'Published' });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSite) {
      updateSite(editingSite.id, formData);
    } else {
      addSite({ ...formData, id: Date.now().toString(), visitors: '0' } as Site);
    }
    setIsModalOpen(false);
    setEditingSite(null);
    setFormData({ name: '', url: '', type: 'Site', status: 'Published' });
  };

  const handleDeploy = (id: string) => {
    setDeployingId(id);
    setDeployProgress(0);
    updateSite(id, { status: 'Deploying' });
    
    const interval = setInterval(() => {
      setDeployProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          updateSite(id, { status: 'Published' });
          setTimeout(() => setDeployingId(null), 1000);
          return 100;
        }
        return p + 5;
      });
    }, 150);
  };

  return (
    <div className="p-8 lg:p-12 space-y-12 animate-in fade-in duration-700 overflow-y-auto no-scrollbar">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Digital Grid</h1>
          <p className="text-slate-500 font-medium text-lg mt-4">Active cloud endpoints: <span className="text-indigo-600 font-black">{sites.filter(s=>s.status==='Published').length} Clusters</span></p>
        </div>
        <div className="flex gap-4">
          <div className="flex p-2 bg-slate-200/50 rounded-[32px] border border-slate-300/30">
            <button onClick={() => setActiveView('manage')} className={`px-10 py-3.5 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all ${activeView === 'manage' ? 'bg-white text-indigo-600 shadow-2xl scale-105' : 'text-slate-500'}`}>Manage</button>
            <button onClick={() => setActiveView('templates')} className={`px-10 py-3.5 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all ${activeView === 'templates' ? 'bg-white text-indigo-600 shadow-2xl scale-105' : 'text-slate-500'}`}>Studio</button>
          </div>
          <button onClick={() => { setEditingSite(null); setIsModalOpen(true); }} className="flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95">
            <Plus size={24} /> Deploy Node
          </button>
        </div>
      </div>

      {activeView === 'manage' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
          <div className="bg-[#0f172a] p-12 rounded-[64px] text-white flex flex-col justify-between relative overflow-hidden group border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-[100px] -mr-12 -mt-12 group-hover:bg-indigo-500/30 transition-all duration-1000" />
            <div>
              <div className="w-20 h-20 bg-white/10 rounded-[32px] flex items-center justify-center mb-10 border border-white/10 shadow-inner group-hover:rotate-12 transition-transform">
                <LayoutGrid size={40} className="text-indigo-400" />
              </div>
              <h2 className="text-4xl font-black mb-4 tracking-tighter leading-none">Global Network Oversight</h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">Cluster expansion is operational. Node latency at 12ms.</p>
            </div>
            <div className="mt-16 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Security: E2EE Active</span>
              <button onClick={() => setActiveView('templates')} className="text-white font-black text-xs uppercase tracking-widest hover:text-indigo-400 transition-colors bg-white/10 px-6 py-3 rounded-2xl border border-white/10">Browse Studio</button>
            </div>
          </div>

          {sites.map(site => (
            <div key={site.id} className="bg-white p-4 rounded-[64px] border border-slate-100 shadow-2xl shadow-slate-200/40 group hover:translate-y-[-8px] transition-all duration-500 relative">
              <div className="bg-slate-50 h-64 rounded-[48px] mb-6 relative overflow-hidden flex items-center justify-center border border-slate-200 shadow-inner">
                <img src={`https://picsum.photos/id/${parseInt(site.id) % 50 + 40}/1200/800`} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-8 right-8 flex gap-3">
                   <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-3xl shadow-2xl border border-white/20 ${
                     site.status === 'Published' ? 'bg-emerald-500/80 text-white' : 
                     site.status === 'Deploying' ? 'bg-indigo-500/80 text-white animate-pulse' : 'bg-slate-500/80 text-white'
                   }`}>
                     {site.status}
                   </span>
                   <div className="relative">
                     <button 
                       onClick={() => setActiveMenuId(activeMenuId === site.id ? null : site.id)}
                       className="p-3 bg-black/40 backdrop-blur-xl text-white rounded-2xl border border-white/10 hover:bg-black/60 transition-all"
                     >
                       <MoreVertical size={20} />
                     </button>
                     {activeMenuId === site.id && (
                       <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-50 animate-in zoom-in-95">
                          <button onClick={() => { duplicateSite(site.id); setActiveMenuId(null); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                             <Copy size={16} /> Clone Architecture
                          </button>
                          <button onClick={() => { handleDeploy(site.id); setActiveMenuId(null); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                             <Rocket size={16} /> Push to Global
                          </button>
                          <div className="my-2 border-t border-slate-50" />
                          <button onClick={() => { deleteSite(site.id); setActiveMenuId(null); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-rose-500 hover:bg-rose-50 transition-all">
                             <Trash2 size={16} /> Decommission
                          </button>
                       </div>
                     )}
                   </div>
                </div>
                {deployingId === site.id && (
                  <div className="absolute inset-0 bg-indigo-900/80 backdrop-blur-md flex flex-col items-center justify-center p-10 animate-in fade-in">
                    <Loader2 className="text-white animate-spin mb-4" size={48} />
                    <p className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4">Syncing Nodes... {deployProgress}%</p>
                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                       <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${deployProgress}%` }} />
                    </div>
                  </div>
                )}
              </div>
              <div className="px-10 pb-10">
                <div className="flex items-center gap-3 text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-3">
                  {site.type === 'Store' ? <ShoppingBag size={14} /> : <Globe size={14} />}
                  {site.type} Vector
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight group-hover:translate-x-2 transition-transform">{site.name}</h3>
                <div className="flex items-center justify-between mb-10">
                  <p className="text-sm text-slate-400 font-bold truncate max-w-[180px] font-mono opacity-60">{site.url}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
                    <BarChart3 size={14} className="text-indigo-400" /> {site.visitors}
                  </div>
                </div>
                
                <button 
                  onClick={() => { setEditingSite(site); setFormData({ name: site.name, url: site.url, type: site.type, status: site.status }); setIsModalOpen(true); }} 
                  className="w-full py-5 bg-[#0f172a] text-white rounded-[28px] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-2xl flex items-center justify-center gap-4 group/btn"
                >
                  <Edit3 size={18} className="group-hover/btn:rotate-12 transition-transform" /> Reconfigure Architecture
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-20">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h2 className="text-4xl font-black tracking-tight text-slate-900 leading-none">Studio Blueprints</h2>
                <p className="text-slate-400 font-medium text-lg mt-2">Deploy pre-validated enterprise structures.</p>
              </div>
              <div className="relative w-full max-w-md">
                <Search size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                <input type="text" placeholder="Trace blueprints..." className="w-full pl-16 pr-8 py-5 bg-white border-none rounded-[32px] text-lg font-bold shadow-2xl shadow-slate-200/40 focus:ring-4 focus:ring-indigo-500/10 transition-all" />
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {TEMPLATES.map(t => (
                <div key={t.id} className="bg-white p-4 rounded-[64px] border border-slate-100 group shadow-2xl shadow-slate-200/40 hover:scale-[1.02] transition-all">
                   <div className="relative h-72 rounded-[48px] overflow-hidden mb-8 border border-slate-200 shadow-inner">
                      <img src={t.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                      <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                   <div className="px-8 pb-8 flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-black text-slate-900 tracking-tight">{t.name}</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1">{t.type} Manifest</p>
                      </div>
                      <button onClick={() => { setFormData({ name: `Vector_${t.name}`, url: 'cluster.zentry.io', type: t.type as any, status: 'Draft' }); setIsModalOpen(true); }} className="p-5 bg-indigo-600 text-white rounded-3xl hover:bg-indigo-700 hover:rotate-12 transition-all shadow-2xl shadow-indigo-600/30 active:scale-90">
                        <Plus size={28} />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-2xl z-[100] flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="bg-white rounded-[64px] w-full max-w-xl p-16 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-violet-600" />
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-black flex items-center gap-4 tracking-tighter text-slate-900"><Globe size={40} className="text-indigo-600" /> Node Manifest</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-slate-100 rounded-3xl transition-all"><X size={28} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Identifier</label>
                <input type="text" placeholder="Cluster Label..." className="w-full px-10 py-6 bg-slate-50 border-none rounded-[32px] font-black text-xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-300" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Network Slug</label>
                <div className="relative">
                   <Cloud className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                   <input type="text" placeholder="subdomain.zentry.io" className="w-full pl-16 pr-8 py-6 bg-slate-50 border-none rounded-[32px] font-bold text-lg outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Core Engine</label>
                  <select className="w-full px-10 py-6 bg-slate-50 border-none rounded-[28px] font-black text-sm uppercase outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                    <option value="Site">Dynamic Page</option>
                    <option value="Store">E-Commerce</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Cloud Status</label>
                  <select className="w-full px-10 py-6 bg-slate-50 border-none rounded-[28px] font-black text-sm uppercase outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                    <option value="Published">Online</option>
                    <option value="Draft">Hibernating</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-8 bg-indigo-600 text-white font-black rounded-[40px] shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all text-xl uppercase tracking-[0.3em] flex items-center justify-center gap-4 mt-6">
                Commit to Cloud <Rocket size={24} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sites;
