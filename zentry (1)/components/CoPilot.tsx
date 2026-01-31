
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, BrainCircuit, Loader2, RefreshCw } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';
import { Message, Task, Deal, Project } from '../types';

interface CoPilotProps {
  isOpen: boolean;
  onClose: () => void;
  context: {
    tasks: Task[];
    deals: Deal[];
    projects: Project[];
  };
}

const CoPilot: React.FC<CoPilotProps> = ({ isOpen, onClose, context }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'CoPilot', content: "Hi! I'm ZENtry CoPilot. I have a full overview of your active projects, deals, and upcoming tasks. How can I help you optimize your business today?", timestamp: new Date().toLocaleTimeString(), isAi: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'Me',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
      isAi: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.isAi ? 'model' : 'user',
      text: m.content
    }));

    // Inject context into the user message for better AI understanding
    const contextPrompt = `
      User Query: "${input}"
      
      Current App State:
      - Active Projects: ${context.projects.map(p => `${p.name} (${p.growth}% complete)`).join(', ')}
      - Pending Tasks: ${context.tasks.filter(t => t.status !== 'done').map(t => t.title).join(', ')}
      - Pipeline Value: $${context.deals.reduce((s, d) => s + d.amount, 0).toLocaleString()} across ${context.deals.length} deals.
      
      Please answer based on this context.
    `;

    const responseText = await chatWithAssistant(history, contextPrompt);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'CoPilot',
      content: responseText,
      timestamp: new Date().toLocaleTimeString(),
      isAi: true
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-2xl z-[100] border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 bg-[#0f172a] text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg tracking-tight">ZENtry CoPilot</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Contextual AI Active</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] flex gap-3 ${msg.isAi ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${msg.isAi ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-600 text-white'}`}>
                {msg.isAi ? <BrainCircuit size={18} /> : <User size={18} />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm border ${msg.isAi ? 'bg-slate-50 border-slate-100 text-slate-800' : 'bg-blue-600 border-blue-500 text-white'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <p className={`text-[10px] mt-2 font-medium ${msg.isAi ? 'text-slate-400' : 'text-blue-200'}`}>{msg.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <BrainCircuit size={18} />
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
                <Loader2 size={16} className="animate-spin text-indigo-600" />
                <span className="text-sm text-slate-500 font-medium italic">CoPilot is analyzing business context...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {['Summarize my deals', 'What is next on my task list?', 'Project growth report'].map((prompt) => (
            <button 
              key={prompt}
              onClick={() => { setInput(prompt); }}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="relative">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Ask anything about your business..."
            className="w-full pl-4 pr-12 py-3 bg-white border border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all shadow-sm"
            rows={2}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 bottom-3 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-md"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoPilot;
