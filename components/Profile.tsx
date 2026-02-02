
import React, { useState, useRef } from 'react';
import { TeamMember } from '../types';
import { 
  Camera, Mail, Phone, MapPin, User, Save, CheckCircle, Linkedin, 
  Github, Instagram, Youtube, Globe, MessageCircle, Send, HardDrive, 
  CloudUpload, Loader2 
} from 'lucide-react';

interface ProfileProps {
  user: TeamMember;
  onUpdate: (updates: Partial<TeamMember>) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({ 
    ...user, 
    socialLinks: user.socialLinks || { linkedin: '', github: '', instagram: '', youtube: '', whatsapp: '', telegram: '' } 
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatar: url }));
      setIsUploading(false);
    }, 1200);
  };

  const handleSocialChange = (platform: keyof NonNullable<TeamMember['socialLinks']>, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto space-y-12 animate-in fade-in pb-32">
      <div className="flex flex-col md:flex-row items-center gap-12 bg-white p-12 rounded-[64px] shadow-2xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[80px] rounded-full" />
        <div className="relative group">
          <div className="w-56 h-56 rounded-[64px] overflow-hidden border-8 border-white shadow-2xl relative bg-slate-100">
            {isUploading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-20">
                <Loader2 className="animate-spin text-teal-600" size={48} />
              </div>
            ) : null}
            <img src={formData.avatar} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt="Avatar" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
              <Camera className="text-white" size={40} />
            </div>
          </div>
          <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
        </div>
        
        <div className="flex-1 text-center md:text-left relative z-10">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-2">{formData.name}</h1>
          <p className="text-2xl font-bold text-teal-600 mb-8 uppercase tracking-widest">{formData.role}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-sm font-black text-slate-500">
              <Mail size={18} className="text-teal-500" /> {formData.email}
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-sm font-black text-slate-500">
              <MapPin size={18} className="text-rose-500" /> {formData.location}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-[48px] p-12 border border-slate-200 shadow-xl space-y-10">
           <h2 className="text-3xl font-black flex items-center gap-4 tracking-tighter"><User className="text-teal-600" size={32} /> Core Profile</h2>
           <div className="space-y-6">
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity</label>
               <input type="text" className="w-full px-8 py-5 bg-slate-50 rounded-[28px] border-slate-200 outline-none focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-lg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Vector Email</label>
               <input type="email" className="w-full px-8 py-5 bg-slate-50 rounded-[28px] border-slate-200 outline-none focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-lg" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cloud Storage Binding</label>
               <div className="relative">
                  <HardDrive size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input type="text" placeholder="https://drive.google.com/..." className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-[28px] border-slate-200 outline-none focus:ring-4 focus:ring-teal-500/10 transition-all font-bold" value={formData.cloudStorage || ''} onChange={(e) => setFormData({...formData, cloudStorage: e.target.value})} />
               </div>
             </div>
           </div>
        </div>

        <div className="bg-[#0f172a] rounded-[48px] p-12 text-white shadow-xl space-y-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
           <h2 className="text-3xl font-black flex items-center gap-4 tracking-tighter relative z-10"><Globe className="text-indigo-400" size={32} /> Social Pulse</h2>
           <div className="grid grid-cols-1 gap-6 relative z-10">
              {[
                { id: 'linkedin', icon: Linkedin, color: 'text-blue-400', label: 'LinkedIn Vector' },
                { id: 'whatsapp', icon: MessageCircle, color: 'text-emerald-400', label: 'WhatsApp Secure' },
                { id: 'telegram', icon: Send, color: 'text-sky-400', label: 'Telegram Node' },
                { id: 'github', icon: Github, color: 'text-slate-400', label: 'GitHub Repository' },
              ].map(social => (
                <div key={social.id} className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <social.icon size={12} className={social.color} /> {social.label}
                   </label>
                   <input 
                    type="text" 
                    className="w-full px-8 py-5 bg-white/5 rounded-[28px] border border-white/10 outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all font-bold" 
                    value={(formData.socialLinks as any)[social.id]}
                    onChange={(e) => handleSocialChange(social.id as any, e.target.value)}
                   />
                </div>
              ))}
           </div>
           <button type="submit" onClick={handleSubmit} className={`w-full py-7 rounded-[32px] font-black text-xl uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-4 relative z-10 ${isSaved ? 'bg-emerald-500' : 'bg-indigo-600 hover:scale-[1.02] active:scale-95'}`}>
              {isSaved ? <><CheckCircle size={28} /> Matrix Synchronized</> : <><Save size={28} /> Commit Changes</>}
           </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
