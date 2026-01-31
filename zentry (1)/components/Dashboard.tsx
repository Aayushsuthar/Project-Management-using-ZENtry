
import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, CheckSquare, DollarSign, Clock, Calendar, Zap, Rocket, Activity, BarChart3, Globe, ChevronLeft, ChevronRight, Target, Flame } from 'lucide-react';
import { Deal, Task, Project } from '../types';

const data = [
  { name: 'Mon', revenue: 4000, effort: 2400 },
  { name: 'Tue', revenue: 3000, effort: 1398 },
  { name: 'Wed', revenue: 5000, effort: 9800 },
  { name: 'Thu', revenue: 2780, effort: 3908 },
  { name: 'Fri', revenue: 6890, effort: 4800 },
  { name: 'Sat', revenue: 2390, effort: 3800 },
  { name: 'Sun', revenue: 8490, effort: 4300 },
];

const companyMetrics = [
  { subject: 'Fiscal Health', A: 95, fullMark: 100 },
  { subject: 'Technical Depth', A: 88, fullMark: 100 },
  { subject: 'Market Reach', A: 92, fullMark: 100 },
  { subject: 'Operational Speed', A: 84, fullMark: 100 },
  { subject: 'Innovation', A: 98, fullMark: 100 },
];

const StatCard = ({ title, value, change, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:translate-y-[-4px] transition-all group overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl rounded-full -mr-16 -mt-16 ${colorClass}`} />
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{title}</p>
        <h3 className="text-4xl font-black mt-2 text-slate-900 tracking-tight">{value}</h3>
      </div>
      <div className={`p-4 rounded-3xl ${colorClass} text-white shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-6`}>
        <Icon size={28} />
      </div>
    </div>
    <div className="mt-6 flex items-center gap-2 relative z-10">
      <span className={`flex items-center text-xs font-black ${change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
        {change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </span>
      <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Velocity vs prev</span>
    </div>
  </div>
);

interface DashboardProps {
  deals: Deal[];
  tasks: Task[];
  projects: Project[];
}

const Dashboard: React.FC<DashboardProps> = ({ deals, tasks, projects }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const totalRevenue = deals.reduce((sum, d) => sum + d.amount, 0);
  const activeTasks = tasks.filter(t => t.status !== 'done');
  
  const totalSeconds = tasks.reduce((sum, task) => sum + task.timeLogs.reduce((tsum, log) => tsum + log.duration, 0), 0);
  const totalHours = Math.floor(totalSeconds / 3600);

  // Derive upcoming events from tasks
  const upcomingEvents = activeTasks
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4);

  return (
    <div className="p-8 lg:p-12 space-y-12 animate-in fade-in duration-700 h-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Command Center</h1>
          <p className="text-slate-500 font-medium text-lg mt-4">Operational efficiency is currently <span className="text-indigo-600 font-bold">Optimal (98.4%)</span></p>
        </div>
        <div className="flex gap-4">
           <div className="bg-gradient-to-br from-indigo-900 to-black p-6 rounded-[32px] text-white flex items-center gap-6 shadow-2xl border border-white/10">
              <div className="p-3 bg-white/10 rounded-2xl"><Activity size={24} className="text-emerald-400" /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Network Latency</p>
                <p className="text-xl font-black">12ms <span className="text-[10px] text-emerald-400 ml-2">LOW</span></p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Fiscal Flow" value={`₹${(totalRevenue/1000).toFixed(1)}L`} change="+22.4%" icon={DollarSign} colorClass="bg-emerald-600" />
        <StatCard title="Task Pressure" value={activeTasks.length.toString()} change="+8.1%" icon={Zap} colorClass="bg-indigo-600" />
        <StatCard title="Utilisation" value={`${totalHours}h`} change="+12.5%" icon={Clock} colorClass="bg-violet-600" />
        <StatCard title="Global Reach" value="1.5M" change="+40.1%" icon={Users} colorClass="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/30">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900">Yield Analytics</h2>
                  <p className="text-slate-400 text-sm font-medium mt-1">Growth vs Workload metrics (7d cycle)</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-indigo-600" />
                     <span className="text-[10px] font-black uppercase text-slate-500">Revenue</span>
                  </div>
                </div>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 900}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 900}} dx={-15} />
                    <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0(0 / 0.15)', padding: '20px'}} />
                    <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={6} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/30">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900">Strategic Timeline</h2>
                  <p className="text-slate-400 text-sm font-medium mt-1">Vector thresholds and key business triggers.</p>
                </div>
                <div className="flex items-center gap-4">
                   <button className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all text-slate-400"><ChevronLeft size={18} /></button>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                   <button className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all text-slate-400"><ChevronRight size={18} /></button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-4 mb-8">
                 {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                   <div key={day} className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">{day}</div>
                 ))}
                 {/* Mock mini calendar grid */}
                 {Array.from({ length: 31 }, (_, i) => (
                   <div key={i} className={`h-10 flex items-center justify-center rounded-xl text-xs font-black relative group transition-all cursor-pointer ${
                     i + 1 === currentDate.getDate() ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'text-slate-600 hover:bg-slate-50'
                   }`}>
                     {i + 1}
                     {(i === 12 || i === 24) && <div className="absolute bottom-1 w-1 h-1 bg-rose-500 rounded-full" />}
                     {i === 18 && <div className="absolute bottom-1 w-1 h-1 bg-emerald-500 rounded-full" />}
                   </div>
                 ))}
              </div>

              <div className="space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Upcoming Benchmarks</h3>
                 {upcomingEvents.map(event => (
                   <div key={event.id} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                      <div className="flex items-center gap-5">
                         <div className={`p-4 rounded-2xl ${event.priority === 'high' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'} shadow-sm`}>
                            <Target size={20} />
                         </div>
                         <div>
                            <p className="font-black text-slate-900 tracking-tight">{event.title}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{event.dueDate}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-600">
                         <span className="text-[10px] font-black uppercase tracking-widest">Deploy</span>
                         <ChevronRight size={14} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0f172a] p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
            <h2 className="text-2xl font-black tracking-tight mb-8 relative z-10 flex items-center gap-4"><BarChart3 className="text-emerald-400" /> Company Matrix</h2>
            <div className="h-[300px] relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={companyMetrics}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 8, fontWeight: 900 }} />
                  <Radar name="Company" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 p-6 bg-white/5 rounded-3xl border border-white/10">
               <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-400">Aggregated ROI</span>
                  <span className="text-xl font-black text-emerald-400">+18.4%</span>
               </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-500 to-fuchsia-600 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                   <Flame size={40} className="text-white animate-pulse" />
                   <div className="bg-white/20 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/20">Hot Project</div>
                </div>
                <h3 className="text-3xl font-black tracking-tighter leading-none mb-4">Industrial OS Upgrade</h3>
                <p className="text-rose-100 font-medium leading-relaxed mb-10">Priority vector deployment for industrial scaling. 12 tasks pending execution.</p>
                <button className="w-full py-5 bg-white text-rose-600 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all">Audit Pipeline</button>
             </div>
          </div>
        </div>
      </div>
      
      <div className="pb-20" />
    </div>
  );
};

export default Dashboard;
