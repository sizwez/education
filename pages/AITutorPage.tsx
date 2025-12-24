
import React, { useState, useRef, useEffect } from 'react';
import { getAITutorResponse } from '../services/gemini';
import { Message } from '../types';

const SUGGESTIONS = [
  "Explain the water cycle",
  "Solve x² + 5x + 6 = 0",
  "Summary of Hamlet",
  "How does inflation work in SA?",
  "Physics: Newton's 2nd Law"
];

const AITutorPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm your EduPulse AI Tutor. I specialize in the South African R-12 curriculum. What are we studying today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    const messageToSend = text.trim();
    if (!messageToSend || isLoading) return;

    const userMsg: Message = { role: 'user', text: messageToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const response = await getAITutorResponse(messageToSend);
    const aiMsg: Message = { role: 'model', text: response || "I'm having a bit of a moment. Could you repeat that?", timestamp: new Date() };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col max-w-5xl mx-auto animate-fadeIn bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl shadow-lg transform rotate-3">
            <i className="fa-solid fa-robot"></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">EduPulse AI <span className="text-indigo-600">SmartTutor</span></h2>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CAPS/IEB Certified Assistant</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 w-10 h-10 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
            <i className="fa-solid fa-microphone"></i>
          </button>
          <button 
            onClick={() => setMessages([messages[0]])}
            className="p-2 w-10 h-10 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-red-500 transition-all border border-transparent hover:border-slate-100"
          >
            <i className="fa-solid fa-rotate-left"></i>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#FDFEFF]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold shadow-sm ${
                msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 border border-slate-200'
              }`}>
                {msg.role === 'user' ? 'TZ' : <i className="fa-solid fa-robot"></i>}
              </div>
              <div className={`p-5 rounded-2xl shadow-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                <p className="text-[14px] whitespace-pre-wrap">{msg.text}</p>
                <div className={`flex items-center gap-2 mt-3 ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-300'}`}>
                  <p className="text-[9px] font-bold uppercase tracking-widest">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {msg.role === 'model' && <i className="fa-solid fa-copy cursor-pointer hover:text-indigo-400 transition-colors"></i>}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
             <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0"></div>
                <div className="bg-slate-50 p-5 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
             </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-6 bg-white border-t border-slate-100">
        {messages.length < 3 && !isLoading && (
          <div className="mb-4 flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="whitespace-nowrap px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-500 hover:border-indigo-500 hover:text-indigo-600 transition-all bg-white shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        
        <div className="relative flex items-center gap-3">
          <div className="flex-1 relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question here..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-sm pr-12 font-medium"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors">
              <i className="fa-solid fa-paperclip"></i>
            </button>
          </div>
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 transition-all transform active:scale-95 shrink-0"
          >
            <i className="fa-solid fa-paper-plane text-lg"></i>
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
           <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
             <i className="fa-solid fa-bolt text-amber-500"></i>
             AI responds in seconds
           </p>
           <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">Powered by Gemini 3 Flash</p>
        </div>
      </div>
    </div>
  );
};

export default AITutorPage;
