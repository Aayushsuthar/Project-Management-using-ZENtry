
import React, { useState, useMemo } from 'react';
import { Task, Project, TeamMember, TimeLog } from '../types';
import { 
  Plus, 
  Clock, 
  X, 
  Sparkles, 
  Loader2, 
  Search, 
  RotateCcw, 
  Briefcase, 
  Layers, 
  Target, 
  Calendar, 
  Mail, 
  MoreVertical, 
  Trash2, 
  MessageSquare,
  Filter,
  UserCheck,
  ShieldAlert,
  AlertCircle,
  Play,
  History,
  Timer,
  User,
  Building2,
  ChevronRight
} from 'lucide-react';
import { generateTaskDescription } from '../services/geminiService';

interface ProjectsProps {
  tasks: Task[];
  projects: Project[];
  team: TeamMember[];
  updateTask: (id: string, updates: Partial<Task>) => void;
  addTask: (task: Task) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  onShare: (subject: string, body: string) => void;
}

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

const Projects: React.FC<ProjectsProps> = ({ tasks, projects, team, updateTask, addTask, addProject, deleteProject, onShare }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'board' | 'projects'>('board');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [logMinutes, setLogMinutes] = useState('');
  
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    status: 'todo' as const, 
    priority: 'medium' as const, 
    projectId: projects[0]?.id || '', 
    assignee: team[0]?.name || '',
    dueDate: new Date().toISOString().split('T')[0]
  });
  
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [filters, setFilters] = useState({ assignee: 'all', priority: 'all', search: '', dateRange: 'all' });

  const handleAiGenerate = async () => {
    if (!newTask.title) return;
    setIsAiGenerating(true);
    const desc = await generateTaskDescription(newTask.title);
    setNewTask(prev => ({ ...prev, description: desc }));
    setIsAiGenerating(false);
  };

  const handleAddTimeLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskId || !logMinutes) return;
    const task = tasks.find(t => t.id === selectedTaskId);
    if (!task) return;

    const seconds = parseInt(logMinutes) * 60;
    const newLog: TimeLog = {
      id: Date.now().toString(),
      duration: seconds,
      timestamp: new Date().toLocaleString()
    };

    updateTask(selectedTaskId, {
      timeLogs: [...task.timeLogs, newLog]
    });
    setLogMinutes('');
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesAssignee = filters.assignee === 'all' || task.assignee === filters.assignee;
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase());
      
      const taskDate = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0,0,0,0);
      
      let matchesDate = true;
      if (filters.dateRange === 'overdue') matchesDate = taskDate < today && task.status !== 'done';
      else if (filters.dateRange === 'today') {
        const dStr = taskDate.toISOString().split('T')[0];
        const tStr = today.toISOString().split('T')[0];
        matchesDate = dStr === tStr;
      }

      return matchesAssignee && matchesPriority && matchesSearch && matchesDate;
    });
  }, [tasks, filters]);

  const selectedTask = useMemo(() => tasks.find(t => t.id === selectedTaskId), [tasks, selectedTaskId]);

  const taskProject = useMemo(() => {
    if (!selectedTask) return null;
    return projects.find(p => p.id === selectedTask.projectId);
  }, [selectedTask, projects]);

  const taskAssignee = useMemo(() => {
    if (!selectedTask) return null;
    return team.find(m => m.name === selectedTask.assignee);
  }, [selectedTask, team]);

  return (
    <div className="p-8 lg:p-12 space-y-12 flex flex-col h-full animate-in fade-in duration-700 overflow-y-auto no-scrollbar pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 shrink-0">
        <div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">ZENtry Ops</h1>
          <p className="text-slate-500 font-medium text-lg mt-4">Currently steering <span className="text-emerald-600 font-black">{projects.length} major initiatives</span>.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex p-2 bg-slate-200/50 rounded-[28px] border border-slate-300/30 shadow-inner">
            <button onClick={() => setActiveTab('board')} className={`px-10 py-3.5 rounded-[22px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'board' ? 'bg-white text-emerald-600 shadow-2xl scale-105' : 'text-slate-500'}`}>Sprints</button>
            <button onClick={() => setActiveTab('projects')} className={`px-10 py-3.5 rounded-[22px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'projects' ? 'bg-white text-emerald-600 shadow-2xl scale-105' : 'text-slate-500'}`}>Portfolio</button>
          </div>
          <button onClick={() => setIsTaskModalOpen(true)} className="flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-95">
            <Plus size={24} /> Deploy Task
          </button>
        </div>
      </div>

      {activeTab === 'board' ? (
        <>
          <div className="flex flex-wrap items-center gap-6 bg-white p-6 rounded-[40px] border border-slate-200/60 shadow-xl shadow-slate-200/30 shrink-0">
            <div className="flex-1 min-w-[300px] relative">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
              <input type="text" placeholder="Trace task identifiers..." className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-[24px] text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all" value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} />
            </div>
            <select className="bg-slate-50 border-none rounded-[20px] px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-600 focus:ring-4 focus:ring-emerald-500/10 outline-none" value={filters.assignee} onChange={e => setFilters({...filters, assignee: e.target.value})}>
              <option value="all">Assignee: All</option>
              {team.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
            <select className="bg-slate-50 border-none rounded-[20px] px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-600 focus:ring-4 focus:ring-emerald-500/10 outline-none" value={filters.dateRange} onChange={e => setFilters({...filters, dateRange: e.target.value})}>
              <option value="all">Timeframe: All</option>
              <option value="overdue">Overdue</option>
              <option value="today">Today</option>
            </select>
            <button onClick={() => setFilters({assignee: 'all', priority: 'all', search: '', dateRange: 'all'})} className="p-4 text-slate-300 hover:text-rose-500 transition-all hover:bg-rose-50 rounded-2xl"><RotateCcw size={22} /></button>
          </div>

          <div className="flex gap-10 overflow-x-auto pb-12 no-scrollbar flex-1">
            {['todo', 'in-progress', 'review', 'done'].map((status) => {
              const colTasks = filteredTasks.filter(t => t.status === status);
              return (
                <div key={status} className="min-w-[400px] flex flex-col gap-8">
                  <div className="flex items-center justify-between px-4">
                    <h3 className="font-black text-slate-900 uppercase tracking-[0.3em] text-xs">{status.replace('-', ' ')}</h3>
                    <span className="text-white font-black text-[10px] bg-slate-900 px-3 py-1.5 rounded-full shadow-lg">{colTasks.length}</span>
                  </div>
                  <div className="flex-1 bg-slate-100/40 rounded-[56px] p-6 space-y-6 border-4 border-dashed border-slate-200 min-h-[500px] transition-colors hover:bg-slate-100/60">
                    {colTasks.map(task => (
                      <div 
                        key={task.id} 
                        onClick={() => setSelectedTaskId(task.id)}
                        className={`bg-white p-8 rounded-[40px] border-l-[8px] shadow-2xl shadow-slate-200/20 hover:shadow-emerald-500/10 transition-all group relative overflow-hidden active:scale-[0.98] cursor-pointer ${
                          task.priority === 'high' ? 'border-rose-500' : 
                          task.priority === 'medium' ? 'border-amber-500' : 'border-emerald-500'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-6 relative z-10">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            task.priority === 'high' ? 'bg-rose-500/10 text-rose-600' : 
                            task.priority === 'medium' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'
                          }`}>
                            {task.priority} Priority
                          </span>
                          <span className={`text-[10px] font-black tabular-nums bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 ${
                            new Date(task.dueDate) < new Date() && task.status !== 'done' ? 'text-rose-500 animate-pulse' : 'text-slate-400'
                          }`}>
                            {task.dueDate}
                          </span>
                        </div>

                        <h4 className="font-black text-slate-900 text-xl tracking-tight leading-tight mb-4 relative z-10">{task.title}</h4>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-slate-50 relative z-10">
                          <div className="flex items-center gap-2 text-slate-400">
                             <Clock size={16} />
                             <span className="text-xs font-black tabular-nums">{formatDuration(task.timeLogs.reduce((s, l) => s + l.duration, 0))}</span>
                          </div>
                          <div className="w-10 h-10 rounded-[14px] bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs shadow-inner border border-indigo-100" title={task.assignee}>{task.assignee[0]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="space-y-12 pb-32">
           <div className="flex justify-between items-center">
             <h2 className="text-3xl font-black tracking-tight flex items-center gap-4 text-slate-900"><Layers className="text-indigo-600" /> Strategic Portfolio</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map(proj => (
                <div key={proj.id} className="bg-white p-10 rounded-[56px] border border-slate-200 shadow-2xl shadow-slate-200/40 group relative overflow-hidden flex flex-col h-auto">
                   <div className="flex justify-between items-start mb-10 relative z-10">
                      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[24px] flex items-center justify-center shadow-inner border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6"><Briefcase size={32} /></div>
                      <button onClick={() => deleteProject(proj.id)} className="p-4 text-slate-300 hover:text-rose-500 rounded-2xl transition-all"><Trash2 size={20} /></button>
                   </div>
                   <h3 className="text-3xl font-black text-slate-900 mb-3 relative z-10 tracking-tight leading-none">{proj.name}</h3>
                   <p className="text-sm text-slate-400 font-medium mb-8 line-clamp-2 relative z-10 leading-relaxed">{proj.description}</p>
                   
                   <div className="mb-8 p-6 bg-slate-50 rounded-[32px] border border-slate-100 relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-rose-500">
                            <ShieldAlert size={14} />
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Sponsor</span>
                         </div>
                         <span className="text-[10px] font-black text-slate-900">{proj.stakeholders?.sponsor || 'Exec Board'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-indigo-500">
                            <UserCheck size={14} />
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Lead</span>
                         </div>
                         <span className="text-[10px] font-black text-slate-900">{proj.stakeholders?.lead || 'Staff'}</span>
                      </div>
                   </div>
                   
                   <div className="mt-auto space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>Initiative Growth</span>
                        <span className="text-indigo-600">{proj.growth}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                         <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 h-full transition-all duration-[1500ms]" style={{ width: `${proj.growth}%` }} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {selectedTask && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-2xl z-[150] flex items-center justify-center p-8 animate-in fade-in" onClick={() => setSelectedTaskId(null)}>
           <div className="bg-white rounded-[64px] w-full max-w-2xl max-h-[90vh] p-16 shadow-2xl relative overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-500 via-emerald-500 to-rose-500" />
              <div className="flex justify-between items-start mb-8 shrink-0">
                 <div>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900">{selectedTask.title}</h2>
                    <div className="flex items-center gap-2 mt-2">
                       <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          selectedTask.priority === 'high' ? 'bg-rose-500 text-white' : 
                          selectedTask.priority === 'medium' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
                       }`}>{selectedTask.priority} Priority</span>
                    </div>
                 </div>
                 <button onClick={() => setSelectedTaskId(null)} className="p-4 hover:bg-slate-100 rounded-3xl transition-all"><X size={28} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-10 pr-2 pb-10">
                <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 space-y-6">
                   <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Briefcase size={12} className="text-indigo-600" /> Initiative Origin
                      </h3>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-100">
                        {taskProject?.client}
                      </span>
                   </div>
                   <div className="flex items-center justify-between">
                      <p className="text-xl font-black text-slate-900">{taskProject?.name}</p>
                      <ChevronRight size={20} className="text-slate-300" />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-5 group hover:shadow-lg transition-all">
                      <div className="relative">
                         <img src={taskAssignee?.avatar} className="w-16 h-16 rounded-[24px] object-cover border-4 border-slate-50 group-hover:rotate-6 transition-transform" />
                         <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                      </div>
                      <div>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Assigned Vector</p>
                         <p className="font-black text-slate-900 leading-none">{taskAssignee?.name}</p>
                         <p className="text-[10px] font-bold text-indigo-600 uppercase mt-1">{taskAssignee?.role}</p>
                      </div>
                   </div>

                   <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-2">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Timeline Threshold</p>
                      <div className="flex items-center gap-3 text-slate-900">
                         <Calendar className="text-rose-500" size={20} />
                         <span className="font-black text-lg tracking-tight">{selectedTask.dueDate}</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Objective Manifest</h3>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">{selectedTask.description}</p>
                </div>
                
                <div className="space-y-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                      <History className="text-emerald-500" /> Time Pulse
                    </h3>
                    <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full">
                      Total: {formatDuration(selectedTask.timeLogs.reduce((s, l) => s + l.duration, 0))}
                    </span>
                  </div>

                  <form onSubmit={handleAddTimeLog} className="flex gap-4">
                    <div className="relative flex-1">
                      <Timer className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      <input 
                        type="number" 
                        placeholder="Minutes spent..." 
                        className="w-full pl-16 pr-8 py-5 bg-slate-50 border-none rounded-[28px] font-bold text-lg outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner"
                        value={logMinutes}
                        onChange={(e) => setLogMinutes(e.target.value)}
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={!logMinutes}
                      className="px-10 bg-[#0f172a] text-white rounded-[28px] font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-600 active:scale-95 transition-all disabled:opacity-30"
                    >
                      Sync Log
                    </button>
                  </form>

                  <div className="space-y-4">
                    {selectedTask.timeLogs.length > 0 ? (
                      selectedTask.timeLogs.slice().reverse().map(log => (
                        <div key={log.id} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                           <div className="flex items-center gap-5">
                              <div className="p-3 bg-white rounded-2xl text-emerald-500 shadow-sm"><Play size={16} /></div>
                              <div>
                                 <p className="font-black text-slate-900 text-lg">{formatDuration(log.duration)}</p>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{log.timestamp}</p>
                              </div>
                           </div>
                           <ShieldAlert size={18} className="text-slate-200 group-hover:text-emerald-500 transition-colors" />
                        </div>
                      ))
                    ) : (
                      <div className="py-12 text-center text-slate-300 border-2 border-dashed border-slate-100 rounded-[48px]">
                        <p className="font-black text-sm uppercase tracking-widest">No activity recorded for this vector</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-8 shrink-0 flex gap-4">
                <button 
                  onClick={() => { updateTask(selectedTask.id, { status: 'done' }); setSelectedTaskId(null); }}
                  className="flex-1 py-6 bg-indigo-600 text-white font-black rounded-[32px] text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <Target size={20} /> Finalize Mission Objectives
                </button>
                <button onClick={() => setSelectedTaskId(null)} className="px-10 py-6 bg-slate-100 text-slate-900 font-black rounded-[32px] text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Dismiss</button>
              </div>
           </div>
        </div>
      )}

      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[100] flex items-center justify-center p-8">
          <div className="bg-white rounded-[64px] w-full max-w-xl p-16 shadow-2xl relative animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-black flex items-center gap-4 tracking-tighter text-slate-900"><Target className="text-emerald-600" size={40} /> Mission Blueprint</h2>
              <button onClick={() => setIsTaskModalOpen(false)} className="p-4 hover:bg-slate-100 rounded-3xl transition-all"><X size={28} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); addTask({ ...newTask, id: Date.now().toString(), timeLogs: [] } as Task); setIsTaskModalOpen(false); }} className="space-y-8">
              <div className="relative">
                <input type="text" placeholder="Mission Identifier..." className="w-full px-10 py-6 bg-slate-50 border-none rounded-[32px] font-black text-xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} required />
                <button type="button" onClick={handleAiGenerate} disabled={!newTask.title || isAiGenerating} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                  {isAiGenerating ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
                </button>
              </div>
              <textarea placeholder="Objectives..." className="w-full px-10 py-6 bg-slate-50 border-none rounded-[32px] h-32 resize-none outline-none font-medium" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                 <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-[28px] font-black text-[10px] uppercase tracking-widest outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all" value={newTask.projectId} onChange={e => setNewTask({...newTask, projectId: e.target.value})}>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                 </select>
                 <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-[28px] font-black text-[10px] uppercase tracking-widest outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all" value={newTask.assignee} onChange={e => setNewTask({...newTask, assignee: e.target.value})}>
                    {team.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                 </select>
              </div>
              <button type="submit" className="w-full py-8 bg-indigo-600 text-white font-black rounded-[40px] text-xl uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">Deploy Vector</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
