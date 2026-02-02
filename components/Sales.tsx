
import React, { useState, useMemo } from 'react';
import { Deal, Invoice } from '../types';
import { 
  DollarSign, FileText, TrendingUp, MoreVertical, Plus, CheckCircle2,
  Clock, X, PieChart, BarChart3, Search, Download, Trash2, Copy,
  Filter, ArrowRight, ShieldCheck, Activity, Target
} from 'lucide-react';

interface SalesProps {
  deals: Deal[];
  invoices: Invoice[];
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  addDeal: (deal: Deal) => void;
  deleteDeal: (id: string) => void;
  searchQuery?: string;
}

const Sales: React.FC<SalesProps> = ({ deals, invoices, updateDeal, addDeal, deleteDeal, searchQuery = '' }) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'invoices' | 'analytics'>('pipeline');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [newDeal, setNewDeal] = useState({ title: '', company: '', amount: '', contact: '', stage: 'lead' });
  
  // Advanced Filters
  const [filterStage, setFilterStage] = useState<'all' | Deal['stage']>('all');
  const [filterMagnitude, setFilterMagnitude] = useState<'all' | 'high' | 'mid' | 'low'>('all');

  const filteredDeals = useMemo(() => {
    return deals.filter(d => {
      const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            d.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStage = filterStage === 'all' || d.stage === filterStage;
      
      let matchesMagnitude = true;
      if (filterMagnitude === 'high') matchesMagnitude = d.amount >= 200000;
      else if (filterMagnitude === 'mid') matchesMagnitude = d.amount < 200000 && d.amount >= 50000;
      else if (filterMagnitude === 'low') matchesMagnitude = d.amount < 50000;

      return matchesSearch && matchesStage && matchesMagnitude;
    });
  }, [deals, searchQuery, filterStage, filterMagnitude]);

  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeal.title || !newDeal.company) return;
    addDeal({
      id: Math.random().toString(36).substr(2, 9),
      title: newDeal.title,
      company: newDeal.company,
      amount: parseFloat(newDeal.amount) || 0,
      contact: newDeal.contact || 'Direct Vector',
      stage: newDeal.stage as any
    });
    setIsAddModalOpen(false);
    setNewDeal({ title: '', company: '', amount: '', contact: '', stage: 'lead' });
  };

  return (
    <div className="p-8 lg:p-12 space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Fiscal Flow</h1>
          <p className="text-slate-500 font-medium text-lg mt-4">Projected yield: <span className="text-emerald-600 font-black">₹{(deals.reduce((s,d)=>s+d.amount,0)/100000).toFixed(2)}L</span></p>
        </div>
        <div className="flex gap-4">
          <div className="flex p-2 bg-slate-200/50 rounded-[32px] border border-slate-300/30">
            {['pipeline', 'invoices', 'analytics'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-10 py-3.5 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-2xl scale-105' : 'text-slate-500'}`}>{tab}</button>
            ))}
          </div>
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white rounded-[28px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 transition-all">
            <Plus size={24} /> New Strategic Deal
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 bg-white p-6 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/20">
         <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-200">
            <Filter size={18} className="text-slate-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Filter Logic</span>
         </div>
         <select className="bg-slate-50 border-none rounded-2xl px-8 py-3 text-xs font-black uppercase tracking-widest text-slate-600 outline-none focus:ring-4 focus:ring-indigo-500/10" value={filterStage} onChange={e => setFilterStage(e.target.value as any)}>
            <option value="all">Stage: All</option>
            <option value="lead">Lead</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="won">Won</option>
         </select>
         <select className="bg-slate-50 border-none rounded-2xl px-8 py-3 text-xs font-black uppercase tracking-widest text-slate-600 outline-none focus:ring-4 focus:ring-indigo-500/10" value={filterMagnitude} onChange={e => setFilterMagnitude(e.target.value as any)}>
            <option value="all">Magnitude: All</option>
            <option value="high">High (&gt;2L)</option>
            <option value="mid">Mid (50k-2L)</option>
            <option value="low">Low (&lt;50k)</option>
         </select>
         <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-4 bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100">
               <Activity size={18} className="text-indigo-600" />
               <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Active Velocity: 1.2x</span>
            </div>
         </div>
      </div>

      {activeTab === 'pipeline' && (
        <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar min-h-[700px]">
          {['Lead', 'Qualified', 'Proposal', 'Won'].map((label) => {
            const stage = label.toLowerCase() as Deal['stage'];
            const stageDeals = filteredDeals.filter(d => d.stage === stage);
            return (
              <div key={label} className="min-w-[420px] flex flex-col gap-8">
                <div className="flex items-center justify-between px-6">
                  <div className="flex items-center gap-4">
                    <span className="font-black text-slate-900 uppercase text-xs tracking-[0.4em]">{label}</span>
                    <span className="bg-slate-900 text-white text-[10px] px-3 py-1 rounded-full font-black shadow-lg">
                      {stageDeals.length}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 bg-slate-100/30 rounded-[56px] p-6 space-y-6 border-4 border-dashed border-slate-200/50">
                  {stageDeals.map(deal => (
                    <div 
                      key={deal.id} 
                      className="bg-white p-8 rounded-[40px] shadow-2xl shadow-slate-200/20 border border-slate-100 group relative overflow-hidden transition-all"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full" />
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <h4 className="font-black text-slate-900 text-xl tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{deal.title}</h4>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-6 bg-slate-50 px-4 py-2 rounded-full w-fit">
                        <Target size={12} className="text-emerald-500" /> {deal.company}
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-slate-50 relative z-10">
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{(deal.amount/1000).toFixed(1)}k</span>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center font-black text-xs text-indigo-600 border border-indigo-100">{deal.contact[0]}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Sales;
