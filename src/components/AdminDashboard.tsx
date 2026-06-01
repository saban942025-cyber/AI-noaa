import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Package, 
  Users, 
  Settings, 
  Search, 
  Plus, 
  Filter, 
  FileUp,
  BrainCircuit,
  MessageSquareCode,
  CheckCircle2,
  Loader2,
  Sparkles,
  Eye,
  Trash2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

const STOCK_TRENDS = [
  { day: '01/05', total: 752, average: 500, details: 'רמת פתיחה חודשית' },
  { day: '02/05', total: 738, average: 495, details: 'משיכת 14 שקי מלט' },
  { day: '03/05', total: 720, average: 490, details: 'רכש קבלנים - פרויקט מרכז' },
  { day: '04/05', total: 720, average: 485, details: 'שבת - אין פעילות' },
  { day: '05/05', total: 695, average: 480, details: 'משיכת ברזל בניין ודבקים' },
  { day: '06/05', total: 680, average: 475, details: 'ביקוש מוגבר לדבקי קרמיקה' },
  { day: '07/05', total: 658, average: 470, details: 'יציאת חומרים מלאה לגילה' },
  { day: '08/05', total: 640, average: 465, details: 'סיליקון איטום - 18 יחידות' },
  { day: '09/05', total: 625, average: 460, details: 'הכנה לסוף שבוע' },
  { day: '10/05', total: 625, average: 455, details: 'אין שינוי' },
  { day: '11/05', total: 598, average: 450, details: 'משיכת 27 שקי מלט' },
  { day: '12/05', total: 575, average: 445, details: 'צריכת ברזל לפרויקט עירוני' },
  { day: '13/05', total: 550, average: 440, details: 'דבק פרימיום - עבודה שוטפת' },
  { day: '14/05', total: 535, average: 435, details: 'הזמנת קבוצת רכישה' },
  { day: '15/05', total: 512, average: 430, details: 'אמצע חודש - דילול שיא' },
  { day: '16/05', total: 512, average: 425, details: 'שבת' },
  { day: '17/05', total: 498, average: 420, details: 'מלט ואיטום מתחדשים' },
  { day: '18/05', total: 480, average: 415, details: 'אספקה לתלפיות' },
  { day: '19/05', total: 462, average: 410, details: 'צמצום מלאי ברזל' },
  { day: '20/05', total: 445, average: 405, details: 'ניפוק שוטף למרכז' },
  { day: '21/05', total: 430, average: 400, details: 'סיליקון דבק - 15 יח' },
  { day: '22/05', total: 418, average: 395, details: 'דילול לקראת סופ"ש' },
  { day: '23/05', total: 418, average: 390, details: 'סוף שבוע' },
  { day: '24/05', total: 480, average: 385, details: 'קבלת מלאי קטן במעבר' },
  { day: '25/05', total: 465, average: 380, details: 'משיכה מחודשת' },
  { day: '26/05', total: 448, average: 375, details: 'מלט נשר - שבתון חלקי' },
  { day: '27/05', total: 432, average: 370, details: 'איטום סיליקון ודבקים' },
  { day: '28/05', total: 418, average: 365, details: 'מלאי ברזל יורד למינימום' },
  { day: '29/05', total: 418, average: 360, details: 'הכנה לתחילת חודש' },
  { day: '30/05', total: 418, average: 355, details: 'סוף חודש מאי' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      day: string;
      total: number;
      details: string;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xl space-y-2 select-none text-right">
        <p className="text-[10px] font-black text-slate-400 font-mono tracking-widest leading-none">{data.day}</p>
        <p className="text-sm font-black text-saban-blue leading-none">
          מלאי כולל: <span className="text-saban-gold font-mono">{data.total} יח'</span>
        </p>
        <p className="text-[10px] font-bold text-slate-500 leading-normal border-t border-slate-50 pt-2">
          {data.details}
        </p>
      </div>
    );
  }
  return null;
};

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hoveredFileIndex, setHoveredFileIndex] = useState<number | null>(null);
  const [knowledgeBase, setKnowledgeBase] = useState([
    { 
      name: 'מחירון ינואר 2024.pdf', 
      date: '01/01/2024', 
      size: '1.2 MB',
      type: 'Price List',
      author: 'מחלקה כלכלית',
      description: 'מחירון מעודכן לכל מוצרי האיטום והדבקים לשנת 2024.',
      status: 'Processed',
      tags: ['Sales', 'Finance', '2024'],
      summary: 'כולל עדכוני מחיר של 5% על דבקי קרמיקה ו-3% על מערכות איטום ביטומניות.'
    },
    { 
      name: 'מפרט ביצוע איטום.docx', 
      date: '15/02/2024', 
      size: '450 KB',
      type: 'Technical',
      author: 'הנדסה ופיתוח',
      description: 'מפרט טכני מלא ליישום מערכות איטום בגגות ובמרתפים.',
      status: 'Processed',
      tags: ['Engineering', 'Sealing', 'Roofing'],
      summary: 'הנחיות ליישום יריעות PVC והכנת תשתית בטון לפני איטום.'
    },
    { 
      name: 'קטלוג מוצרי גבס.pdf', 
      date: '05/03/2024', 
      size: '2.8 MB',
      type: 'Catalog',
      author: 'שיווק',
      description: 'קטלוג מוצרים מעודכן הכולל לוחות גבס ופרופילים.',
      status: 'Syncing',
      tags: ['Marketing', 'Catalog', 'Gypsum'],
      summary: 'מפרטי לוחות גבס חסיני אש ולוחות חוץ עמידים בלחות.'
    },
  ]);

  const [tickets, setTickets] = useState([
    { 
      id: 'T-852', 
      customerName: 'משה כהן', 
      subject: 'נזילה בחיבורי הצנרת', 
      content: 'שלום, רכשתי מכם דבק איטום לפני שבוע אבל יש עדיין נזילה בחיבורים של הצנרת במרתף. השתמשתי בכמות גדולה אבל זה לא עוזר. אולי צריך חומר אחר?',
      status: 'Open',
      priority: 'High',
      category: 'התייעצות טכנית',
      aiSummary: 'לקוח מדווח על נזילה מתמשכת למרות שימוש בדבק איטום.',
      aiSolution: 'מומלץ לבדוק אם מדובר בלחץ מים גבוה או אם המשטח היה רטוב בזמן היישום. ייתכן שנדרש מסטיק פוליאוריטני.',
      createdAt: '12/05/2026'
    },
    { 
      id: 'T-853', 
      customerName: 'שרה לוי', 
      subject: 'בירור סטטוס הזמנה', 
      content: 'הזמנתי 50 שקי מלט לפני יומיים ועדיין לא קיבלתי הודעה שהמשלוח יצא. אשמח לעדכון.',
      status: 'Open',
      priority: null,
      category: null,
      aiSummary: null,
      aiSolution: null,
      createdAt: '13/05/2026'
    }
  ]);

  const [analyzingTicketId, setAnalyzingTicketId] = useState<string | null>(null);

  const analyzeTicketWithAI = async (ticketId: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    setAnalyzingTicketId(ticketId);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this customer support ticket:
        Subject: ${ticket.subject}
        Content: ${ticket.content}
        
        Provide:
        1. Professional Category
        2. 1-sentence Summary
        3. Suggested Solution or Technical Resource
        4. Priority (Low, Medium, High)`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              summary: { type: Type.STRING },
              solution: { type: Type.STRING },
              priority: { type: Type.STRING, enum: ["Low", "Medium", "High"] }
            },
            required: ["category", "summary", "solution", "priority"]
          }
        }
      });

      const result = JSON.parse(response.text);
      
      setTickets(prev => prev.map(t => {
        if (t.id === ticketId) {
          return {
            ...t,
            category: result.category,
            aiSummary: result.summary,
            aiSolution: result.solution,
            priority: result.priority
          };
        }
        return t;
      }));
    } catch (error) {
      console.error("AI Analysis failed:", error);
      // Fallback for demo
      setTickets(prev => prev.map(t => {
        if (t.id === ticketId) {
          return {
            ...t,
            category: "Technical Inquiry",
            aiSummary: "The customer is asking about product application details.",
            aiSolution: "Refer to Tech Academy resource: 'Advanced Sealing Systems Guide'.",
            priority: "Medium"
          };
        }
        return t;
      }));
    } finally {
      setAnalyzingTicketId(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const completeUpload = (file: File) => {
    setTimeout(() => {
      setIsUploading(false);
      setShowSuccess(true);
      
      const newFile = {
        name: file.name,
        date: new Date().toLocaleDateString('he-IL'),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: 'New Upload',
        author: 'Admin',
        description: 'קובץ חדש שהועלה למערכת בסיס הידע.',
        status: 'Processing',
        tags: ['New', 'Upload'],
        summary: 'הקובץ נמצא בתהליך עיבוד וניתוח על ידי נועה.'
      };
      
      setKnowledgeBase(prev => [newFile, ...prev]);
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  const [inventory, setInventory] = useState([
    { id: '101', name: 'דבק קרמיקה פרימיום', stock: 154, unit: 'שק 25 ק"ג', status: 'In Stock' },
    { id: '102', name: 'מלט אפור נשר', stock: 42, unit: 'שק 50 ק"ג', status: 'Low Stock' },
    { id: '103', name: 'סיליקון איטום לבן', stock: 210, unit: 'יחידה', status: 'In Stock' },
    { id: '104', name: 'ברזל בניין 8 מ"מ', stock: 12, unit: 'טון', status: 'Critical' },
  ]);

  interface ToastAlert {
    id: string;
    message: string;
    timestamp: string;
  }
  const [toasts, setToasts] = useState<ToastAlert[]>([]);

  const addToastAlert = (message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      id,
      message,
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    };
    setToasts(prev => [newToast, ...prev]);
    // Auto-remove after 6 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 6000);
  };

  React.useEffect(() => {
    // Initial alerting of critical statuses for demo
    const criticalItems = inventory.filter(item => item.status === 'Critical');
    criticalItems.forEach(item => {
      addToastAlert(`מלאי קריטי במערכת: מוצר (${item.name}) עומד כעת על ${item.stock} ${item.unit} בלבד!`);
    });
  }, []);

  const handleStockChange = (id: string, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock + delta);
        let newStatus = 'In Stock';
        
        // Product specific thresholds
        if (id === '104') { // ברזל
          if (newStock <= 15) newStatus = 'Critical';
          else if (newStock <= 30) newStatus = 'Low Stock';
        } else if (id === '102') { // מלט
          if (newStock <= 45) newStatus = 'Critical';
          else if (newStock <= 60) newStatus = 'Low Stock';
        } else { // Others
          if (newStock <= 25) newStatus = 'Critical';
          else if (newStock <= 50) newStatus = 'Low Stock';
        }

        // Trigger warning if state transitioned to Critical
        if (newStatus === 'Critical' && item.status !== 'Critical') {
          addToastAlert(`התראה דחופה: מלאי ${item.name} הדרדר לסטטוס קריטי – (${newStock} ${item.unit})!`);
        }

        return { ...item, stock: newStock, status: newStatus };
      }
      return item;
    }));
  };


  const Sidebar = () => (
    <div className="w-80 bg-saban-blue text-white min-h-[70vh] rounded-[48px] p-10 space-y-12 hidden lg:block shadow-[0_30px_60px_rgba(30,58,138,0.25)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className="flex items-center gap-4 px-2 relative z-10">
        <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 border-saban-gold p-1.5">
           <img src="https://i.postimg.cc/qqLm9M5t/Gemini-Generated-Image-gmd5k7gmd5k7gmd5.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <div>
           <span className="font-black text-xl tracking-tighter block leading-none">Saban</span>
           <span className="text-[10px] font-black tracking-[4px] uppercase opacity-40">Command</span>
        </div>
      </div>
      
      <nav className="space-y-4 relative z-10">
        {[
          { id: 'dashboard', label: 'סקירה כללית', icon: BarChart3 },
          { id: 'inventory', label: 'ניהול מלאי', icon: Package },
          { id: 'customers', label: 'לקוחות', icon: Users },
          { id: 'ai-training', label: 'אימון AI (נועה)', icon: BrainCircuit },
          { id: 'tickets', label: 'פניות שירות', icon: MessageSquareCode },
          { id: 'settings', label: 'הגדרות', icon: Settings },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-500 font-black text-[11px] uppercase tracking-[2px]",
              activeTab === item.id 
                ? "bg-white text-saban-blue shadow-2xl scale-[1.05]" 
                : "text-white/40 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-saban-blue" : "opacity-30")} />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );

  const InventoryView = () => (
    <div className="space-y-12 flex-1">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
           <h2 className="text-4xl font-black font-heebo text-saban-blue tracking-tighter">ניהול מלאי פרויקטים</h2>
           <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">מעקב מלאי ירושלים וסביבה</p>
        </div>
        <button className="bg-saban-blue text-white px-10 py-5 rounded-2xl flex items-center gap-4 font-black shadow-[0_20px_40px_rgba(30,58,138,0.2)] hover:bg-blue-900 transition-all uppercase tracking-[2px] text-[10px]">
          <Plus className="w-5 h-5 text-saban-gold" />
          הוסף מוצר למערכת
        </button>
      </div>

      {/* Critical Status Highlight Box */}
      {inventory.some(item => item.status === 'Critical') && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50/70 border-r-4 border-red-500 border border-red-100 p-8 rounded-[40px] shadow-[0_20px_40px_rgba(239,68,68,0.05)] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-6 text-right">
            <div className="w-14 h-14 bg-red-500 text-white rounded-[20px] flex items-center justify-center shadow-[0_15px_30px_rgba(239,68,68,0.3)] animate-pulse shrink-0">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black font-heebo text-red-900 tracking-tight">כשל מלאי בקבוצה – פריטים קריטיים במאגר</h4>
              <p className="text-slate-500 font-semibold text-xs text-right">
                נמצאו מוצרים הדורשים הזמנת רכש דחופה על מנת למנוע עיכובים באספקת הפרויקטים.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {inventory.filter(item => item.status === 'Critical').map(item => (
              <span key={item.id} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-red-100 rounded-xl text-[10px] font-black font-mono text-red-600 shadow-sm animate-pulse">
                {item.name} ({item.stock} {item.unit})
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stock Depletion Trend Chart Card */}
      <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl space-y-8 select-none">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 text-right">
            <span className="text-saban-gold font-black text-[10px] uppercase tracking-[4px]">Live Insights</span>
            <h3 className="text-2xl font-black text-saban-blue tracking-tight">מגמת דילול מלאי - 30 ימים אחרונים</h3>
            <p className="text-slate-400 text-xs font-bold leading-relaxed font-heebo">מעקב קצב יציאת חומרי מליטה, ברזל ואיטום מהמחסן המרכזי</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-0.5 bg-[#1E3A8A] inline-block" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">מדד דילול כולל (יח')</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-0.5 bg-[#C5A059] border-t border-dashed inline-block" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">קצב ממוצע</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={STOCK_TRENDS}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0.01}/>
                </linearGradient>
                <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C5A059" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#C5A059" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="day" 
                stroke="#CBD5E1" 
                fontSize={10}
                fontFamily="JetBrains Mono, monospace"
                tickLine={false} 
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#CBD5E1" 
                fontSize={10}
                fontFamily="JetBrains Mono, monospace"
                tickLine={false} 
                axisLine={false}
                orientation="right"
                dx={10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E2E8F0', strokeWidth: 1 }} />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#1E3A8A" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorTotal)" 
              />
              <Area 
                type="monotone" 
                dataKey="average" 
                stroke="#C5A059" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                fillOpacity={1} 
                fill="url(#colorAverage)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 relative">
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
          <input type="text" placeholder="חיפוש מהיר במאגר המוצרים..." className="w-full pr-16 pl-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-saban-blue/10 font-bold text-saban-blue shadow-inner" />
        </div>
        <button className="px-6 py-5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-saban-blue hover:border-saban-blue transition shadow-sm">
          <Filter className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-50 overflow-hidden shadow-2xl">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-10 py-6 font-black text-slate-300 uppercase tracking-[4px] text-[10px]">Product ID</th>
              <th className="px-10 py-6 font-black text-slate-300 uppercase tracking-[4px] text-[10px]">תיאור פריט</th>
              <th className="px-10 py-6 font-black text-slate-300 uppercase tracking-[4px] text-[10px]">כמות</th>
              <th className="px-10 py-6 font-black text-slate-300 uppercase tracking-[4px] text-[10px]">יחידה</th>
              <th className="px-10 py-6 font-black text-slate-300 uppercase tracking-[4px] text-[10px]">סטטוס</th>
              <th className="px-10 py-6 font-black text-slate-300 uppercase tracking-[4px] text-[10px]">ניהול</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {inventory.map((item) => {
              const isCritical = item.status === 'Critical';
              return (
                <tr 
                  key={item.id} 
                  className={cn(
                    "transition-all duration-300 relative",
                    isCritical 
                      ? "bg-rose-50/30 hover:bg-rose-50/50 border-r-4 border-red-500" 
                      : "hover:bg-slate-50/50"
                  )}
                >
                  <td className="px-10 py-6 font-mono text-xs font-bold text-slate-400"># {item.id}</td>
                  <td className="px-10 py-6 font-black text-saban-blue text-lg tracking-tight flex items-center gap-3">
                    {item.name}
                    {isCritical && (
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                    )}
                  </td>
                  <td className="px-10 py-6 font-black text-slate-700">{item.stock}</td>
                  <td className="px-10 py-6 text-slate-400 font-bold uppercase tracking-widest text-[10px]">{item.unit}</td>
                  <td className="px-10 py-6">
                    <span className={cn(
                      "px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[2px] shadow-sm inline-block",
                      item.status === 'In Stock' ? "bg-green-50 text-green-600 border border-green-100" :
                      item.status === 'Low Stock' ? "bg-yellow-50 text-yellow-600 border border-yellow-100" :
                      "bg-red-50 text-red-600 border border-red-100 animate-pulse"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleStockChange(item.id, -10)}
                        className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center font-black hover:bg-rose-100 hover:text-red-600 transition-all text-xs font-mono"
                        title="משוך 10 יח'"
                      >
                        -10
                      </button>
                      <button 
                        onClick={() => handleStockChange(item.id, 25)}
                        className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center font-black hover:bg-emerald-100 hover:text-emerald-700 transition-all text-xs font-mono"
                        title="הוסף 25 יח'"
                      >
                        +25
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const TicketsView = () => (
    <div className="space-y-12 flex-1">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
           <h2 className="text-4xl font-black font-heebo text-saban-blue tracking-tighter">פניות שירות לקוחות</h2>
           <p className="text-slate-400 font-bold text-xs uppercase tracking-[4px] border-r-2 border-slate-100 pr-4">ניהול וניתוח פניות באמצעות נועה AI</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-saban-blue/5 px-6 py-3 rounded-2xl border border-saban-blue/5 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-saban-gold fill-saban-gold" />
              <span className="text-[10px] font-black text-saban-blue uppercase tracking-widest">AI Categorization Active</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {tickets.map(ticket => (
          <motion.div 
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] border border-slate-50 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
          >
            <div className="p-10 flex flex-col lg:flex-row gap-10">
              {/* Ticket Info */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-black text-slate-300">#{ticket.id}</span>
                      <span className={cn(
                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                        ticket.priority === 'High' ? "bg-red-50 text-red-500" :
                        ticket.priority === 'Medium' ? "bg-orange-50 text-orange-500" :
                        ticket.priority === 'Low' ? "bg-blue-50 text-blue-500" :
                        "bg-slate-50 text-slate-400"
                      )}>
                        {ticket.priority || 'Unassigned'}
                      </span>
                   </div>
                   <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <Clock className="w-4 h-4" />
                      {ticket.createdAt}
                   </div>
                </div>
                
                <div>
                  <h4 className="text-2xl font-black text-saban-blue tracking-tight mb-2">{ticket.subject}</h4>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[3px] mb-4">Customer: {ticket.customerName}</p>
                  <p className="text-slate-600 font-medium leading-relaxed bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                    {ticket.content}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button className="flex items-center gap-3 px-8 py-3 bg-saban-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-blue-900 transition-all">
                     <Eye className="w-4 h-4" />
                     View Details
                  </button>
                  <button className="flex items-center gap-3 px-8 py-3 bg-white border border-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-red-100 hover:text-red-400 transition-all">
                     <Trash2 className="w-4 h-4" />
                     Archive
                  </button>
                </div>
              </div>

              {/* AI Insight Panel */}
              <div className="lg:w-96 bg-slate-50/50 rounded-[32px] p-8 border border-slate-100 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-saban-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                
                {analyzingTicketId === ticket.id ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-4 py-10">
                    <Loader2 className="w-10 h-10 text-saban-gold animate-spin" />
                    <p className="text-[10px] font-black text-saban-blue uppercase tracking-[4px]">נועה AI מנתחת פנייה...</p>
                  </div>
                ) : ticket.aiSummary ? (
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-3">
                       <Sparkles className="w-5 h-5 text-saban-gold" />
                       <h5 className="text-[10px] font-black text-saban-blue uppercase tracking-[4px]">תובנות נועה AI</h5>
                    </div>

                    <div className="space-y-4">
                       <div className="space-y-2">
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Category</p>
                          <span className="inline-block px-3 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-black text-saban-gold uppercase tracking-widest shadow-sm">
                            {ticket.category}
                          </span>
                       </div>
                       
                       <div className="space-y-2">
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Summary</p>
                          <p className="text-[11px] font-bold text-saban-blue leading-relaxed border-r-2 border-saban-gold pr-3">
                             {ticket.aiSummary}
                          </p>
                       </div>

                       <div className="space-y-2">
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-right">הצעה לפתרון</p>
                          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                             <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">
                                "{ticket.aiSolution}"
                             </p>
                          </div>
                       </div>
                    </div>

                    <button 
                      onClick={() => analyzeTicketWithAI(ticket.id)}
                      className="w-full py-4 mt-4 bg-white/50 border border-slate-200 rounded-2xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:bg-white hover:text-saban-gold transition-all"
                    >
                      הרצה חוזרת של הניתוח
                    </button>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center space-y-6 py-10 text-center relative z-10">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-saban-gold border border-slate-50">
                       <Sparkles className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                       <p className="text-saban-blue font-black text-sm">הניתוח החכם מוכן</p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">נועה יכולה לסכם את הפנייה ולהציע פתרון</p>
                    </div>
                    <button 
                      onClick={() => analyzeTicketWithAI(ticket.id)}
                      className="px-8 py-4 bg-saban-gold text-white rounded-2xl text-[10px] font-black uppercase tracking-[2px] shadow-[0_15px_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
                    >
                       הפעל ניתוח AI
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const AITrainingView = () => (
    <div className="space-y-16 flex-1">
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <h2 className="text-4xl font-black font-heebo text-saban-blue tracking-tighter">מרכז אימון AI - נועה</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[4px] border-r-2 border-slate-100 pr-4">הזנת בסיס ידע מקצועי ועדכונים קונסטרוקטיביים בזמן אמת</p>
        </div>
        
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-green-50 text-green-600 px-6 py-3 rounded-2xl flex items-center gap-3 border border-green-100 shadow-xl"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-widest">Knowledge Base Updated</span>
          </motion.div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="relative">
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <label 
            htmlFor="file-upload"
            className={cn(
              "bg-slate-50/50 p-16 rounded-[48px] border-dashed border-2 flex flex-col items-center justify-center text-center space-y-8 transition-all cursor-pointer group shadow-inner relative overflow-hidden",
              isUploading ? "border-saban-blue bg-slate-50 cursor-not-allowed" : "border-slate-200 hover:border-saban-blue hover:bg-slate-50"
            )}
          >
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-saban-blue/5 rounded-full blur-2xl" />
            
            {isUploading ? (
              <div className="relative z-10 flex flex-col items-center space-y-6 w-full px-8">
                <Loader2 className="w-16 h-16 text-saban-blue animate-spin" />
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="h-full bg-saban-blue"
                  />
                </div>
                <p className="text-saban-blue font-black text-xs uppercase tracking-[4px]">Uploading Base {uploadProgress}%</p>
              </div>
            ) : (
              <>
                <div className="w-24 h-24 bg-saban-blue text-white rounded-[32px] flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-[0_20px_40px_rgba(30,58,138,0.2)]">
                  <FileUp className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-2xl text-saban-blue tracking-tight">הזנת בסיס נתונים</h4>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[4px]">Support: PDF, CAD, XL, DOCS</p>
                </div>
                <div className="px-12 py-5 bg-white text-saban-blue border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-[3px] shadow-xl group-hover:bg-saban-blue group-hover:text-white transition-all">
                  Select Master Files
                </div>
              </>
            )}
          </label>
        </div>

        <div className="space-y-10">
          <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[6px] border-b border-slate-50 pb-6">Knowledge Base History</h4>
          <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar relative">
            {knowledgeBase.map((file, i) => (
              <div key={file.name + i} className="relative">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onMouseEnter={() => setHoveredFileIndex(i)}
                  onMouseLeave={() => setHoveredFileIndex(null)}
                  className="bg-white p-6 rounded-[32px] border border-slate-50 flex items-center justify-between shadow-xl group hover:shadow-2xl hover:border-saban-blue/20 transition-all duration-500 relative z-10"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-saban-gold transition-all duration-500 group-hover:bg-saban-blue group-hover:text-white">
                      <BrainCircuit className="w-7 h-7" />
                    </div>
                    <div>
                      <h5 className="font-black text-saban-blue text-md tracking-tight leading-none mb-2">{file.name}</h5>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-[2px]">{file.date} · {file.size}</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setKnowledgeBase(prev => prev.filter((_, idx) => idx !== i));
                    }}
                    className="w-10 h-10 rounded-2xl hover:bg-red-50 text-slate-200 hover:text-red-500 flex items-center justify-center transition-all"
                  >
                     <Plus className="w-5 h-5 rotate-45" />
                  </button>
                </motion.div>

                {/* Hover Preview Card */}
                {hoveredFileIndex === i && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: -10, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    className="absolute right-full top-0 mr-4 w-80 bg-white p-8 rounded-[40px] shadow-[0_40px_80px_rgba(30,58,138,0.15)] border border-slate-100 z-50 pointer-events-none hidden xl:block"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-black text-saban-gold uppercase tracking-[3px] bg-saban-gold/5 px-3 py-1 rounded-full">{file.type}</span>
                         <div className="flex items-center gap-2">
                           <div className={cn(
                             "w-1.5 h-1.5 rounded-full animate-pulse",
                             file.status === 'Processed' ? "bg-green-500" : "bg-blue-400"
                           )} />
                           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{file.status}</span>
                         </div>
                      </div>

                      <div className="space-y-2">
                        <h6 className="font-black text-saban-blue text-sm leading-tight">{file.name}</h6>
                        <p className="text-slate-500 text-[11px] font-medium leading-relaxed">{file.description}</p>
                      </div>

                      <div className="space-y-3">
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50 pb-2">Content Insight</p>
                        <p className="text-saban-blue/70 text-[11px] font-bold leading-relaxed bg-slate-50/50 p-4 rounded-2xl italic">
                          "{file.summary}"
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {file.tags?.map((tag, idx) => (
                          <span key={idx} className="text-[8px] font-black text-slate-400 border border-slate-100 px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                             <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Author</p>
                            <p className="text-[10px] font-black text-saban-blue leading-none">{file.author}</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{file.size}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-48 relative">
      {/* Floating Critical Alert Toast Stack */}
      <div className="fixed top-8 left-8 z-[9999] space-y-4 max-w-sm pointer-events-none select-none">
        <div className="space-y-4 pointer-events-auto">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              className="bg-white border-l-4 border-red-500 rounded-3xl p-6 shadow-[0_30px_60px_rgba(239,68,68,0.15)] border border-slate-100 flex items-start gap-4 min-w-[320px] max-w-md"
            >
              <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 animate-bounce" />
              </div>
              <div className="flex-1 space-y-1 text-right" dir="rtl">
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-md">התרעת מלאי קריטי</span>
                  <span className="text-[9px] font-black text-slate-300 font-mono">{toast.timestamp}</span>
                </div>
                <p className="text-slate-600 font-bold text-xs leading-relaxed">{toast.message}</p>
              </div>
              <button 
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-slate-300 hover:text-slate-500 transition-colors uppercase font-black text-[10px]"
              >
                סגור
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <Sidebar />
        <div className="flex-1 bg-white rounded-[64px] p-12 md:p-24 min-h-[70vh] shadow-[0_50px_100px_rgba(30,58,138,0.08)] border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-saban-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            {activeTab === 'inventory' && <InventoryView />}
            {activeTab === 'ai-training' && <AITrainingView />}
            {activeTab === 'tickets' && <TicketsView />}
            {activeTab !== 'inventory' && activeTab !== 'ai-training' && activeTab !== 'tickets' && (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-10 py-32">
                <div className="w-32 h-32 bg-slate-50 rounded-[48px] flex items-center justify-center shadow-inner border border-slate-100">
                  <Settings className="w-14 h-14 opacity-10 animate-spin-slow" />
                </div>
                <p className="font-black text-xs uppercase tracking-[6px] opacity-30">Module in Development</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
