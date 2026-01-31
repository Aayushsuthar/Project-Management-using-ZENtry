
import React, { useState } from 'react';
import { Megaphone, Target, MousePointer2, Send, Plus, BarChart2, Globe, Mail, MessageSquare, X, Rocket, Loader2, Search, Star, MoreVertical, Trash2, Power, PowerOff } from 'lucide-react';
import { MarketingCampaign } from '../types';

interface MarketingProps {
  campaigns: MarketingCampaign[];
  addCampaign: (campaign: MarketingCampaign) => void;
  updateCampaign: (id: string, updates: Partial<MarketingCampaign>) => void;
  deleteCampaign: (id: string) => void;
  onLaunch: (campaign: MarketingCampaign) => void;
}

const Marketing: React.FC<MarketingProps> = ({ campaigns, addCampaign, updateCampaign, deleteCampaign, onLaunch }) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'reviews'>('roadmap');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [newCampaign, setNewCampaign] = useState({ name: '', budget: '', status: 'Draft' as const });
  const [launchingId, setLaunchingId] = useState<string | null>(null);

  const filteredCampaigns = campaigns.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addCampaign({
      id: Date.now().toString(),
      name: newCampaign.name,
      status: newCampaign.status as any,
      budget: '₹' + Number(newCampaign.budget).toLocaleString(),
      reach: '0',
      conversions: '0',
      roi: '0%',
      reviews: []
    });
    setIsModalOpen(false);
    setNewCampaign({ name: '', budget: '', status: 'Draft' });
  };

  const toggleStatus = (campaign: MarketingCampaign) => {
    const nextStatus = campaign.status === 'Active' ? 'Deactivated' : 'Active';
    updateCampaign(campaign.id, { status: nextStatus });
  };

  const executeLaunch = (campaign: MarketingCampaign) => {
    setLaunchingId(campaign.id);
    setTimeout(() => {
      updateCampaign(campaign.id, { 
        status: 'Active', 
        lastLaunched: new Date().toLocaleTimeString(),
        reach: '24.2k',
        roi: '+14%'
      });
      onLaunch(campaign);
      setLaunchingId(null);
    }, 2500);
  };

  return (
    <div className="p-8 lg:p-12 space-y-12 animate-in fade-in duration-700 h-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Growth Center</h1>
          <p className="text-slate-500 font-medium text-lg mt-4">Active acquisition vectors: <span className="text-indigo-600 font-black">{campaigns.filter(c=>c.status==='Active').length} Sprints</span></p>
        </div>
        <div className="flex gap-4">
          <div className="flex p-2 bg-slate-200/50 rounded-[32px] border border-slate-300/30">
            <button onClick={() => setActiveTab('roadmap')} className={`px-10 py-3.5 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'roadmap' ? 'bg-white text-indigo-600 shadow-2xl scale-105' : 'text-slate-500'}`}>Roadmap</button>
            <button onClick={() => setActiveTab('reviews')} className={`px-10 py-3.5 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'reviews' ? 'bg-white text-indigo-600 shadow-2xl scale-105' : 'text-slate-500'}`}>Critique</button>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95">
            <Plus size={24} /> New Vector
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { label: 'Aggregate CAC', value: '₹142.0', icon: Target, color: 'text-emerald-500' },
          { label: 'Retention Magnitude', value: '94.2%', icon: MousePointer2, color: 'text-indigo-500' },
          { label: 'Growth Velocity', value: '+12.4%', icon: BarChart2, color: 'text-rose-500' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-10 rounded-[56px] border border-slate-100 shadow-2xl shadow-slate-200/40 group hover:translate-y-[-4px] transition-all">
            <div className="flex items-center gap-6">
              <div className={`p-5 rounded-[28px] bg-slate-50 group-hover:bg-white transition-all ${stat.color} border border-transparent group-hover:border-slate-100`}>
                <stat.icon size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</p>
                <h3 className="text-4xl font-black text-slate-900 tracking-tight mt-1">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeTab === 'roadmap' ? (
        <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
          <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-slate-50/50">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Roadmap</h2>
              <p className="text-slate-400 font-medium text-sm mt-1">Directing multi-channel acquisition streams.</p>
            </div>
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="text" 
                placeholder="Trace vector identifier..." 
                className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-[24px] text-sm font-bold shadow-sm focus:ring-4 focus:ring-indigo-500/10 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/30 border-b border-slate-100">
                <tr>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Campaign Descriptor</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Allocation</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Magnitude</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Performance</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Hot Toggle</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Execution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredCampaigns.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center font-black text-xl border border-indigo-100 shadow-inner">{c.name[0]}</div>
                        <div>
                          <span className="font-black text-slate-900 text-lg tracking-tight block">{c.name}</span>
                          {c.lastLaunched && <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em] mt-1 flex items-center gap-1.5"><Rocket size={8} /> Active: {c.lastLaunched}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg ${
                        c.status === 'Active' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 
                        c.status === 'Deactivated' ? 'bg-rose-500 text-white shadow-rose-500/20' : 'bg-slate-400 text-white'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-10 py-8 font-black text-slate-900 tracking-tighter text-lg">{c.budget}</td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-black text-slate-900 tracking-tight">{c.reach} nodes reached</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{c.conversions} activations</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`font-black text-lg tracking-tighter ${c.roi.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}`}>{c.roi} Yield</span>
                    </td>
                    <td className="px-10 py-8">
                       <button 
                        onClick={() => toggleStatus(c)}
                        className={`p-3 rounded-2xl transition-all shadow-lg flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${c.status === 'Active' ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}
                       >
                         {c.status === 'Active' ? <><PowerOff size={16} /> Halt</> : <><Power size={16} /> Start</>}
                       </button>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => executeLaunch(c)}
                          disabled={launchingId === c.id}
                          className="flex items-center gap-3 px-8 py-3 bg-[#0f172a] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all disabled:opacity-40 min-w-[150px] justify-center shadow-xl active:scale-95"
                        >
                          {launchingId === c.id ? (
                            <><Loader2 size={16} className="animate-spin" /> Ingesting</>
                          ) : (
                            <><Send size={16} /> Deploy Vector</>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in duration-500">
           {campaigns.filter(c => c.reviews && c.reviews.length > 0).map(c => (
             <div key={c.id} className="bg-white p-12 rounded-[64px] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-all" />
                <div className="flex items-center gap-5 mb-10">
                   <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center border border-amber-100 shadow-inner"><Star size={24} fill="currentColor" /></div>
                   <div>
                      <h4 className="text-2xl font-black tracking-tight text-slate-900">{c.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Performance Review</p>
                   </div>
                </div>
                <div className="space-y-6">
                   {c.reviews?.map((review, i) => (
                     <div key={i} className="p-6 bg-slate-50 rounded-[32px] border border-slate-200 font-medium text-slate-600 leading-relaxed group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all">
                        "{review}"
                     </div>
                   ))}
                </div>
             </div>
           ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-2xl z-[100] flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="bg-white rounded-[64px] w-full max-w-xl p-16 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-violet-600" />
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-black flex items-center gap-4 tracking-tighter text-slate-900"><Megaphone size={40} className="text-indigo-600" /> Growth Vector</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-slate-100 rounded-3xl transition-all"><X size={28} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-8">
              <input type="text" placeholder="Campaign Label..." className="w-full px-10 py-6 bg-slate-50 border-none rounded-[32px] font-black text-xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-300" value={newCampaign.name} onChange={e => setNewCampaign({...newCampaign, name: e.target.value})} required />
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Fiscal Allocation (₹)</label>
                 <input type="number" placeholder="Magnitude..." className="w-full px-10 py-6 bg-slate-50 border-none rounded-[32px] font-bold text-lg outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner" value={newCampaign.budget} onChange={e => setNewCampaign({...newCampaign, budget: e.target.value})} />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Deployment Protocol</label>
                 <select className="w-full px-10 py-6 bg-slate-50 border-none rounded-[28px] font-black text-sm uppercase outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" value={newCampaign.status} onChange={e => setNewCampaign({...newCampaign, status: e.target.value as any})}>
                   <option value="Draft">Draft (Simulated)</option>
                   <option value="Active">Hot Deployment</option>
                 </select>
              </div>
              <button type="submit" className="w-full py-8 bg-indigo-600 text-white font-black rounded-[40px] shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all text-xl uppercase tracking-[0.3em] flex items-center justify-center gap-4 mt-6">
                Authorize Budget & Begin <Rocket size={24} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketing;
