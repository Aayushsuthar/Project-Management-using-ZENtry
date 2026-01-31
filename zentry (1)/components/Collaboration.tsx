
import React, { useState, useRef } from 'react';
import { FeedPost, TeamMember, Comment, FileEntry } from '../types';
import { 
  Heart, MessageCircle, Share2, Video, Mic, MicOff, VideoOff, PhoneOff, 
  Image as ImageIcon, Send, X, User, Paperclip, Download, Smile, 
  Plus, Monitor, Loader2, Trash2, Repeat, PlayCircle, FileText, 
  ExternalLink, HardDrive, ShieldCheck, RefreshCw, Cloud, Activity, 
  CheckCircle2, AlertCircle
} from 'lucide-react';

interface CollaborationProps {
  user: TeamMember;
  feedPosts: FeedPost[];
  files: FileEntry[];
  addFile: (file: FileEntry) => void;
  updatePost: (id: string, updates: Partial<FeedPost>) => void;
  addFeedPost: (post: FeedPost) => void;
  deletePost: (id: string) => void;
  searchQuery?: string;
}

const EMOJIS = ['🚀', '💯', '👏', '🔥', '💡', '🙌', '✨', '🎯'];

const Collaboration: React.FC<CollaborationProps> = ({ user, feedPosts, files, addFile, updatePost, addFeedPost, deletePost, searchQuery = '' }) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'video' | 'files'>('feed');
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState<string | null>(null);
  const [postVideo, setPostVideo] = useState<string | null>(null);
  const [activeComments, setActiveComments] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cloudProviders, setCloudProviders] = useState([
    { id: '1', name: 'Google Drive', status: 'connected', latency: '12ms', lastSync: '2m ago' },
    { id: '2', name: 'Azure Blob', status: 'connected', latency: '45ms', lastSync: '10m ago' },
    { id: '3', name: 'AWS S3', status: 'disconnected', latency: '—', lastSync: 'Never' },
  ]);

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handlePost = () => {
    if (!postContent.trim() && !postImage && !postVideo) return;
    addFeedPost({
      id: Date.now().toString(),
      author: user.name,
      avatar: user.avatar,
      content: postContent,
      image: postImage || undefined,
      video: postVideo || undefined,
      timestamp: 'Just now',
      likes: 0,
      likedBy: [],
      comments: []
    });
    setPostContent('');
    setPostImage(null);
    setPostVideo(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      let category: FileEntry['category'] = 'other';
      if (file.type.startsWith('image/')) category = 'image';
      else if (file.type.startsWith('video/')) category = 'video';
      else if (file.type === 'application/pdf') category = 'document';

      addFile({
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.type,
        uploadedBy: user.name,
        timestamp: 'Just now',
        url: url,
        category: category
      });
      setIsUploading(false);
    }, 1500);
  };

  const toggleCloud = (id: string) => {
    setCloudProviders(prev => prev.map(p => {
      if (p.id === id) {
        return { 
          ...p, 
          status: p.status === 'connected' ? 'disconnected' : 'connected',
          lastSync: p.status === 'connected' ? p.lastSync : 'Just now',
          latency: p.status === 'connected' ? '—' : `${Math.floor(Math.random() * 50) + 5}ms`
        };
      }
      return p;
    }));
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12 animate-in fade-in h-full overflow-y-auto no-scrollbar pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Global Pulse</h1>
          <p className="text-slate-500 font-medium text-lg mt-2">Distributed communication & storage node.</p>
        </div>
        <div className="flex p-2 bg-slate-200/50 rounded-[32px] border border-slate-300/30">
          {['feed', 'video', 'files'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-10 py-3.5 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-2xl scale-105' : 'text-slate-500'}`}>{tab}</button>
          ))}
        </div>
      </div>

      {activeTab === 'feed' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[48px] shadow-2xl border border-slate-100">
              <div className="flex gap-6">
                <img src={user.avatar} className="w-16 h-16 rounded-[24px] object-cover border-4 border-white shadow-xl" />
                <div className="flex-1 space-y-6">
                  <textarea placeholder="Broadcast a strategic update..." className="w-full bg-slate-50 border-none rounded-[32px] p-6 text-lg font-medium outline-none resize-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner" rows={3} value={postContent} onChange={(e) => setPostContent(e.target.value)} />
                  {(postImage || postVideo) && (
                    <div className="relative w-full aspect-video rounded-[32px] overflow-hidden border-4 border-slate-100 shadow-lg">
                      {postImage ? <img src={postImage} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white font-black"><PlayCircle size={64} className="text-indigo-400" /></div>}
                      <button onClick={() => { setPostImage(null); setPostVideo(null); }} className="absolute top-6 right-6 p-3 bg-black/60 text-white rounded-full"><X size={20} /></button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-50 relative">
                <div className="flex gap-3">
                  <button onClick={() => setPostImage('https://picsum.photos/1200/800')} className="p-3 text-slate-500 hover:bg-indigo-50 rounded-2xl transition-all"><ImageIcon size={20} /></button>
                  <button onClick={() => setPostVideo('simulated-video')} className="p-3 text-slate-500 hover:bg-rose-50 rounded-2xl transition-all"><Video size={20} /></button>
                  <div className="relative">
                    <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-3 text-slate-500 hover:bg-amber-50 rounded-2xl transition-all"><Smile size={20} /></button>
                    {showEmojiPicker && (
                      <div className="absolute left-0 bottom-14 bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 flex gap-2 z-50 animate-in slide-in-from-bottom-2">
                        {EMOJIS.map(e => <button key={e} onClick={() => { setPostContent(prev => prev + e); setShowEmojiPicker(false); }} className="text-2xl hover:scale-125 transition-transform">{e}</button>)}
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={handlePost} disabled={!postContent.trim() && !postImage && !postVideo} className="px-12 py-4 bg-indigo-600 text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Broadcast</button>
              </div>
            </div>

            {feedPosts.map((post) => (
              <div key={post.id} className="bg-white p-8 rounded-[48px] shadow-xl border border-slate-100 group animate-in fade-in">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <img src={post.avatar} className="w-14 h-14 rounded-[20px] object-cover shadow-lg border-2 border-white" />
                    <div><h4 className="font-black text-slate-900 text-lg">{post.author}</h4><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{post.timestamp}</p></div>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed mb-8 text-lg font-medium">{post.content}</p>
                {post.image && <div className="rounded-[40px] overflow-hidden mb-8 shadow-2xl border border-slate-100"><img src={post.image} className="w-full object-cover max-h-[500px]" /></div>}
                <div className="flex items-center gap-8 py-6 border-y border-slate-50">
                  <button onClick={() => {}} className={`flex items-center gap-3 font-black text-sm text-slate-400`}><Heart size={24} /> {post.likes}</button>
                  <button onClick={() => setActiveComments(activeComments === post.id ? null : post.id)} className="flex items-center gap-3 text-slate-400 font-black text-sm"><MessageCircle size={24} /> {post.comments.length}</button>
                  <button onClick={() => {}} className="flex items-center gap-3 text-slate-400 hover:text-emerald-500"><Repeat size={24} /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-10">
            <div className="bg-[#0f172a] p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden flex flex-col h-fit">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
               <div className="flex items-center justify-between mb-10 relative z-10">
                  <div>
                    <h3 className="font-black text-xl">Cloud Hub</h3>
                    <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mt-1">Multi-Cloud Nexus</p>
                  </div>
                  <Cloud className="text-indigo-400" size={28} />
               </div>
               <div className="space-y-4 relative z-10">
                  {cloudProviders.map(provider => (
                    <div key={provider.id} className="p-6 bg-white/5 rounded-[32px] border border-white/5 hover:bg-white/10 transition-all group">
                       <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                             {provider.status === 'connected' ? <CheckCircle2 className="text-emerald-400" size={16} /> : <AlertCircle className="text-slate-500" size={16} />}
                             <span className="text-sm font-black tracking-tight">{provider.name}</span>
                          </div>
                          <button onClick={() => toggleCloud(provider.id)} className={`p-2 rounded-xl transition-all ${provider.status === 'connected' ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white'}`}>
                             <RefreshCw size={14} className={provider.status === 'connected' ? '' : 'animate-pulse'} />
                          </button>
                       </div>
                       <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
                          <div className="flex items-center gap-2"><Activity size={10} /> {provider.latency}</div>
                          <div className="flex items-center gap-2"><RefreshCw size={10} /> {provider.lastSync}</div>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-8 py-5 bg-indigo-600 text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 relative z-10">
                  <Plus size={16} /> Mount New Provider
               </button>
            </div>

            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="font-black text-lg text-slate-900">Security Audit</h3>
                  <ShieldCheck className="text-emerald-500" />
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                     <p className="text-xs font-bold text-slate-600">Encrypted Nodes Active: 14/14</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-indigo-500" />
                     <p className="text-xs font-bold text-slate-600">E2EE Tunnel Integrity: 99.9%</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'video' ? (
        <div className="bg-[#0f172a] rounded-[64px] overflow-hidden aspect-video relative shadow-2xl border-[16px] border-white/5 flex flex-col">
           <div className="flex-1 flex items-center justify-center"><img src={user.avatar} className="w-full h-full object-cover opacity-50 grayscale" /></div>
           <div className="absolute inset-0 flex items-center justify-center flex-col gap-6 text-white">
              <div className="w-24 h-24 bg-rose-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl shadow-rose-600/50"><Video size={48} /></div>
              <h2 className="text-3xl font-black tracking-tighter">Enter Video Channel</h2>
              <button onClick={() => alert('Broadcasting global signal...')} className="px-12 py-4 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Join Sync Session</button>
           </div>
        </div>
      ) : (
        <div className="space-y-10 pb-20">
          <div className="flex items-center justify-between">
            <div><h2 className="text-3xl font-black text-slate-900 tracking-tight">Vault Repository</h2><p className="text-slate-400 font-medium text-sm mt-1">Enterprise-grade local and cloud storage.</p></div>
            <button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-[28px] font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">
              {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
              {isUploading ? 'Ingesting...' : 'Ingest Asset'}
            </button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
          </div>

          <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Asset</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Originator</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Magnitude</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Execution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredFiles.map(file => (
                  <tr key={file.id} className="hover:bg-slate-50 transition-all group">
                    <td className="px-10 py-8 flex items-center gap-5">
                      <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl shadow-inner border border-indigo-100">
                        {file.category === 'image' ? <ImageIcon size={24} /> : 
                         file.category === 'video' ? <Video size={24} /> : 
                         file.category === 'document' ? <FileText size={24} /> : <Paperclip size={24} />}
                      </div>
                      <div>
                        <span className="font-black text-slate-800 text-lg tracking-tight block group-hover:translate-x-1 transition-transform">{file.name}</span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{file.type}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 font-bold text-slate-700">{file.uploadedBy}</td>
                    <td className="px-10 py-8 text-sm font-medium text-slate-400">{file.size}</td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <a href={file.url} download={file.name} className="p-4 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all shadow-sm"><Download size={22} /></a>
                        <button onClick={() => window.open(file.url, '_blank')} className="p-4 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all shadow-sm"><ExternalLink size={22} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredFiles.length === 0 && (
                   <tr><td colSpan={4} className="py-20 text-center text-slate-300 font-black uppercase tracking-widest">Repository Ledger Clear</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaboration;
