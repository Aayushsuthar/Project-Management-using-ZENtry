
import React, { useState } from 'react';
import { Contact } from '../types';
import { 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  X, 
  User, 
  CheckCircle, 
  AtSign, 
  Trash2, 
  Copy, 
  MoreVertical,
  ShieldCheck
} from 'lucide-react';

interface CRMProps {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  deleteContact?: (id: string) => void;
  // Added searchQuery to accept the prop from Layout/App search
  searchQuery?: string;
}

const CRM: React.FC<CRMProps> = ({ contacts, addContact, deleteContact, searchQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [newContact, setNewContact] = useState<Partial<Contact>>({ name: '', email: '', company: '', status: 'lead', value: 0 });

  // Use searchQuery from props if provided, otherwise fallback to local searchTerm state
  const effectiveSearch = searchQuery || searchTerm;

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
    c.company.toLowerCase().includes(effectiveSearch.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.email) return;
    addContact({
      id: Date.now().toString(),
      name: newContact.name!,
      email: newContact.email!,
      company: newContact.company || 'Private Entity',
      status: newContact.status as any || 'lead',
      value: Number(newContact.value) || 0
    });
    setIsAddModalOpen(false);
    setNewContact({ name: '', email: '', company: '', status: 'lead', value: 0 });
  };

  return (
    <div className="p-8 lg:p-12 space-y-12 animate-in fade-in duration-700 h-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Relations Core</h1>
          <p className="text-slate-500 font-medium text-lg mt-4">Managing <span className="text-indigo-600 font-bold">{contacts.length} high-value entities</span>.</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-indigo-600/30">
          <Plus size={24} /> New Entity
        </button>
      </div>

      <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden animate-in slide-in-from-bottom-8">
        <div className="p-8 bg-slate-50 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
            <input 
              type="text" 
              placeholder="Search entities, domains, or industries..." 
              value={effectiveSearch}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-white border-none rounded-[28px] text-lg font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
            />
          </div>
          <button className="p-5 bg-white border border-slate-200 rounded-[24px] text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all hover:rotate-12 active:scale-90 shadow-sm">
            <Filter size={24} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Identity</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Affiliation</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Phase</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Deal Magnitude</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Execution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-black text-white text-xl shadow-xl group-hover:rotate-6 transition-all">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-xl tracking-tight">{contact.name}</p>
                        <p className="text-sm text-slate-400 font-medium">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3 text-slate-600 bg-slate-100/50 px-5 py-3 rounded-2xl border border-slate-200/50 w-fit">
                      <Building2 size={20} className="text-slate-400" />
                      <span className="text-sm font-black uppercase tracking-widest">{contact.company}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${
                      contact.status === 'deal' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 
                      contact.status === 'lead' ? 'bg-indigo-500 text-white shadow-indigo-500/20' : 'bg-slate-500 text-white shadow-slate-500/20'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-xl font-black text-slate-900 tracking-tight">
                      {contact.value > 0 ? `₹${contact.value.toLocaleString()}` : '—'}
                    </p>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      <button className="p-4 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-2xl transition-all hover:rotate-12 active:scale-90 border border-transparent hover:border-emerald-100">
                        <Mail size={22} />
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setActiveMenuId(activeMenuId === contact.id ? null : contact.id)}
                          className="p-4 text-slate-300 hover:bg-slate-100 rounded-2xl transition-all"
                        >
                          <MoreVertical size={22} />
                        </button>
                        {activeMenuId === contact.id && (
                          <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-50 animate-in zoom-in-95">
                            <button onClick={() => setActiveMenuId(null)} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-600 hover:bg-indigo-50 transition-all">
                              <Copy size={16} /> Duplicate Identity
                            </button>
                            <button onClick={() => setActiveMenuId(null)} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-600 hover:bg-indigo-50 transition-all">
                              <ShieldCheck size={16} /> Verify Domain
                            </button>
                            <div className="my-2 border-t border-slate-50" />
                            <button 
                              onClick={() => { if(deleteContact) deleteContact(contact.id); setActiveMenuId(null); }}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-rose-500 hover:bg-rose-50 transition-all"
                            >
                              <Trash2 size={16} /> Purge Record
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredContacts.length === 0 && (
            <div className="p-32 text-center flex flex-col items-center gap-6 animate-in fade-in duration-500">
              <div className="p-10 bg-slate-50 rounded-full text-slate-200"><Search size={80} /></div>
              <div>
                <p className="text-2xl font-black text-slate-300 tracking-tight">No Entities Discovered</p>
                <p className="text-slate-400 font-medium">Refine your search parameters or add a new record.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[100] flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="bg-white rounded-[64px] w-full max-w-xl p-16 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-violet-600" />
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-black flex items-center gap-4 tracking-tighter text-slate-900"><User className="text-indigo-600" size={40} /> New Entity</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-4 hover:bg-slate-100 rounded-3xl transition-all"><X size={28} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Identity</label>
                <input type="text" placeholder="e.g. Satya Nadella" className="w-full px-10 py-6 bg-slate-50 border-none rounded-[32px] font-black text-xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-300" value={newContact.name} onChange={e => setNewContact({...newContact, name: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Communication Core</label>
                    <div className="relative">
                       <AtSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                       <input type="email" placeholder="email@domain.com" className="w-full pl-14 pr-8 py-6 bg-slate-50 border-none rounded-[28px] font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" value={newContact.email} onChange={e => setNewContact({...newContact, email: e.target.value})} required />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Corporate Entity</label>
                    <div className="relative">
                       <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                       <input type="text" placeholder="Company Name" className="w-full pl-14 pr-8 py-6 bg-slate-50 border-none rounded-[28px] font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" value={newContact.company} onChange={e => setNewContact({...newContact, company: e.target.value})} />
                    </div>
                 </div>
              </div>
              <button type="submit" className="w-full py-7 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black rounded-[36px] shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all text-xl uppercase tracking-[0.2em] mt-6 flex items-center justify-center gap-4">
                 Commit to Registry <CheckCircle size={24} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRM;
