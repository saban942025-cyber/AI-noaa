import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, Calendar, ClipboardCheck, PhoneCall } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatHub = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'שלום! אני נועה, העוזרת הדיגיטלית של ח.סבן חומרי בניין. איך אוכל לעזור לך היום? אני יכולה לסייע בבחירת חומרים, פתיחת קריאת שירות או תיאום איסוף.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `את נועה, עוזרת אינטליגנטית ומקצועית של חברת "ח.סבן חומרי בניין". 
          הסגנון שלך: מקצועי, אדיב, ענייני, וטכני כשצריך.
          תפקידך לסייע לקבלנים וללקוחות פרטיים במידע על חומרי בניין (בטון, טיח, איטום, צבע וכו').
          אם לקוח שאל על מוצר, נסי להמליץ על סרטון רלוונטי מהיוטיוב שלנו או להציע לו לבדוק באקדמיה הטכנית.
          אם הלקוח רוצה שירות או הזמנה, הציעי לו להשתמש בכפתורים המהירים להזמנה או פתיחת פנייה.
          חשוב: דברי רק עברית. תהיי תמציתית.`,
        },
        contents: [
          ...messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: input }] }
        ],
      });

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response.text || 'מצטערת, חלה שגיאה בעיבוד הבקשה. אנא נסי שוב.' 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'מצטערת, יש לי תקלה זמנית. ניתן ליצור קשר טלפוני עם הסניף.' }]);
    } finally {
      setLoading(false);
    }
  };

  const QuickActions = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <button 
        onClick={() => setInput('אני רוצה לפתוח פניית שירות')}
        className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-saban-blue hover:text-saban-blue transition text-right text-sm font-bold"
      >
        <PhoneCall className="w-4 h-4" />
        פתיחת קריאת שירות
      </button>
      <button 
        onClick={() => setInput('אני רוצה לתאם איסוף מהסניף')}
        className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-saban-blue hover:text-saban-blue transition text-right text-sm font-bold"
      >
        <Calendar className="w-4 h-4" />
        איסוף עצמי (Pickup)
      </button>
      <button 
        onClick={() => setInput('אני צריך ייעוץ טכני על איטום')}
        className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-saban-blue hover:text-saban-blue transition text-right text-sm font-bold"
      >
        <ClipboardCheck className="w-4 h-4" />
        ייעוץ טכני מקצועי
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl mt-40">
      {/* Header */}
      <div className="bg-saban-blue p-8 text-white flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border-2 border-saban-gold shadow-xl overflow-hidden p-2">
             <img src="https://i.postimg.cc/qqLm9M5t/Gemini-Generated-Image-gmd5k7gmd5k7gmd5.png" alt="Noa" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-2xl font-black font-heebo leading-none tracking-tight">נועה - עוזרת AI</h2>
            <div className="flex items-center gap-2 mt-2">
               <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
               <span className="text-blue-200 text-xs font-bold uppercase tracking-[3px]">מומחית תוכן טכני</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/50"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-4 max-w-[85%]",
              msg.role === 'user' ? "mr-auto flex-row-reverse" : "ml-auto text-right"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md",
              msg.role === 'user' ? "bg-saban-blue text-white" : "bg-white text-saban-blue"
            )}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={cn(
              "p-4 rounded-[20px] text-sm leading-relaxed shadow-lg",
              msg.role === 'user' 
                ? "bg-saban-blue text-white rounded-tr-none" 
                : "bg-white/80 backdrop-blur-md text-slate-800 rounded-tl-none border border-white/50"
            )}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-4 ml-auto">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4 text-saban-blue" />
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl rounded-tl-none border border-white/30 shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-saban-blue" />
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">נועה מעבדת נתונים...</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-10 bg-white border-t border-slate-100 space-y-8 shadow-[0_-10px_50px_rgba(30,58,138,0.05)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'קריאת שירות', icon: PhoneCall, action: 'אני רוצה לפתוח פניית שירות' },
            { label: 'איסוף Pickup', icon: Calendar, action: 'אני רוצה לתאם איסוף מהסניף' },
            { label: 'ייעוץ טכני', icon: ClipboardCheck, action: 'אני צריך ייעוץ טכני' },
            { label: 'קטלוג מוצרים', icon: Send, action: 'אני רוצה לראות קטלוג' }
          ].map((act, i) => (
            <button 
              key={i}
              onClick={() => setInput(act.action)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 hover:bg-saban-blue hover:text-white border border-slate-100 rounded-2xl transition-all text-[10px] font-black uppercase tracking-[2px] text-slate-500 shadow-sm"
            >
              <act.icon className="w-3 h-3" />
              {act.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="איך אפשר לעזור לך היום?"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-saban-blue/10 transition shadow-inner pr-6"
          />
          <button 
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-saban-blue text-white rounded-2xl hover:bg-blue-900 hover:shadow-[0_10px_20px_rgba(30,58,138,0.3)] transition-all disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
