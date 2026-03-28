/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Clock, 
  Zap, 
  ShieldCheck, 
  ShoppingBag, 
  Package,
  Coffee,
  Home,
  Utensils,
  Moon,
  ArrowRight,
  X,
  Send,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
const VK_LINK = "https://vk.com/im?sel=-229562557";
const TELEGRAM_LINK = "https://t.me/GKNIGHT_bot";
const WHATSAPP_LINK = "https://wa.me/79186400300";

// --- Analytics ---
const trackClick = (platform: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const eventName = `click_${platform.toLowerCase().replace(/\s+/g, '_')}`;
    console.log(`Tracking event: ${eventName}`); // Debug log
    
    // Send specific event for each platform (e.g., click_whatsapp, click_telegram)
    (window as any).gtag('event', eventName, {
      'event_category': 'engagement',
      'event_label': `Order via ${platform}`
    });

    // Also keep the general event with parameters for advanced reporting
    (window as any).gtag('event', 'messenger_interaction', {
      'platform': platform,
      'event_category': 'engagement'
    });
  } else {
    console.warn('Google Analytics (gtag) not found');
  }
};

// --- Components ---

const Button = ({ 
  children, 
  className = '', 
  variant = 'primary',
  href
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
}) => {
  const baseStyles = "px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 text-center";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    secondary: "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20",
    outline: "border border-white/10 bg-white/5 hover:bg-white/10 text-white"
  };

  const content = (
    <motion.div whileHover={{ y: -2 }} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </motion.div>
  );

  if (href) {
    return <a href={href} target={href.startsWith('http') ? "_blank" : undefined} rel="noopener noreferrer" className="block w-full sm:w-auto">{content}</a>;
  }

  return <button className="block w-full sm:w-auto">{content}</button>;
};

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-zinc-400 max-w-2xl mx-auto text-lg"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const LegalModal = ({ isOpen, onClose, title, content }: { isOpen: boolean; onClose: () => void; title: string; content: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <h3 className="text-2xl font-bold mb-6">{title}</h3>
          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4">
            {content}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Заказать доставку</h3>
            <p className="text-zinc-400 text-sm">Выберите удобный мессенджер</p>
          </div>

          <div className="space-y-3">
            <a 
              href={VK_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackClick('VK')}
              className="flex items-center gap-4 p-4 rounded-2xl bg-blue-400/10 border border-blue-400/20 hover:bg-blue-400/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-400 flex items-center justify-center text-white shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
                <MessageSquare size={24} />
              </div>
              <div className="font-bold text-zinc-200">ВКонтакте</div>
            </a>

            <a 
              href={TELEGRAM_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackClick('Telegram')}
              className="flex items-center gap-4 p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
                <Send size={24} />
              </div>
              <div className="font-bold text-blue-400">Telegram</div>
            </a>

            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackClick('WhatsApp')}
              className="flex items-center gap-4 p-4 rounded-2xl bg-green-600/10 border border-green-500/20 hover:bg-green-600/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-900/20 group-hover:scale-110 transition-transform">
                <MessageCircle size={24} />
              </div>
              <div className="font-bold text-green-400">WhatsApp</div>
            </a>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- Main App ---

export default function App() {
  const [activeLegal, setActiveLegal] = useState<'offer' | 'return' | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const advantages = [
    { icon: <Zap className="text-yellow-400" />, title: "Доставка до 30 минут", desc: "Стараемся собрать и привезти ваш заказ максимально быстро после подтверждения." },
    { icon: <Clock className="text-blue-400" />, title: "Ваш личный шоппер", desc: "Мы идем в магазин вместо вас, выбираем лучшие товары и привозим их прямо к двери." },
    { icon: <MessageCircle className="text-green-400" />, title: "Сразу отвечаем", desc: "Наши операторы на связи до 03:00. Пишите в любой мессенджер — ответим мгновенно." },
    { icon: <ShieldCheck className="text-purple-400" />, title: "Помощь в нужное время", desc: "Выручаем, когда товары первой необходимости нужны срочно. Честно и прозрачно." }
  ];

  const steps = [
    { number: "01", title: "Свяжитесь с нами", desc: "Напишите список нужных товаров в любой удобный мессенджер." },
    { number: "02", title: "Мы идем в магазин", desc: "Курьер отправляется в ближайший открытый магазин и проверяет наличие товаров." },
    { number: "03", title: "Оплата по чеку", desc: "Вы переводите средства за покупки по чеку из магазина + стоимость доставки." },
    { number: "04", title: "Доставка", desc: "Сразу после покупки курьер привозит товары прямо к вашему дому." }
  ];

  const categories = [
    { icon: <Utensils size={20} />, name: "Доставка из Rostic's" },
    { icon: <Utensils size={20} />, name: "Продукты первой необходимости" },
    { icon: <Coffee size={20} />, name: "Снеки и перекусы" },
    { icon: <ShoppingBag size={20} />, name: "Напитки" },
    { icon: <Package size={20} />, name: "Бытовые мелочи" },
    { icon: <Home size={20} />, name: "Товары для дома" },
    { icon: <Zap size={20} />, name: "Срочные товары" }
  ];

  return (
    <div className="min-h-screen selection:bg-blue-500/30">
      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        
        {/* Decorative Moon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, x: 100, y: -100 }}
          animate={{ 
            opacity: 0.4, 
            scale: 1, 
            x: 0, 
            y: 0,
            transition: { duration: 2, ease: "easeOut" }
          }}
          className="absolute top-12 md:top-20 right-4 md:right-[20%] z-0 pointer-events-none"
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative"
          >
            {/* The Moon Shape */}
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-100 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-400/20 blur-xl" />
              {/* Craters/Texture */}
              <div className="absolute top-4 left-6 w-4 h-4 rounded-full bg-blue-900/10" />
              <div className="absolute top-12 left-10 w-6 h-6 rounded-full bg-blue-900/10" />
              <div className="absolute top-16 left-4 w-3 h-3 rounded-full bg-blue-900/10" />
            </div>
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-full bg-blue-400/10 blur-3xl -z-10 scale-150" />
          </motion.div>
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium">
              <Clock size={16} />
              <span>Доставка с 22:00 до 03:00 в Горячем Ключе</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]"
          >
            GK Night — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">ночная доставка продуктов</span> до 30 минут
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4 mb-12"
          >
            <button 
              onClick={() => {
                setIsContactOpen(true);
                trackClick('Hero CTA');
              }} 
              className="block w-full sm:w-auto"
            >
              <motion.div 
                whileHover={{ y: -2, scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="px-8 py-5 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 text-center bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 min-w-[280px] text-xl"
              >
                <MessageCircle size={24} />
                Заказать доставку
              </motion.div>
            </button>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-blue-400/80 text-sm font-semibold"
            >
              <Zap size={14} className="fill-blue-400" />
              <span>Мы только запустились — работаем максимально быстро!</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-zinc-500 text-sm font-medium"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Быстро отвечаем
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Работаем по Горячему Ключу
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              Удобно заказать ночью
            </div>
          </motion.div>
        </div>
      </header>

      {/* Advantages */}
      <section className="py-24 px-6 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="Почему выбирают нас" 
            subtitle="Мы создали сервис, который решает ваши проблемы здесь и сейчас. Без лишних сложностей."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.3)" }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.1,
                  borderColor: { duration: 0.3 }
                }}
                className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 transition-colors cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {adv.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{adv.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="Как сделать заказ" 
            subtitle="Всего 4 простых шага, чтобы нужные товары оказались у вас."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent -translate-y-12" />
            
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6 text-blue-400 font-bold text-xl glow-blue">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-zinc-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-6 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto">
          <SectionTitle 
            title="Что можно заказать" 
            subtitle="Мы доставим всё, что может срочно понадобиться вечером или ночью."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/80 border border-white/5 transition-colors cursor-default"
              >
                <div className="text-blue-400">
                  {cat.icon}
                </div>
                <span className="font-medium text-zinc-200">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Night Delivery */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative p-12 md:p-20 rounded-[40px] bg-gradient-to-br from-zinc-900 to-black border border-white/10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] -mr-48 -mt-48" />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                Когда магазины закрыты, <br />
                <span className="text-blue-400">мы всегда рядом.</span>
              </h2>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                Закончились продукты? Нужно что-то срочно для дома или захотелось перекусить? Мы поможем с доставкой доступных товаров первой необходимости, включая блюда из <strong>Rostic's</strong>. GK Night — ваш помощник в ночное время, когда важен комфорт и скорость.
              </p>
              <div className="flex items-center gap-4 text-white font-semibold">
                <motion.div 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center"
                >
                  <ArrowRight size={24} />
                </motion.div>
                <span>Ваш комфорт — наша работа</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Готовы сделать заказ?</h2>
            <p className="text-xl text-zinc-400 mb-12">
              Отвечаем мгновенно и сразу принимаем заявку в работу.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => {
                    setIsContactOpen(true);
                    trackClick('Final CTA');
                  }} 
                  className="block w-full sm:w-auto"
                >
                  <motion.div 
                    whileHover={{ y: -2, scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 text-center bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 w-full sm:min-w-[320px] text-2xl"
                  >
                    <MessageCircle size={28} />
                    Заказать доставку
                  </motion.div>
                </button>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-blue-400/80 text-sm font-semibold">
                    <Zap size={14} className="fill-blue-400" />
                    <span>Мы только запустились — работаем максимально быстро!</span>
                  </div>
                  <span className="text-zinc-500 text-xs">ВК, Телеграм, WhatsApp</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-2 tracking-tighter">GK Night</h3>
              <p className="text-zinc-500 text-sm">Сервис ночной доставки в Горячем Ключе (22:00 – 03:00)</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-zinc-400">
              <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors cursor-pointer">Заказать</button>
              <a href={TELEGRAM_LINK} className="hover:text-white transition-colors">Telegram</a>
              <a href={WHATSAPP_LINK} className="hover:text-white transition-colors">WhatsApp</a>
              <button onClick={() => setActiveLegal('offer')} className="hover:text-white transition-colors cursor-pointer">Оферта</button>
              <button onClick={() => setActiveLegal('return')} className="hover:text-white transition-colors cursor-pointer">Политика возврата</button>
            </div>
          </div>
          
          <div className="text-center text-zinc-600 text-[10px] mt-8 max-w-2xl mx-auto leading-relaxed">
            * WhatsApp принадлежит компании Meta, признанной экстремистской организацией и запрещенной в РФ.
          </div>
          
          <div className="text-center text-zinc-600 text-xs mt-4">
            © {new Date().getFullYear()} GK Night. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <LegalModal 
        isOpen={activeLegal === 'offer'} 
        onClose={() => setActiveLegal(null)}
        title="Условия оказания услуг (Оферта)"
        content={
          <>
            <p>Настоящий документ определяет порядок оказания услуг сервисом «GK Night».</p>
            <h4 className="text-white font-bold mt-4">1. Предмет услуг</h4>
            <p>Сервис оказывает услуги по поручению клиента: поиск, приобретение и доставка товаров из розничных магазинов и заведений общественного питания. Мы являемся курьерской службой-посредником.</p>
            <h4 className="text-white font-bold mt-4">2. Подтверждение заказа</h4>
            <p>Заказ считается принятым к исполнению только после того, как оператор подтвердит в переписке. Мы согласуем наличие товаров, итоговую стоимость и время доставки.</p>
            <h4 className="text-white font-bold mt-4">3. Порядок оплаты</h4>
            <p>Оплата производится дистанционным способом после того, как курьер в торговой точке подтвердит наличие и точную стоимость товаров. Клиент обязан перевести полную сумму (стоимость товаров + услуги доставки), после чего курьер завершает покупку и осуществляет доставку по адресу.</p>
            <h4 className="text-white font-bold mt-4">4. Ограничения</h4>
            <p>Мы не осуществляем доставку алкогольной продукции, табачных изделий и иных товаров, дистанционная продажа которых запрещена. Сервис вправе отказать в выполнении заказа без объяснения причин до момента его подтверждения.</p>
          </>
        }
      />

      <LegalModal 
        isOpen={activeLegal === 'return'} 
        onClose={() => setActiveLegal(null)}
        title="Порядок отмены и возврата"
        content={
          <>
            <p>Мы ценим ваше время и просим ответственно относиться к оформлению заказов.</p>
            <h4 className="text-white font-bold mt-4">1. Клиент не выходит на связь</h4>
            <p>Если курьер прибыл по указанному адресу, но клиент не отвечает на звонки или сообщения в течение 10 минут, заказ считается отмененным по вине клиента. В этом случае услуги по доставке считаются оказанными и подлежат оплате в полном объеме.</p>
            <h4 className="text-white font-bold mt-4">2. Ошибки в адресе и данных</h4>
            <p>В случае указания клиентом неверного адреса или некорректных контактных данных, повлекших невозможность доставки, клиент обязан оплатить выезд курьера. Повторная доставка по исправленному адресу оплачивается как новый заказ.</p>
            <h4 className="text-white font-bold mt-4">3. Отказ от заказа и возврат средств</h4>
            <p>Отказ от заказа возможен до момента совершения покупки курьером в магазине. В этом случае предоплата возвращается в полном объеме. Если покупка уже совершена, возврат средств не производится, а клиент обязан принять товар или компенсировать расходы сервиса.</p>
            <h4 className="text-white font-bold mt-4">4. Качество товаров</h4>
            <p>При обнаружении повреждений товара, возникших в процессе доставки, сервис обязуется произвести замену товара или вернуть его стоимость.</p>
          </>
        }
      />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      {/* Sticky Floating Button */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end gap-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1 }}
          className="pointer-events-auto relative"
        >
          <button
            onClick={() => setIsContactOpen(true)}
            className="group relative flex items-center justify-center h-16 sm:h-20 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-600/40 hover:bg-blue-500 transition-all active:scale-95 px-6 sm:px-8 gap-3"
          >
            {/* Custom Pulsing effect */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-blue-600 opacity-20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <MessageCircle size={28} className="relative z-10 group-hover:scale-110 transition-transform" />
            <span className="relative z-10 font-bold text-lg sm:text-xl">Заказать</span>
          </button>

          {/* Discount Badge */}
          <motion.div 
            initial={{ rotate: -12, scale: 0 }}
            animate={{ 
              rotate: [-12, -10, -12],
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              initial: {
                delay: 2,
                type: "spring"
              }
            }}
            className="absolute -top-4 -left-4 bg-yellow-400 text-black px-3 py-1 rounded-lg text-[10px] font-black shadow-[0_10px_20px_rgba(250,204,21,0.4)] border-2 border-black z-20 whitespace-nowrap select-none"
          >
            СКИДКА НА 1-Й ЗАКАЗ!
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Bottom Bar (Alternative for mobile if preferred, but sticky button is good too) */}
      {/* Here we just use the sticky button for both as requested, but adjusted position slightly */}
    </div>
  );
}
