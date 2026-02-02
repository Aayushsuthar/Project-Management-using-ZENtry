
import React, { useState } from 'react';
import { Mail, Send, Star, Inbox, Archive, Trash2, Search, Plus, X, ShieldCheck, MoreVertical, Paperclip, MailOpen, CheckCircle } from 'lucide-react';
import { Email } from '../types';

interface EmailTerminalProps {
  emails: Email[];
  addEmail: (e: Email) => void;
  updateEmail: (id: string, updates: Partial<Email>) => void;
  searchQuery?: string;
}

const EmailTerminal: React.FC<EmailTerminalProps> = ({ emails, addEmail, updateEmail, searchQuery = '' }) => {
  const [activeTab, setActiveTab] = useState<'incoming' | 'starred' | 'outgoing' | 'archived'>('incoming');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const filteredEmails = emails.filter(e => {
    const matchesSearch = e.sender.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'starred') return matchesSearch && e.starred;
    return matchesSearch && e.type === activeTab;
  });

  const handleSelect = (email: Email) => {
    setSelectedEmail(email);
    if (!email.read) {
      updateEmail(email.id, { read: true });
    }
  };

  const handleArchive = (e: React.MouseEvent, email: Email) => {
    e.stopPropagation();
    updateEmail(email.id, { type: 'archived' });
    if (selectedEmail?.id === email.id) setSelectedEmail(null);
  };

  const toggleStar = (e: React.MouseEvent, email: Email) => {
    e.stopPropagation();
    updateEmail(email.id, { starred: !email.starred });
  };

  const toggleRead = (e: React.MouseEvent, email: Email) => {
    e.stopPropagation();
    updateEmail(email.id, { read: !email.read });
  };

  return (
    <div className="flex h-full animate-in fade-in font-inter overflow-hidden">
      <aside className="w-80 bg-white border-r border-slate-200 p-8 space-y-10 shrink-0">
        <button onClick={() => setIsComposeOpen(true)} className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
          <Plus size={20} /> New Comms Vector
        </button>
        
        <nav className="space-y-2">
          {[
            { id: 'incoming', icon: Inbox, name: 'Incoming' },
            { id: 'starred', icon: Star, name: 'Starred' },
            { id: 'outgoing', icon: Send, name: 'Outgoing' },
            { id: 'archived', icon: Archive, name: 'Archived' },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={18} />
                <span className="font-black text-[10px] uppercase tracking-widest">{item.name}</span>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col bg-slate-50">
        <div className="flex-1 overflow-y-auto no-scrollbar p-8">
          <div className="space-y-4">
            {filteredEmails.length > 0 ? filteredEmails.map(email => (
              <div 
                key={email.id} 
                onClick={() => handleSelect(email)}
                className={`p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex items-center justify-between group ${!email.read ? 'border-l-4 border-l-indigo-600 ring-2 ring-indigo-500/5' : ''}`}
              >
                <div className="flex items-center gap-6 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs ${!email.read ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}>
                    {email.sender[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className={`text-lg font-black tracking-tight truncate ${!email.read ? 'text-slate-900' : 'text-slate-500'}`}>{email.sender}</h4>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{email.timestamp}</span>
                    </div>
                    <p className={`text-sm truncate ${!email.read ? 'font-black text-slate-800' : 'font-medium text-slate-600'}`}>{email.subject}</p>
                    <p className="text-xs text-slate-400 truncate mt-1">{email.preview}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => toggleRead(e, email)} className="p-3 hover:bg-slate-100 rounded-xl text-slate-300 hover:text-indigo-600" title={email.read ? "Mark as unread" : "Mark as read"}>
                    {email.read ? <Mail size={18} /> : <MailOpen size={18} />}
                  </button>
                  <button onClick={(e) => toggleStar(e, email)} className={`p-3 hover:bg-slate-100 rounded-xl ${email.starred ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'}`} title="Toggle importance">
                    <Star size={18} fill={email.starred ? "currentColor" : "none"} />
                  </button>
                  {email.type !== 'archived' && (
                    <button onClick={(e) => handleArchive(e, email)} className="p-3 hover:bg-slate-100 rounded-xl text-slate-300 hover:text-emerald-500" title="Archive">
                      <Archive size={18} />
                    </button>
                  )}
                  <button className="p-3 hover:bg-slate-100 rounded-xl text-slate-300 hover:text-rose-500" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center py-32 text-slate-300">
                <div className="p-10 bg-white rounded-full shadow-inner mb-6"><Inbox size={64} /></div>
                <p className="text-xl font-black uppercase tracking-[0.2em]">Matrix Clear</p>
                <p className="text-sm font-medium mt-2">No comms vectors detected in this sector.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[200] flex items-center justify-end animate-in fade-in">
          <div className="w-full max-w-3xl h-full bg-white shadow-2xl p-16 animate-in slide-in-from-right duration-500 flex flex-col overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-12 shrink-0">
               <div className="flex items-center gap-4 text-emerald-600 bg-emerald-50 px-6 py-2 rounded-full border border-emerald-100">
                  <ShieldCheck size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">E2EE Encrypted Channel</span>
               </div>
               <div className="flex items-center gap-2">
                  <button onClick={(e) => handleArchive(e, selectedEmail)} className="p-4 hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-emerald-600" title="Archive"><Archive size={24} /></button>
                  <button onClick={() => setSelectedEmail(null)} className="p-4 hover:bg-slate-100 rounded-3xl transition-all"><X size={28} /></button>
               </div>
            </div>
            
            <div className="flex-1 space-y-12">
               <div>
                  <h2 className="text-5xl font-black tracking-tighter text-slate-900 mb-6">{selectedEmail.subject}</h2>
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-xl text-slate-500 shadow-inner">{selectedEmail.sender[0]}</div>
                     <div>
                        <p className="font-black text-slate-900 text-xl">{selectedEmail.sender}</p>
                        <p className="text-sm font-medium text-slate-400">To: internal-node@zentry.io • {selectedEmail.timestamp}</p>
                     </div>
                  </div>
               </div>
               
               <div className="text-lg text-slate-600 leading-relaxed font-medium bg-slate-50/50 p-10 rounded-[40px] border border-slate-100">
                  {selectedEmail.preview}
                  <br /><br />
                  This communication is part of the ZENtry global workspace protocol. All attachments and textual data are encrypted at rest using decentralized cryptographic nodes.
               </div>
            </div>

            <div className="pt-12 border-t border-slate-100 flex gap-4 shrink-0">
               <button className="flex-1 py-6 bg-slate-900 text-white font-black rounded-[32px] text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Reply Vector</button>
               <button onClick={(e) => toggleStar(e, selectedEmail)} className={`px-10 py-6 rounded-[32px] font-black text-xs uppercase tracking-widest transition-all ${selectedEmail.starred ? 'bg-amber-100 text-amber-600 border border-amber-200' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                 <Star size={20} fill={selectedEmail.starred ? "currentColor" : "none"} />
               </button>
            </div>
          </div>
        </div>
      )}

      {isComposeOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-2xl z-[300] flex items-center justify-center p-8 animate-in fade-in">
           <div className="bg-white rounded-[64px] w-full max-w-2xl p-16 shadow-2xl relative overflow-hidden animate-in zoom-in-95">
              <div className="absolute top-0 left-0 w-full h-3 bg-indigo-600" />
              <div className="flex justify-between items-center mb-12">
                 <h2 className="text-4xl font-black tracking-tighter text-slate-900">Global Broadcast</h2>
                 <button onClick={() => setIsComposeOpen(false)} className="p-4 hover:bg-slate-100 rounded-3xl transition-all"><X size={28} /></button>
              </div>
              <form className="space-y-8">
                 <input type="text" placeholder="Recipient Node..." className="w-full px-10 py-6 bg-slate-50 border-none rounded-[32px] font-black text-xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner" />
                 <input type="text" placeholder="Subject Manifesto..." className="w-full px-10 py-6 bg-slate-50 border-none rounded-[32px] font-bold text-lg outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner" />
                 <textarea placeholder="Operational message..." className="w-full px-10 py-6 bg-slate-50 border-none rounded-[32px] h-48 resize-none outline-none font-medium shadow-inner" />
                 
                 <div className="flex items-center justify-between pt-4">
                    <button type="button" className="p-5 bg-slate-100 text-slate-400 rounded-3xl hover:bg-indigo-50 hover:text-indigo-600 transition-all"><Paperclip size={24} /></button>
                    <button type="submit" onClick={(e) => { e.preventDefault(); setIsComposeOpen(false); }} className="px-16 py-7 bg-indigo-600 text-white font-black rounded-[40px] text-xl uppercase tracking-widest shadow-2xl shadow-indigo-600/30 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-4">Broadcast <Send size={24} /></button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default EmailTerminal;
