
import React, { useState, useMemo } from 'react';
import { TeamMember, PerformanceMetric } from '../types';
import { 
  UserPlus, Mail, Phone, X, Edit2, Trash2, Linkedin, Github, 
  Youtube, Instagram, MessageCircle, Send, Award, Search, 
  Filter, Briefcase, ChevronRight, Globe, Activity, TrendingUp,
  BrainCircuit, CheckCircle
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

interface HRProps {
  team: TeamMember[];
  addMember: (m: TeamMember) => void;
  updateMember: (id: string, u: Partial<TeamMember>) => void;
  deleteMember: (id: string) => void;
  searchQuery?: string;
}

const HR: React.FC<HRProps> = ({ team, addMember, updateMember, deleteMember, searchQuery = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [selectedForMatrix, setSelectedForMatrix] = useState<TeamMember | null>(null);
  
  const [formData, setFormData] = useState<Partial<TeamMember>>({ 
    name: '', role: '', department: '', email: '', phone: '', 
    location: '', avatar: 'https://i.pravatar.cc/150', skills: [] 
  });

  const filteredTeam = useMemo(() => {
    if (!searchQuery) return team;
    const lower = searchQuery.toLowerCase();
    return team.filter(m => 
      m.name.toLowerCase().includes(lower) || 
      m.role.toLowerCase().includes(lower) || 
      m.skills?.some(s => s.toLowerCase().includes(lower)) ||
      m.department.toLowerCase().includes(lower)
    );
  }, [team, searchQuery]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMember(editingMember.id, formData);
    } else {
      addMember({ ...formData, id: Date.now().toString() } as TeamMember);
    }
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const getPerformanceData = (perf?: PerformanceMetric) => [
    { subject: 'KPI', A: perf?.kpi || 0 },
    { subject: 'Growth', A: perf?.technicalGrowth || 0 },
    { subject: 'Collab', A: perf?.collaboration || 0 },
    { subject: 'Reliable', A: perf?.reliability || 0 },
  ];

  return (
    <div className="p-8 lg:p-12 space-y-12 animate-in fade-in h-full overflow-y-auto no-scrollbar pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Expert Hub</h1>
          <p className="text-slate-500 font-medium mt-4 text-lg">Monitoring <span className="text-teal-600 font-bold">{team.length} specialist vectors</span>.</p>
        </div>
        <button onClick={() => { setEditingMember(null); setIsModalOpen(true); }} className="flex items-center gap-3 px-10 py-5 bg-teal-600 text-white rounded-[28px] font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all">
          <UserPlus size={24} /> New Specialist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTeam.map(emp => (
          <div key={emp.id} className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-xl hover:shadow-2xl hover:translate-y-[-8px] transition-all group relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button onClick={() => { setEditingMember(emp); setFormData(emp); setIsModalOpen(true); }} className="p-3 bg-white rounded-xl shadow-md text-slate-400 hover:text-teal-600 transition-all"><Edit2 size={16} /></button>
              <button onClick={() => { setSelectedForMatrix(emp); setIsPerformanceOpen(true); }} className="p-3 bg-white rounded-xl shadow-md text-slate-400 hover:text-indigo-600 transition-all"><Activity size={16} /></button>
              <button onClick={() => deleteMember(emp.id)} className="p-3 bg-white rounded-xl shadow-md text-slate-400 hover:text-rose-600 transition-all"><Trash2 size={16} /></button>
            </div>
            
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-teal-500/10 blur-2xl rounded-full scale-110" />
              <img src={emp.avatar} className="w-36 h-36 rounded-[48px] object-cover shadow-2xl border-4 border-white relative z-10 group-hover:rotate-3 transition-transform duration-500" />
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white shadow-lg z-20" />
            </div>
            
            <h4 className="font-black text-slate-900 text-2xl tracking-tight leading-none mb-1">{emp.name}</h4>
            <p className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">{emp.role}</p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
               {emp.skills?.slice(0, 3).map(skill => (
                 <span key={skill} className="px-3 py-1 bg-slate-50 text-[9px] font-black text-slate-500 uppercase rounded-full border border-slate-100">{skill}</span>
               ))}
               {emp.skills && emp.skills.length > 3 && <span className="text-[9px] font-black text-slate-300">+{emp.skills.length - 3}</span>}
            </div>

            <div className="w-full bg-slate-50 rounded-3xl p-4 mb-8 border border-slate-100">
               <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Growth Vector</span>
                  <span className="text-xs font-black text-emerald-600">{emp.performance?.technicalGrowth || 0}%</span>
               </div>
               <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-[1500ms]" style={{ width: `${emp.performance?.technicalGrowth || 0}%` }} />
               </div>
            </div>

            <button onClick={() => { setSelectedForMatrix(emp); setIsPerformanceOpen(true); }} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-600 transition-all flex items-center justify-center gap-2">
               <BrainCircuit size={16} /> Technical Audit
            </button>
          </div>
        ))}
      </div>

      {isPerformanceOpen && selectedForMatrix && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-2xl z-[150] flex items-center justify-center p-8 animate-in fade-in" onClick={() => setIsPerformanceOpen(false)}>
           <div className="bg-white rounded-[64px] w-full max-w-2xl p-16 shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-teal-500 via-indigo-500 to-rose-500" />
              <div className="flex justify-between items-start mb-12">
                 <div className="flex items-center gap-6">
                    <img src={selectedForMatrix.avatar} className="w-24 h-24 rounded-[32px] object-cover shadow-2xl border-4 border-white" />
                    <div>
                       <h2 className="text-4xl font-black tracking-tighter text-slate-900">{selectedForMatrix.name}</h2>
                       <p className="text-xl font-bold text-indigo-600">{selectedForMatrix.role}</p>
                    </div>
                 </div>
                 <button onClick={() => setIsPerformanceOpen(false)} className="p-4 hover:bg-slate-100 rounded-3xl transition-all"><X size={28} /></button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getPerformanceData(selectedForMatrix.performance)}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} />
                          <Radar name="Performance" dataKey="A" stroke="#0d9488" fill="#0d9488" fillOpacity={0.6} />
                       </RadarChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                       <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Core Competencies</h4>
                       <div className="flex flex-wrap gap-2">
                          {selectedForMatrix.skills?.map(s => <span key={s} className="px-3 py-1 bg-white text-[10px] font-black text-slate-800 rounded-full border border-slate-200 shadow-sm">{s}</span>)}
                       </div>
                    </div>
                    <div className="p-6 bg-[#0f172a] text-white rounded-[32px]">
                       <div className="flex items-center justify-between mb-4">
                          <TrendingUp className="text-emerald-400" size={24} />
                          <span className="text-[10px] font-black uppercase text-slate-500">Historical Momentum</span>
                       </div>
                       <p className="text-3xl font-black text-white">+12.4% <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-widest">Growth vs Q3</span></p>
                    </div>
                 </div>
              </div>
              
              <button className="w-full mt-12 py-6 bg-teal-600 text-white font-black rounded-[32px] text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3">
                 <CheckCircle size={20} /> Acknowledge Performance Review
              </button>
           </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-50 flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white rounded-[56px] w-full max-w-xl p-12 shadow-2xl relative animate-in zoom-in-95 overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-teal-500" />
             <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black tracking-tighter">Onboard Expert</h2>
              <button onClick={() => { setIsModalOpen(false); setEditingMember(null); }} className="p-3 hover:bg-slate-100 rounded-2xl transition-all"><X size={24} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <input type="text" placeholder="Identity Vector" className="w-full px-8 py-4 bg-slate-50 rounded-[28px] border-slate-200 font-bold outline-none focus:ring-4 focus:ring-teal-500/10 transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              <input type="text" placeholder="Operational Role" className="w-full px-8 py-4 bg-slate-50 rounded-[28px] border-slate-200 font-bold outline-none focus:ring-4 focus:ring-teal-500/10 transition-all" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required />
              <button type="submit" className="w-full py-6 bg-teal-600 text-white font-black rounded-[32px] text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-4">Commit to Hub</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HR;
