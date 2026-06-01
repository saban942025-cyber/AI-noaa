import React from 'react';
import { motion } from 'motion/react';
import { Play, Calendar, Clock, Share2 } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  duration: string;
}

const VIDEOS: Video[] = [
  {
    id: 'dQw4w9WgXcQ', // Placeholder
    title: 'הדרכה: איך ליישם שליכט צבעוני נכון?',
    description: 'בסרטון זה נלמד את שלבי ההכנה והיישום של שליכט אקרילי לקירות חוץ.',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80',
    date: '12 באפריל 2024',
    duration: '12:45'
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'סקירת מוצר: מערכת איטום חדשה של SIKA',
    description: 'מציגים את החומרים החדשים שהגיעו לסניף לפתרון בעיות איטום קשות במיוחד.',
    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80',
    date: '5 באפריל 2024',
    duration: '08:20'
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'ביקור באתר בנייה: אספקה למגדלי ירושלים',
    description: 'הצטרפו אלינו לביקור בשטח וראו איך ח.סבן מנהלת את הלודיסטיקה המורכבת.',
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80',
    date: '28 במרץ 2024',
    duration: '05:10'
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'וובינר: חידושים בתחום הבטון והתערובות',
    description: 'הרצאה מקצועית מפי המהנדס הראשי של המפעל על תערובות מוכנות מתקדמות.',
    thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80',
    date: '15 במרץ 2024',
    duration: '22:15'
  }
];

export const MediaCenter = () => {
  return (
    <div className="container mx-auto px-4 py-48 space-y-24">
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center gap-4 mb-4">
           <div className="h-1 w-20 bg-saban-gold rounded-full" />
           <span className="text-saban-gold font-black text-xs uppercase tracking-[4px]">Saban Experience</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-heebo font-black text-saban-blue leading-none tracking-tighter">מרכז המדיה</h1>
        <p className="text-xl text-slate-500 font-bold max-w-2xl leading-relaxed">סרטוני הדרכה, סקירות מוצרים וחדשות מהשטח ישירות אליכם. הידע המקצועי שאתם צריכים, זמין בכל זמן.</p>
      </div>

      {/* Featured Video */}
      <div className="relative aspect-video rounded-[48px] overflow-hidden shadow-[0_50px_100px_rgba(30,58,138,0.15)] group cursor-pointer border border-slate-100">
        <img 
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          alt="Featured"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-saban-blue/90 via-saban-blue/20 to-transparent flex flex-col justify-end p-10 md:p-20">
          <div className="bg-saban-gold text-white self-start px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[4px] mb-8 shadow-2xl">
            מומלץ השבוע
          </div>
          <h2 className="text-4xl md:text-7xl font-heebo font-black text-white mb-8 leading-tight max-w-5xl tracking-tighter">המדריך המלא ליישום <br/> מערכות איטום מתקדמות</h2>
          <div className="flex flex-wrap items-center gap-8">
            <button className="flex items-center gap-4 bg-saban-gold text-white px-14 py-5 rounded-2xl font-black hover:bg-white hover:text-saban-blue transition-all shadow-[0_20px_50px_rgba(197,160,89,0.3)] self-start uppercase tracking-widest text-xs">
              <Play className="fill-current w-5 h-5" />
              צפו עכשיו
            </button>
            <div className="flex items-center gap-6 text-white/60 text-xs font-black uppercase tracking-widest">
               <span className="flex items-center gap-3"><Clock className="w-5 h-5 text-saban-gold" /> 12:45 דקות</span>
               <span className="flex items-center gap-3"><Calendar className="w-5 h-5 text-saban-gold" /> 12.04.2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {VIDEOS.map((video, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer bg-white rounded-[40px] overflow-hidden p-4 shadow-xl border border-slate-50 hover:shadow-2xl hover:border-saban-blue/10 transition-all duration-500"
          >
            <div className="relative aspect-video rounded-[32px] overflow-hidden mb-6 shadow-inner">
              <img 
                src={video.thumbnail} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt={video.title}
              />
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-lg font-mono font-bold">
                {video.duration}
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:opacity-100 opacity-0 transition-opacity flex items-center justify-center">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform border border-white/40">
                  <Play className="fill-current w-6 h-6 translate-x-0.5" />
                </div>
              </div>
            </div>
            <div className="px-3 pb-4 space-y-3">
               <h3 className="font-bold text-slate-800 group-hover:text-saban-blue transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{video.date}</span>
                   <Share2 className="w-4 h-4 text-slate-300 hover:text-saban-blue transition-colors" />
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center pt-24">
        <button className="px-14 py-6 bg-saban-blue text-white font-black rounded-[24px] shadow-2xl hover:bg-blue-900 transition-all uppercase tracking-[4px] text-xs">
          לכל הסרטונים בערוץ היוטיוב
        </button>
      </div>
    </div>
  );
};
