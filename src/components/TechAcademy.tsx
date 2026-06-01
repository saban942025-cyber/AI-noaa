import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Presentation, Download, ExternalLink, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

const RESOURCES = [
  {
    title: 'מדריך איטום רטוב - פתרונות SIKA',
    category: 'איטום',
    type: 'Presentation',
    slidesId: '1_0vK_1X3_Ym8_2N_4S_5h_6j_7k_8l_9m_0n', // Mock ID
  },
  {
    title: 'מערכות ריצוף מתקדמות - מדריך לקבלן',
    category: 'ריצוף',
    type: 'PDF',
  },
  {
    title: 'בנייה קלה - היבטים קונסטרוקטיביים',
    category: 'בנייה קלה',
    type: 'Presentation',
  },
  {
    title: 'תערובות מוכנות - ניהול זמן באתר',
    category: 'בטון',
    type: 'PDF',
  }
];

export const TechAcademy = () => {
  return (
    <div className="container mx-auto px-4 py-48 space-y-24">
      <div className="text-center max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col items-center gap-4">
           <span className="text-saban-gold font-black text-xs uppercase tracking-[6px]">Institutional Knowledge</span>
           <div className="h-1 w-24 bg-saban-blue rounded-full" />
        </div>
        <h1 className="text-5xl md:text-8xl font-heebo font-black text-saban-blue leading-tight tracking-tighter">האקדמיה הטכנית</h1>
        <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">המרכז להכשרה מקצועית, מפרטים הנדסיים וידע טכני מתקדם המאושר על ידי מומחי החברה.</p>
      </div>

      {/* Featured Slide View */}
      <div className="grid lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2 space-y-12">
          <div className="relative aspect-video bg-white rounded-[48px] overflow-hidden shadow-[0_50px_100px_rgba(30,58,138,0.1)] border border-slate-100 group">
            <iframe 
              src="https://docs.google.com/presentation/d/e/2PACX-1vT_0R6uI_O-Kx_Y_1_2_3/embed?start=false&loop=false&delayms=3000" 
              frameBorder="0" 
              width="100%" 
              height="100%" 
              allowFullScreen={true}
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-white p-12 rounded-[40px] shadow-2xl border border-slate-50">
            <div>
              <div className="flex items-center gap-3 mb-3">
                 <span className="w-3 h-3 bg-saban-gold rounded-full" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Featured Content</span>
              </div>
              <h2 className="text-3xl font-black text-saban-blue leading-tight tracking-tighter">מדריך טכני: מערכות איטום בגגות</h2>
              <p className="text-slate-500 font-bold text-sm mt-3 border-r-2 border-slate-100 pr-4">מהדורת מאי 2024 · עודכן ע"י מהנדס המערכות ח.סבן</p>
            </div>
            <button className="flex items-center gap-4 bg-saban-gold text-white px-12 py-5 rounded-2xl font-black shadow-[0_20px_40px_rgba(197,160,89,0.3)] hover:bg-saban-blue transition-all uppercase tracking-[2px] text-xs">
              <Download className="w-5 h-5" />
              הורד מפרט PDF
            </button>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-slate-50 space-y-10">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[4px] border-b border-slate-50 pb-6 text-center">נתיבי למידה מקצועיים</h3>
          <div className="space-y-4">
            {['איטום', 'בנייה מתקדמת', 'חיפוי וריצוף', 'תשתיות', 'עבודה בגובה'].map((cat, i) => (
              <button 
                key={i}
                className={cn(
                  "w-full text-right p-6 rounded-2xl transition-all group flex items-center justify-between border",
                  i === 0 ? "bg-saban-blue text-white shadow-2xl border-transparent scale-[1.05]" : "bg-white border-transparent hover:border-slate-200 text-slate-600 hover:text-saban-blue"
                )}
              >
                <div className="flex items-center gap-4">
                   <div className={cn("w-2 h-2 rounded-full", i === 0 ? "bg-saban-gold" : "bg-slate-200 group-hover:bg-saban-blue")} />
                   <span className="font-black text-[11px] uppercase tracking-widest">{cat}</span>
                </div>
                <ChevronLeft className={cn("w-5 h-5 transition-transform group-hover:-translate-x-2", i === 0 ? "text-saban-gold" : "text-slate-200")} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Library */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
             <h3 className="text-4xl font-heebo font-black text-saban-blue leading-tight tracking-tighter">מאגר המידע הטכני</h3>
             <p className="text-slate-400 font-bold text-sm">גישה חופשית למסמכים מאושרים ולמפרטי עבודה</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-xl border border-slate-50">
             <button className="px-6 py-3 bg-saban-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">הכל</button>
             <button className="px-6 py-3 hover:bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest transition-all">מצגות</button>
             <button className="px-6 py-3 hover:bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest transition-all">מסמכים</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
          {RESOURCES.map((res, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col justify-between"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-[20px] bg-slate-50 flex items-center justify-center text-saban-blue group-hover:bg-saban-blue group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-[0_10px_20px_rgba(30,58,138,0.3)]">
                    {res.type === 'Presentation' ? <Presentation className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[3px]">{res.category}</span>
                </div>
                <h4 className="font-black text-xl text-saban-blue leading-tight group-hover:text-saban-gold transition-colors block border-r-2 border-slate-50 pr-4">
                  {res.title}
                </h4>
              </div>
              <button className="w-full flex items-center justify-center gap-4 py-5 mt-10 bg-slate-50 hover:bg-saban-gold hover:text-white rounded-2xl text-[10px] font-black text-slate-600 transition-all uppercase tracking-[2px] shadow-sm">
                <ExternalLink className="w-4 h-4" />
                צפייה במאגר
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
