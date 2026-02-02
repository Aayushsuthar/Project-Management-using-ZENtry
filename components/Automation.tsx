
import React, { useState } from 'react';
import { Zap, Play, Settings2, Trash2, Plus, ArrowRight, ShieldCheck, Database, Mail, X } from 'lucide-react';
import { AutomationFlow } from '../types';

interface AutomationProps {
  flows: AutomationFlow[];
  addFlow: (flow: AutomationFlow) => void;
}

const Automation: React.FC<AutomationProps> = ({ flows, addFlow }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFlow, setNewFlow] = useState({ name: '', trigger: 'New CRM Lead', action: 'Send Welcome Email' });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addFlow({
      id: Date.now().toString(),
      name: newFlow.name,
      trigger: newFlow.trigger,
      action: newFlow.action,
      status: 'Running'
    });
    setIsModalOpen(false);
    setNewFlow({ name: '', trigger: 'New CRM Lead', action: 'Send Welcome Email' });
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 animate-in fade-in duration-500 h-full overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Business Automation</h1>
          <p className="text-slate-500 font-medium">Let robots handle the repetitive 80% of your workload.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20">
          <Plus size={20} /> Deploy Robot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0f172a] p-10 rounded-[48px] text-white relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <Zap className="text-indigo-400 mb-6" size={48} />
            <h2 className="text-3xl font-black mb-4 tracking-tight">AI-Driven Optimization</h2>
            <p className="text-slate-400 font-medium mb-10 leading-relaxed">ZENtry CoPilot has identified 3 bottlenecks in your Sales Pipeline that could be automated today.</p>
            <button className="px-8 py-4 bg-indigo-500 text-white rounded-2xl font-black text-sm hover:bg-indigo-400 transition-all flex items-center gap-2">
              Optimize Logic <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center">
             <div className="p-4 rounded-3xl bg-teal-50 text-teal-600 mb-4"><Database size={32} /></div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Executions</p>
             <h3 className="text-4xl font-black text-slate-900">1.2M</h3>
          </div>
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center">
             <div className="p-4 rounded-3xl bg-blue-50 text-blue-600 mb-4"><ShieldCheck size={32} /></div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hours Saved</p>
             <h3 className="text-4xl font-black text-slate-900">450h</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[48px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-black tracking-tight">Active Logic Gates</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {flows.map(w => (
            <div key={w.id} className="p-8 flex items-center justify-between group hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${w.status === 'Running' ? 'bg-emerald-50 text-emerald-600 shadow-inner' : 'bg-slate-100 text-slate-400'}`}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{w.name}</h4>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{w.status}</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Trigger:</span>
                    <span className="text-xs font-bold text-slate-600">{w.trigger}</span>
                  </div>
                  <ArrowRight className="text-slate-300" size={16} />
                  <div className="flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
                    <span className="text-[10px] font-black text-indigo-400 uppercase">Action:</span>
                    <span className="text-xs font-bold text-indigo-600">{w.action}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all shadow-sm"><Settings2 size={18} /></button>
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[48px] w-full max-w-lg p-10 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black flex items-center gap-3"><Zap size={32} className="text-indigo-600" /> New Flow</h2>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-6">
              <input type="text" placeholder="Workflow Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={newFlow.name} onChange={e => setNewFlow({...newFlow, name: e.target.value})} required />
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Logic Pattern</label>
                 <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-xs uppercase" value={newFlow.trigger} onChange={e => setNewFlow({...newFlow, trigger: e.target.value})}>
                    <option value="New CRM Lead">IF New CRM Lead</option>
                    <option value="Task Completed">IF Task Completed</option>
                    <option value="Due Date Passed">IF Due Date Passed</option>
                 </select>
                 <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-xs uppercase" value={newFlow.action} onChange={e => setNewFlow({...newFlow, action: e.target.value})}>
                    <option value="Send Welcome Email">THEN Send Welcome Email</option>
                    <option value="Notify WhatsApp">THEN Notify WhatsApp</option>
                    <option value="Post to Slack">THEN Post to Slack</option>
                 </select>
              </div>
              <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black rounded-3xl shadow-xl hover:bg-indigo-700 transition-all">Enable Automation</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Automation;
