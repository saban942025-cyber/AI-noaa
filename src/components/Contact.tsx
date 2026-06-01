import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

const BRANCHES = [
  {
    name: 'סניף תלפיות (ראשי)',
    address: 'דרך בית לחם 150, ירושלים',
    phone: '02-1234567',
    hours: 'א-ה 07:00-17:00, ו 07:00-12:00',
    type: 'מרכז לוגיסטי וחנות'
  },
  {
    name: 'סניף מישור אדומים',
    address: 'אזור התעשייה החדש, רחוב המסקר',
    phone: '02-9876543',
    hours: 'א-ה 07:00-16:30, ו 07:00-12:00',
    type: 'מחסן הפצה'
  }
];

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to /api/tickets
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-48">
      <div className="grid lg:grid-cols-2 gap-24 items-start">
        {/* Left Side: Info */}
        <div className="space-y-20">
          <div className="space-y-8 text-right">
            <div className="flex items-center gap-4 mb-4">
               <div className="h-1 w-20 bg-saban-gold rounded-full" />
               <span className="text-saban-gold font-black text-[10px] uppercase tracking-[6px]">Direct Contact</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-heebo font-black text-saban-blue leading-none tracking-tighter">צור קשר</h1>
            <p className="text-xl text-slate-500 font-bold max-w-xl leading-relaxed">אנחנו כאן עבורכם לכל מענה מקצועי, ייעוץ הנדסי או תמיכה לוגיסטית מהירה.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-10">
            {BRANCHES.map((branch, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[40px] border border-slate-50 shadow-2xl space-y-8 group hover:shadow-[0_40px_80px_rgba(30,58,138,0.1)] transition-all duration-500"
              >
                <div className="flex items-center justify-between">
                   <h3 className="font-black text-2xl text-saban-blue uppercase tracking-tighter">{branch.name}</h3>
                   <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-saban-gold group-hover:bg-saban-gold group-hover:text-white transition-all">
                      <MapPin className="w-5 h-5" />
                   </div>
                </div>
                <div className="space-y-5 text-sm font-bold border-r-2 border-slate-50 pr-6">
                  <div className="flex items-center gap-4 text-slate-600">
                    <span className="w-12 text-slate-300 font-black text-[10px] uppercase truncate tracking-widest">כתובת</span>
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600">
                    <span className="w-12 text-slate-300 font-black text-[10px] uppercase truncate tracking-widest">טלפון</span>
                    <span>{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600">
                    <span className="w-12 text-slate-300 font-black text-[10px] uppercase truncate tracking-widest">שעות</span>
                    <span className="text-[11px] leading-tight">{branch.hours}</span>
                  </div>
                </div>
                <div className="pt-6">
                   <button className="text-[10px] font-black text-saban-blue uppercase tracking-[3px] py-3 px-6 bg-slate-50 rounded-xl hover:bg-saban-blue hover:text-white transition-all w-full text-center">ניווט מהיר ב-Waze</button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-16 pt-10">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-[24px] bg-white border border-slate-100 flex items-center justify-center text-saban-blue shadow-xl group hover:bg-saban-blue hover:text-white transition-all">
                 <Mail className="w-8 h-8" />
               </div>
               <div className="text-right">
                  <h4 className="font-black text-slate-300 text-[10px] uppercase tracking-[4px] mb-2">דואר אלקטרוני</h4>
                  <p className="text-saban-blue font-black text-lg">office@saban.co.il</p>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-[24px] bg-white border border-slate-100 flex items-center justify-center text-saban-gold shadow-xl group hover:bg-saban-gold hover:text-white transition-all">
                 <Phone className="w-8 h-8" />
               </div>
               <div className="text-right">
                  <h4 className="font-black text-slate-300 text-[10px] uppercase tracking-[4px] mb-2">מוקד ארצי</h4>
                  <p className="text-saban-blue font-black text-2xl tracking-tighter leading-none">*9420</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white p-12 md:p-20 rounded-[48px] border border-slate-50 shadow-[0_50px_100px_rgba(30,58,138,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-saban-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]" />
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="space-y-10 relative z-10"
              >
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">שם מלא</label>
                  <input required type="text" className="w-full p-6 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-saban-blue/10 outline-none transition shadow-inner font-bold text-saban-blue" placeholder="ישראל ישראלי" />
                </div>
                <div className="grid sm:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">טלפון</label>
                    <input required type="tel" className="w-full p-6 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-saban-blue/10 outline-none transition shadow-inner font-bold text-saban-blue" placeholder="050-0000000" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">דוא"ל</label>
                    <input required type="email" className="w-full p-6 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-saban-blue/10 outline-none transition shadow-inner font-bold text-saban-blue" placeholder="user@example.com" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">נושא הפנייה</label>
                  <select className="w-full p-6 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-saban-blue/10 outline-none transition shadow-inner font-black text-saban-blue appearance-none">
                    <option>הצעת מחיר לפרויקט</option>
                    <option>ייעוץ טכני מקצועי</option>
                    <option>שירות לקוחות והזמנות</option>
                    <option>אחר</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">הודעה מפורטת</label>
                  <textarea rows={4} className="w-full p-6 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-saban-blue/10 outline-none transition shadow-inner font-bold text-saban-blue" placeholder="איך נוכל לעזור?"></textarea>
                </div>
                <button 
                  disabled={loading}
                  className="w-full bg-saban-blue text-white font-black py-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-blue-900 transition-all shadow-[0_20px_40px_rgba(30,58,138,0.2)] disabled:opacity-50 uppercase tracking-[4px] text-xs mt-4"
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full" />
                  ) : (
                    <>
                      <span>שלח פנייה למערכת</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-8"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[32px] flex items-center justify-center mx-auto shadow-xl ring-8 ring-green-50">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-heebo font-black text-saban-blue tracking-tighter">הפנייה התקבלה!</h3>
                  <p className="text-slate-500 font-bold max-w-sm mx-auto">תודה רבה. נציגנו יחזור אליך בהקדם האפשרי עם כל המידע הנדרש.</p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-slate-100 text-slate-800 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"
                >
                  שלח הודעה נוספת
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
