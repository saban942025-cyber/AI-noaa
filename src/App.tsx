/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  PlayCircle, 
  BookOpen, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  Menu, 
  X,
  ChevronLeft
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { cn } from './lib/utils';
import { ChatHub } from './components/ChatHub';
import { MediaCenter } from './components/MediaCenter';
import { TechAcademy } from './components/TechAcademy';
import { Contact } from './components/Contact';
import { AdminDashboard } from './components/AdminDashboard';

// Pages - to be implemented in separate files or defined inline for now
const Home = () => (
  <div className="space-y-24 pb-24">
    {/* Hero Section - Cinematic Industrial Branding */}
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1504307651254-35680f456ff0?auto=format&fit=crop&q=80" 
          alt="Industrial Warehouse" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-saban-blue/95 via-saban-blue/80 to-saban-blue/95" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-32 h-32 md:w-44 md:h-44 bg-white rounded-[32px] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex items-center justify-center border-4 border-saban-gold relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-saban-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src="https://i.postimg.cc/qqLm9M5t/Gemini-Generated-Image-gmd5k7gmd5k7gmd5.png" 
              alt="Saban Logo" 
              className="w-full h-full object-contain relative z-10"
            />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8 max-w-5xl"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-saban-gold font-black text-xs uppercase tracking-[8px] drop-shadow-md">Professional Engineering</span>
            <div className="h-1 w-24 bg-white/20 rounded-full" />
          </div>
          
          <h1 className="text-5xl md:text-9xl font-heebo font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
            BUILDING THE <br className="hidden md:block" /> FUTURE STRENGTH
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-12">
             <Link to="/chat" className="group px-14 py-6 bg-saban-gold text-white font-black rounded-2xl hover:bg-white hover:text-saban-blue transition-all shadow-[0_20px_50px_rgba(197,160,89,0.3)] uppercase tracking-[3px] text-xs flex items-center gap-4">
               <span>התייעצות עם נועה AI</span>
               <ChevronLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
             </Link>
             <Link to="/academy" className="px-14 py-6 bg-white/5 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-[3px] text-xs shadow-2xl">
               האקדמיה הטכנית
             </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30"
      >
        <span className="text-[8px] font-black uppercase tracking-[4px] text-white">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>

      {/* Brand Watermark */}
      <div className="absolute bottom-12 right-12 hidden lg:block">
        <p className="text-[10px] font-black text-white/10 uppercase tracking-[10px] rotate-90 origin-right">SABAN MATERIALS GROUP</p>
      </div>
    </section>

    {/* Values Section */}
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Engineering Excellence', desc: 'פתרונות הנדסיים מותאמים אישית לכל מפרט', icon: ShieldCheck },
          { label: 'Logistics Fleet', desc: 'מערך הפצה ארצי מהיר ומדויק עד השטח', icon: HomeIcon },
          { label: 'Premium Materials', desc: 'חומרי הגלם האיכותיים ביותר עם תקני איכות מחמירים', icon: BookOpen },
        ].map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-xl space-y-6 hover:shadow-2xl transition-all">
             <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-saban-gold">
                <item.icon className="w-7 h-7" />
             </div>
             <div className="space-y-2">
                <h4 className="text-xl font-black text-saban-blue tracking-tight">{item.label}</h4>
                <p className="text-slate-500 font-bold text-sm leading-relaxed">{item.desc}</p>
             </div>
          </div>
        ))}
      </div>
    </section>

    {/* Featured Cards - Clean White Style */}
    <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 -mt-12 relative z-20">
      <motion.div 
        whileHover={{ y: -10 }}
        className="bg-white p-12 rounded-[40px] flex flex-col justify-between group cursor-pointer border border-slate-100 shadow-2xl"
      >
        <div className="space-y-10">
           <div className="flex items-center justify-between">
             <div className="p-4 bg-saban-blue text-white rounded-3xl shadow-xl transition-all duration-500 group-hover:bg-saban-gold">
               <PlayCircle className="w-14 h-14" />
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">Media Center</span>
           </div>
           <div className="space-y-4">
             <h3 className="text-4xl font-heebo font-black text-saban-blue tracking-tighter leading-none text-right">מרכז המדיה</h3>
             <p className="text-slate-600 font-bold leading-relaxed text-lg text-right">
               סדרת סרטוני הדרכה מקצועיים על יישום חומרים מתקדמים בשטח, סקירות מוצרים וחדשות מהשטח.
             </p>
           </div>
        </div>
        <Link to="/media" className="mt-12 flex items-center gap-3 text-saban-blue font-black uppercase tracking-widest text-xs group">
          <span>לכל הסרטונים</span>
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
        </Link>
      </motion.div>

      <motion.div 
        whileHover={{ y: -10 }}
        className="bg-white p-12 rounded-[40px] flex flex-col justify-between group cursor-pointer border border-slate-100 shadow-2xl"
      >
        <div className="space-y-10">
           <div className="flex items-center justify-between">
             <div className="p-4 bg-saban-blue text-white rounded-3xl shadow-xl transition-all duration-500 group-hover:bg-saban-gold">
               <BookOpen className="w-14 h-14" />
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">Tech Academy</span>
           </div>
           <div className="space-y-4">
             <h3 className="text-4xl font-heebo font-black text-saban-blue tracking-tighter leading-none text-right">האקדמיה הטכנית</h3>
             <p className="text-slate-600 font-bold leading-relaxed text-lg text-right">
               גישה ישירה למפרטים טכניים, מצגות הדרכה ומדריכי איטום ובנייה מתקדמים המאושרים על ידי מהנדס החברה.
             </p>
           </div>
        </div>
        <Link to="/academy" className="mt-12 flex items-center gap-3 text-saban-blue font-black uppercase tracking-widest text-xs group">
          <span>למאגר המידע הטכני</span>
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
        </Link>
      </motion.div>
    </section>

    {/* Product Catalog Mockup Style */}
    <section className="container mx-auto px-4 py-24 space-y-16">
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-r-4 border-saban-gold pr-8">
        <div className="space-y-4">
          <span className="text-saban-gold font-black text-xs uppercase tracking-[6px]">Premium Catalog</span>
          <h2 className="text-5xl md:text-7xl font-heebo font-black text-saban-blue tracking-tighter">קטלוג מוצרים הנדסי</h2>
        </div>
        <p className="text-slate-400 font-bold max-w-md text-right text-lg">
          מבחר חומרי בנייה מקבוצת ח. סבן, המותאמים לסטנדרטים הבינלאומיים הגבוהים ביותר בענף הבנייה.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { 
            name: 'מלט אפור 42.5', 
            cat: 'חומרי מליטה', 
            img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400',
            price: '34.90 ₪'
          },
          { 
            name: 'ברזל בניין מעורגל', 
            cat: 'קונסטרוקציית פלדה', 
            img: 'https://images.unsplash.com/photo-1533038590840-1cde6b66b721?auto=format&fit=crop&q=80&w=400',
            price: 'הצעת מחיר'
          },
          { 
            name: 'בלוק איטונג 20', 
            cat: 'בלוקים ומוצרי בנייה', 
            img: 'https://images.unsplash.com/photo-1590069230002-70cc6944ca25?auto=format&fit=crop&q=80&w=400',
            price: '9.50 ₪'
          },
        ].map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -15 }}
            className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl hover:shadow-[0_40px_80px_rgba(30,58,138,0.15)] hover:border-saban-blue transition-all duration-500 flex flex-col"
          >
            <div className="relative h-72 overflow-hidden">
               <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute top-6 left-6">
                 <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-saban-blue uppercase tracking-widest shadow-lg">
                   {item.cat}
                 </span>
               </div>
            </div>
            <div className="p-10 flex-1 flex flex-col justify-between space-y-8">
               <div className="space-y-2">
                 <h4 className="text-2xl font-heebo font-black text-saban-blue tracking-tight text-right">{item.name}</h4>
                 <p className="text-saban-gold font-black text-xl text-right">{item.price}</p>
               </div>
               <button className="w-full py-5 bg-saban-gold text-white rounded-2xl font-black uppercase tracking-[3px] text-[10px] shadow-lg hover:bg-saban-blue transition-all duration-300">
                 Add to Order / הוסף להזמנה
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Product of Month Mini - Clean with high contrast */}
    <section className="container mx-auto px-4">
       <div className="bg-white p-10 md:p-20 rounded-[48px] flex flex-col md:flex-row items-center gap-16 border border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-saban-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
          <div className="w-64 h-64 bg-slate-50 rounded-[40px] shadow-inner border border-slate-100 flex flex-col items-center justify-center p-8 rotate-3 hover:rotate-0 transition-transform duration-700 relative z-10 ring-8 ring-white">
             <img src="https://i.postimg.cc/qqLm9M5t/Gemini-Generated-Image-gmd5k7gmd5k7gmd5.png" alt="Featured" className="w-32 opacity-20 grayscale" />
          </div>
          <div className="flex-1 space-y-8 relative z-10">
             <div className="space-y-2">
                <div className="flex items-center gap-3 text-saban-gold font-black text-xs uppercase tracking-[4px]">
                   <ShieldCheck className="w-5 h-5" />
                   מומלץ החודש
                </div>
                <h3 className="text-4xl font-heebo font-black text-saban-blue tracking-tighter text-right">דבק קרמיקה פרימיום S-100</h3>
             </div>
             <p className="text-slate-600 font-bold text-lg max-w-xl leading-relaxed text-right">
               הפתרון המושלם להדבקת אריחי ענק בפורמט גדול. גמישות גבוהה במיוחד, עמידות מקסימלית ותקן ישראלי מחמיר ליישום בטוח.
             </p>
             <button className="px-10 py-5 bg-saban-gold text-white rounded-2xl text-[10px] font-black shadow-[0_20px_40px_rgba(197,160,89,0.3)] hover:bg-saban-blue transition-all uppercase tracking-[4px]">הזמנה מהירה למחסן</button>
          </div>
       </div>
    </section>
  </div>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'ראשי', icon: HomeIcon },
    { to: '/media', label: 'מדיה', icon: PlayCircle },
    { to: '/academy', label: 'אקדמיה', icon: BookOpen },
    { to: '/chat', label: 'נועה AI', icon: MessageSquare },
    { to: '/contact', label: 'צור קשר', icon: Phone },
    { to: '/admin', label: 'ניהול', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col font-assistant">
      <nav className={cn(
        "fixed top-4 inset-x-4 z-50 transition-all duration-500 rounded-2xl",
        isScrolled ? "glass-white shadow-xl py-2" : "bg-transparent py-4"
      )}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <img 
              src="https://i.postimg.cc/qqLm9M5t/Gemini-Generated-Image-gmd5k7gmd5k7gmd5.png" 
              alt="Logo" 
              className="h-10 md:h-12 drop-shadow-md group-hover:scale-110 transition-transform"
            />
            <div className="hidden sm:block">
              <span className={cn(
                "text-xl font-heebo font-black tracking-tighter block leading-none",
                isScrolled ? "text-saban-blue" : "text-white"
              )}>ח.סבן</span>
              <span className={cn(
                "text-[8px] font-black tracking-[2px] uppercase",
                isScrolled ? "text-saban-gold" : "text-white/50"
              )}>חומרי בניין</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                className={cn(
                  "font-black text-[10px] uppercase tracking-widest transition-all px-4 py-2 rounded-xl",
                  location.pathname === link.to 
                    ? (isScrolled ? "bg-saban-blue text-white shadow-lg" : "bg-white text-saban-blue shadow-xl")
                    : (isScrolled ? "text-slate-600 hover:text-saban-blue hover:bg-slate-50" : "text-white/70 hover:text-white hover:bg-white/10")
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <Link to="/contact" className={cn(
               "hidden lg:block text-[9px] font-black uppercase tracking-[3px] py-2.5 px-6 rounded-full transition shadow-xl",
               isScrolled ? "btn-gold" : "bg-white text-saban-blue hover:bg-slate-100"
             )}>יצירת קשר</Link>
             <button 
               className={cn(
                 "md:hidden transition-colors",
                 isScrolled ? "text-saban-blue" : "text-white"
               )}
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             >
               {mobileMenuOpen ? <X /> : <Menu />}
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-6 z-[60] glass-card rounded-[40px] flex flex-col pt-24 px-10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="absolute top-8 left-8">
               <button onClick={() => setMobileMenuOpen(false)} className="text-saban-blue"><X className="w-8 h-8" /></button>
            </div>
            {navLinks.map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                onClick={() => setMobileMenuOpen(false)}
                className="py-6 text-3xl font-heebo font-black border-b border-saban-blue/5 flex items-center justify-between text-saban-blue"
              >
                <span>{link.label}</span>
                <link.icon className="opacity-20" />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="mt-20 px-6 pb-6">
        <div className="glass-card rounded-[40px] overflow-hidden">
          <div className="container mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
               <h2 className="text-4xl font-heebo font-black text-saban-blue">ח.סבן חומרי בניין</h2>
               <p className="text-slate-600 max-w-sm leading-relaxed">
                 המרכז המוביל באספקת חומרי בניין ופתרונות טכניים מתקדמים. חווית שירות דיגיטלית המשלבת ידע מעמיק ונוחות מקסימלית.
               </p>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-saban-blue/40 mb-6">ניווט</h4>
              <nav className="flex flex-col gap-4">
                {navLinks.map(l => <Link key={l.to} to={l.to} className="text-sm font-bold text-slate-700 hover:text-saban-blue transition-colors">{l.label}</Link>)}
              </nav>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-saban-blue/40 mb-6">צור קשר</h4>
              <div className="space-y-4 text-sm font-bold text-slate-700">
                <p>סניף תלפיות, ירושלים</p>
                <p>טלפון: *9420</p>
                <p>מייל: office@saban.co.il</p>
              </div>
            </div>
          </div>
          <div className="bg-saban-blue/5 py-6 px-10 text-center text-[10px] font-black text-saban-blue/40 uppercase tracking-[4px]">
            © {new Date().getFullYear()} Saban Materials Group · Digital Excellence
          </div>
        </div>
      </footer>
    </div>
  );
};

// Main App Component with Routes
function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media" element={<MediaCenter />} />
        <Route path="/academy" element={<TechAcademy />} />
        <Route path="/chat" element={<ChatHub />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
