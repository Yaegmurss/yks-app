import React, { useState, useEffect } from 'react';

const INITIAL_TEACHERS = [
  'Mert Hoca (Matematik)', 'Rehber Matematik', 'Eyüp B. (Matematik)', 'Tunç Kurt (Matematik)',
  'VIP Fizik', 'Özcan Aykın (Fizik)', 'Umut Öncül (Fizik)',
  'Görkem Şahin (Kimya)', 'Ferrum Kimya', 'Kimya Özel',
  'Dr. Biyoloji', 'Selin Hoca (Biyoloji)', 'BiyoSem',
  'Kadir Gümüş (Türkçe/Edebiyat)', 'Rüştü Hoca (Türkçe)',
  'Ramazan Yetgin (Tarih)', 'Coğrafyanın Kodları'
];

const INITIAL_BOOKS = [
  '3D Yayınları', 'Bilgi Sarmal', 'Apotemi', 'Orijinal Yayınları', 'Palme Yayınları',
  'Karekök Yayınları', 'Aydın Yayınları', 'Paraf Yayınları', 'Hız ve Renk', 'Limit Yayınları'
];

const MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const THEMES = [
  {
    id: 'slate', name: 'Gece Yarısı (Koyu)',
    bg: 'bg-slate-950', card: 'bg-slate-900/95 text-slate-100',
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white', accent: 'text-indigo-400',
    border: 'border-slate-800', input: 'bg-slate-950/90 text-white border-slate-700'
  },
  {
    id: 'zinc', name: 'Kömür Siyahı',
    bg: 'bg-zinc-950', card: 'bg-zinc-900/95 text-zinc-100',
    primary: 'bg-zinc-700 hover:bg-zinc-600 text-white', accent: 'text-zinc-300',
    border: 'border-zinc-800', input: 'bg-zinc-950/90 text-white border-zinc-700'
  },
  {
    id: 'rose', name: 'Pastel Gül',
    bg: 'bg-rose-950/40', card: 'bg-rose-950/80 text-rose-100',
    primary: 'bg-rose-600 hover:bg-rose-700 text-white', accent: 'text-rose-300',
    border: 'border-rose-900/50', input: 'bg-rose-950/90 text-rose-100 border-rose-800'
  },
  {
    id: 'emerald', name: 'Zümrüt Ormanı',
    bg: 'bg-emerald-950/40', card: 'bg-emerald-950/80 text-emerald-100',
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white', accent: 'text-emerald-300',
    border: 'border-emerald-900/50', input: 'bg-emerald-950/90 text-emerald-100 border-emerald-800'
  },
  {
    id: 'amber', name: 'Gün Batımı',
    bg: 'bg-amber-950/40', card: 'bg-amber-950/80 text-amber-100',
    primary: 'bg-amber-600 hover:bg-amber-700 text-white', accent: 'text-amber-300',
    border: 'border-amber-900/50', input: 'bg-amber-950/90 text-amber-100 border-amber-800'
  },
  {
    id: 'purple', name: 'Mor Gece',
    bg: 'bg-purple-950/40', card: 'bg-purple-950/80 text-purple-100',
    primary: 'bg-purple-600 hover:bg-purple-700 text-white', accent: 'text-purple-300',
    border: 'border-purple-900/50', input: 'bg-purple-950/90 text-purple-100 border-purple-800'
  },
  {
    id: 'cyan', name: 'Neon Mavi',
    bg: 'bg-cyan-950/40', card: 'bg-cyan-950/80 text-cyan-100',
    primary: 'bg-cyan-600 hover:bg-cyan-700 text-white', accent: 'text-cyan-300',
    border: 'border-cyan-900/50', input: 'bg-cyan-950/90 text-cyan-100 border-cyan-800'
  },
  {
    id: 'yakut', name: 'Yakut',
    bg: 'bg-rose-950/40', card: 'bg-rose-950/80 text-rose-100',
    primary: 'bg-rose-600 hover:bg-rose-700 text-white', accent: 'text-rose-300',
    border: 'border-rose-900/50', input: 'bg-rose-950/90 text-rose-100 border-rose-800'
  },
  {
    id: 'orman', name: 'Orman',
    bg: 'bg-emerald-950/40', card: 'bg-emerald-950/80 text-emerald-100',
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white', accent: 'text-emerald-300',
    border: 'border-emerald-900/50', input: 'bg-emerald-950/90 text-emerald-100 border-emerald-800'
  },
  {
    id: 'turkuaz', name: 'Turkuaz',
    bg: 'bg-teal-950/40', card: 'bg-teal-950/80 text-teal-100',
    primary: 'bg-teal-600 hover:bg-teal-700 text-white', accent: 'text-teal-300',
    border: 'border-teal-900/50', input: 'bg-teal-950/90 text-teal-100 border-teal-800'
  },
  {
    id: 'sky-light', name: 'Gökyüzü',
    bg: 'bg-sky-50/80', card: 'bg-white/90 text-sky-900',
    primary: 'bg-sky-500 hover:bg-sky-600 text-white', accent: 'text-sky-600',
    border: 'border-sky-200', input: 'bg-sky-50/50 text-sky-900 border-sky-300'
  },
  {
    id: 'cyber-pink', name: 'Neon Pembe',
    bg: 'bg-pink-950/40', card: 'bg-pink-950/80 text-pink-100',
    primary: 'bg-pink-600 hover:bg-pink-700 text-white', accent: 'text-pink-300',
    border: 'border-pink-900/50', input: 'bg-pink-950/90 text-pink-100 border-pink-800'
  },
  {
    id: 'royal-red', name: 'Kraliyet Kırmızısı',
    bg: 'bg-slate-950/40', card: 'bg-slate-900/80 text-red-100',
    primary: 'bg-red-600 hover:bg-red-700 text-white', accent: 'text-red-400',
    border: 'border-red-950/50', input: 'bg-slate-950/90 text-red-100 border-red-900'
  },
  {
    id: 'cotton-candy', name: 'Pamuk Şeker',
    bg: 'bg-pink-50/80', card: 'bg-white/90 text-sky-900',
    primary: 'bg-pink-500 hover:bg-pink-600 text-white', accent: 'text-pink-600',
    border: 'border-pink-200', input: 'bg-pink-50/50 text-sky-900 border-pink-300'
  },
  {
  id: 'cotton-candy', name: 'Pamuk Şeker',
  bg: 'bg-pink-950/20', card: 'bg-pink-950/40 text-pink-100',
  primary: 'bg-pink-600 hover:bg-pink-700 text-white', accent: 'text-pink-300',
  border: 'border-pink-900/30', input: 'bg-pink-950/50 text-pink-100 border-pink-800'
},
  {
    id: 'crimson-blue', name: 'Karmen Mavi',
    bg: 'bg-red-950/40', card: 'bg-red-950/80 text-red-100',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white', accent: 'text-blue-300',
    border: 'border-red-900/50', input: 'bg-red-950/90 text-red-100 border-red-800'
  },
  {
    id: 'blue', name: 'Okyanus',
    bg: 'bg-blue-950/40', card: 'bg-blue-950/80 text-blue-100',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white', accent: 'text-blue-300',
    border: 'border-blue-900/50', input: 'bg-blue-950/90 text-blue-100 border-blue-800'
  },
  {
    id: 'indigo', name: 'Koyu İndigo',
    bg: 'bg-indigo-950/40', card: 'bg-indigo-950/80 text-indigo-100',
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white', accent: 'text-indigo-300',
    border: 'border-indigo-900/50', input: 'bg-indigo-950/90 text-indigo-100 border-indigo-800'
  },
  {
    id: 'violet', name: 'Menekşe',
    bg: 'bg-violet-950/40', card: 'bg-violet-950/80 text-violet-100',
    primary: 'bg-violet-600 hover:bg-violet-700 text-white', accent: 'text-violet-300',
    border: 'border-violet-900/50', input: 'bg-violet-950/90 text-violet-100 border-violet-800'
  },
  {
    id: 'fuchsia', name: 'Fuşya Parlı',
    bg: 'bg-fuchsia-950/40', card: 'bg-fuchsia-950/80 text-fuchsia-100',
    primary: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white', accent: 'text-fuchsia-300',
    border: 'border-fuchsia-900/50', input: 'bg-fuchsia-950/90 text-fuchsia-100 border-fuchsia-800'
  },
  {
    id: 'pink', name: 'Pastel Pembe',
    bg: 'bg-pink-50/80', card: 'bg-white/90 text-pink-950',
    primary: 'bg-pink-500 hover:bg-pink-600 text-white', accent: 'text-pink-600',
    border: 'border-pink-200', input: 'bg-pink-50/50 text-pink-950 border-pink-300'
  },
  {
    id: 'pastel-blue', name: 'Pastel Mavi',
    bg: 'bg-blue-50/80', card: 'bg-white/90 text-blue-950',
    primary: 'bg-blue-500 hover:bg-blue-600 text-white', accent: 'text-blue-600',
    border: 'border-blue-200', input: 'bg-blue-50/50 text-blue-950 border-blue-300'
  },
  {
    id: 'teal', name: 'Koyu Teal',
    bg: 'bg-teal-950/40', card: 'bg-teal-950/80 text-teal-100',
    primary: 'bg-teal-600 hover:bg-teal-700 text-white', accent: 'text-teal-300',
    border: 'border-teal-900/50', input: 'bg-teal-950/90 text-teal-100 border-teal-800'
  },
  {
    id: 'sky', name: 'Gök Mavisi',
    bg: 'bg-sky-950/40', card: 'bg-sky-950/80 text-sky-100',
    primary: 'bg-sky-600 hover:bg-sky-700 text-white', accent: 'text-sky-300',
    border: 'border-sky-900/50', input: 'bg-sky-950/90 text-sky-100 border-sky-800'
  },
  {
    id: 'lime', name: 'Canlı Limon',
    bg: 'bg-lime-950/40', card: 'bg-lime-950/80 text-lime-100',
    primary: 'bg-lime-600 hover:bg-lime-700 text-zinc-950 font-bold', accent: 'text-lime-300',
    border: 'border-lime-900/50', input: 'bg-lime-950/90 text-lime-100 border-lime-800'
  },
  {
    id: 'pastel-yellow', name: 'Pastel Sarı',
    bg: 'bg-yellow-50/80', card: 'bg-white/90 text-yellow-950',
    primary: 'bg-yellow-500 hover:bg-yellow-600 text-white', accent: 'text-yellow-600',
    border: 'border-yellow-200', input: 'bg-yellow-50/50 text-yellow-950 border-yellow-300'
  },
  {
    id: 'orange', name: 'Turuncu Akşam',
    bg: 'bg-orange-950/40', card: 'bg-orange-950/80 text-orange-100',
    primary: 'bg-orange-600 hover:bg-orange-700 text-white', accent: 'text-orange-300',
    border: 'border-orange-900/50', input: 'bg-orange-950/90 text-orange-100 border-orange-800'
  },
  {
    id: 'red', name: 'Kan Kırmızı',
    bg: 'bg-red-950/40', card: 'bg-red-950/80 text-red-100',
    primary: 'bg-red-600 hover:bg-red-700 text-white', accent: 'text-red-300',
    border: 'border-red-900/50', input: 'bg-red-950/90 text-red-100 border-red-800'
  },
  {
    id: 'stone', name: 'Taş Gri',
    bg: 'bg-stone-950', card: 'bg-stone-900/95 text-stone-100',
    primary: 'bg-stone-700 hover:bg-stone-600 text-white', accent: 'text-stone-300',
    border: 'border-stone-800', input: 'bg-stone-950/90 text-white border-stone-700'
  },
  {
    id: 'neutral', name: 'Nötr Gri',
    bg: 'bg-neutral-950', card: 'bg-neutral-900/95 text-neutral-100',
    primary: 'bg-neutral-700 hover:bg-neutral-600 text-white', accent: 'text-neutral-300',
    border: 'border-neutral-800', input: 'bg-neutral-950/90 text-white border-neutral-700'
  },
  {
    id: 'pastel-lavender', name: 'Pastel Lavanta',
    bg: 'bg-purple-50/80', card: 'bg-white/90 text-purple-950',
    primary: 'bg-purple-500 hover:bg-purple-600 text-white', accent: 'text-purple-600',
    border: 'border-purple-200', input: 'bg-purple-50/50 text-purple-950 border-purple-300'
  },
  {
    id: 'pastel1', name: 'Pastel Lavanta(Koyu)',
    bg: 'bg-purple-950/20', card: 'bg-slate-900/90 text-purple-100',
    primary: 'bg-purple-500 hover:bg-purple-600 text-white', accent: 'text-purple-300',
    border: 'border-purple-900/30', input: 'bg-slate-950 text-purple-100 border-purple-900/40'
  },
  {
    id: 'pastel2', name: 'Pastel Mint(Koyu)',
    bg: 'bg-teal-950/20', card: 'bg-slate-900/90 text-teal-100',
    primary: 'bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold', accent: 'text-teal-300',
    border: 'border-teal-900/30', input: 'bg-slate-950 text-teal-100 border-teal-900/40'
  },
  {
    id: 'pastel-mint', name: 'Pastel Mint',
    bg: 'bg-emerald-50/80', card: 'bg-white/90 text-emerald-950',
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-white', accent: 'text-emerald-600',
    border: 'border-emerald-200', input: 'bg-emerald-50/50 text-emerald-950 border-emerald-300'
  },
  {
    id: 'pastel-peach', name: 'Pastel Şeftali',
    bg: 'bg-orange-50/80', card: 'bg-white/90 text-orange-950',
    primary: 'bg-orange-500 hover:bg-orange-600 text-white', accent: 'text-orange-600',
    border: 'border-orange-200', input: 'bg-orange-50/50 text-orange-950 border-orange-300'
  },
  {
    id: 'pastel3', name: 'Pastel Şeftali(Koyu)',
    bg: 'bg-orange-950/20', card: 'bg-slate-900/90 text-orange-100',
    primary: 'bg-orange-500 hover:bg-orange-600 text-white', accent: 'text-orange-300',
    border: 'border-orange-900/30', input: 'bg-slate-950 text-orange-100 border-orange-900/40'
  },
  {
    id: 'pastel4', name: 'Pastel Lila(Koyu)',
    bg: 'bg-indigo-950/20', card: 'bg-slate-900/90 text-indigo-100',
    primary: 'bg-indigo-500 hover:bg-indigo-600 text-white', accent: 'text-indigo-300',
    border: 'border-indigo-900/30', input: 'bg-slate-950 text-indigo-100 border-indigo-900/40'
  },
  {
    id: 'pastel-lilac', name: 'Pastel Lila',
    bg: 'bg-violet-50/80', card: 'bg-white/90 text-violet-950',
    primary: 'bg-violet-500 hover:bg-violet-600 text-white', accent: 'text-violet-600',
    border: 'border-violet-200', input: 'bg-violet-50/50 text-violet-950 border-violet-300'
  },
  {
    id: 'soft-cream', name: 'Yumuşak Krem',
    bg: 'bg-amber-50/60', card: 'bg-stone-50/90 text-stone-900',
    primary: 'bg-amber-600 hover:bg-amber-700 text-white', accent: 'text-amber-700',
    border: 'border-amber-200/80', input: 'bg-white text-stone-900 border-amber-200'
  },
  {
    id: 'deep-ocean', name: 'Koyu Deniz Mavisi',
    bg: 'bg-cyan-950/40', card: 'bg-cyan-950/80 text-cyan-100',
    primary: 'bg-cyan-600 hover:bg-cyan-700 text-white', accent: 'text-cyan-300',
    border: 'border-cyan-900/50', input: 'bg-cyan-950/90 text-cyan-100 border-cyan-800'
  }
];
function YksCountdownCard({ theme }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('June 19, 2027 10:15:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${theme.card} backdrop-blur-md p-5 rounded-2xl border ${theme.border} shadow-xl text-center space-y-3 relative z-10`}>
      <h3 className={`text-sm md:text-base font-bold ${theme.accent} uppercase tracking-wider`}>
        ⏳ 2027 YKS'ye Kalan Süre
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
        <div className={`${theme.input} border p-3 rounded-xl shadow-sm`}>
          <span className="text-2xl md:text-3xl font-black font-mono block">{timeLeft.days}</span>
          <span className="text-xs opacity-75 font-bold uppercase">Gün</span>
        </div>
        <div className={`${theme.input} border p-3 rounded-xl shadow-sm`}>
          <span className="text-2xl md:text-3xl font-black font-mono block">{timeLeft.hours}</span>
          <span className="text-xs opacity-75 font-bold uppercase">Saat</span>
        </div>
        <div className={`${theme.input} border p-3 rounded-xl shadow-sm`}>
          <span className="text-2xl md:text-3xl font-black font-mono block">{timeLeft.minutes}</span>
          <span className="text-xs opacity-75 font-bold uppercase">Dakika</span>
        </div>
        <div className={`${theme.input} border p-3 rounded-xl shadow-sm`}>
          <span className="text-2xl md:text-3xl font-black font-mono block">{timeLeft.seconds}</span>
          <span className="text-xs opacity-75 font-bold uppercase">Saniye</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('program');
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('yks_theme') || 'slate';
  });

  useEffect(() => {
    localStorage.setItem('yks_theme', currentTheme);
  }, [currentTheme]);

  const activeThemeObj = THEMES.find(t => t.id === currentTheme) || THEMES[0];

  const [customTeachers, setCustomTeachers] = useState(() => {
    const saved = localStorage.getItem('yks_customTeachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });
  const [newTeacherInput, setNewTeacherInput] = useState('');

  useEffect(() => {
    localStorage.setItem('yks_customTeachers', JSON.stringify(customTeachers));
  }, [customTeachers]);

  const addCustomTeacher = () => {
    if (!newTeacherInput.trim()) return;
    if (customTeachers.includes(newTeacherInput.trim())) return alert('Bu hoca zaten listede var.');
    setCustomTeachers([...customTeachers, newTeacherInput.trim()]);
    setNewTeacherInput('');
  };

  const removeCustomTeacher = (teacherName) => {
    setCustomTeachers(customTeachers.filter(t => t !== teacherName));
  };

  const [customBooks, setCustomBooks] = useState(() => {
    const saved = localStorage.getItem('yks_customBooks');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });
  const [newBookInput, setNewBookInput] = useState('');

  useEffect(() => {
    localStorage.setItem('yks_customBooks', JSON.stringify(customBooks));
  }, [customBooks]);

  const addCustomBook = () => {
    if (!newBookInput.trim()) return;
    if (customBooks.includes(newBookInput.trim())) return alert('Bu kaynak zaten var.');
    setCustomBooks([...customBooks, newBookInput.trim()]);
    setNewBookInput('');
  };

  const removeCustomBook = (bookName) => {
    setCustomBooks(customBooks.filter(b => b !== bookName));
  };

  const [selectedMonth, setSelectedMonth] = useState('Eylül');
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('yks_schedule');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('yks_schedule', JSON.stringify(schedule));
  }, [schedule]);

  const [formMonth, setFormMonth] = useState('Eylül');
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [formDay, setFormDay] = useState('Pazartesi');
  const [formSubject, setFormSubject] = useState('Matematik');
  const [formTeacher, setFormTeacher] = useState(customTeachers[0] || '');
  const [formBook, setFormBook] = useState('');
  const [formQuestions, setFormQuestions] = useState('');
  const [formStartTime, setFormStartTime] = useState('09:00');
  const [formEndTime, setFormEndTime] = useState('10:00');
  const [formYtUrl, setFormYtUrl] = useState('');

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return '';
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    let totalMins = (endH * 60 + endM) - (startH * 60 + startM);
    if (totalMins < 0) totalMins += 24 * 60;

    const hours = Math.floor(totalMins / 60);
    const minutes = totalMins % 60;

    if (hours > 0 && minutes > 0) return `${hours} saat ${minutes} dk`;
    if (hours > 0) return `${hours} saat`;
    return `${minutes} dk`;
  };

  const handleYtUrlChange = (val) => {
    setFormYtUrl(val);
    const lowerVal = val.toLowerCase();
    const foundTeacher = customTeachers.find(t => lowerVal.includes(t.split(' ')[0].toLowerCase()));
    if (foundTeacher) setFormTeacher(foundTeacher);
  };

  const addScheduleItem = () => {
    const usedBook = formBook.trim() || 'Genel Kaynak';

    if (!customBooks.includes(usedBook)) {
      setCustomBooks([...customBooks, usedBook]);
    }

    const durationText = calculateDuration(formStartTime, formEndTime);

    const newItem = {
      id: Date.now(),
      month: formMonth,
      date: formDate,
      day: formDay,
      subject: formSubject,
      teacher: formTeacher,
      book: usedBook,
      questions: formQuestions ? parseInt(formQuestions) : 0,
      startTime: formStartTime,
      endTime: formEndTime,
      duration: durationText,
      ytUrl: formYtUrl,
      embedUrl: getEmbedUrl(formYtUrl),
      status: 'pending'
    };

    setSchedule([...schedule, newItem]);
    setFormYtUrl('');
    setFormBook('');
    setFormQuestions('');
  };

  const removeScheduleItem = (id) => {
    setSchedule(schedule.filter(item => item.id !== id));
  };

  const [denemeType, setDenemeType] = useState('TYT');
  const [denemeTitle, setDenemeTitle] = useState('');
  const [scores, setScores] = useState({ d1: '', y1: '', d2: '', y2: '', d3: '', y3: '', d4: '', y4: '' });
  const [denemeHistory, setDenemeHistory] = useState(() => {
    const saved = localStorage.getItem('yks_denemeHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('yks_denemeHistory', JSON.stringify(denemeHistory));
  }, [denemeHistory]);

  const calcNet = (d, y) => Math.max(0, (parseFloat(d) || 0) - ((parseFloat(y) || 0) / 4));
  const currentTotalNet = calcNet(scores.d1, scores.y1) + calcNet(scores.d2, scores.y2) + calcNet(scores.d3, scores.y3) + calcNet(scores.d4, scores.y4);

  const saveDeneme = () => {
    if (!denemeTitle.trim()) return alert('Deneme adını giriniz.');
    const lessons = denemeType === 'TYT'
      ? ['Türkçe', 'Sosyal', 'Matematik', 'Fen']
      : ['Matematik', 'Fen Bilimleri', 'Ed-Sos-1', 'Sosyal-2'];

    const newEntry = {
      id: Date.now(),
      type: denemeType,
      title: denemeTitle,
      date: new Date().toISOString().split('T')[0],
      details: [
        { name: lessons[0], net: calcNet(scores.d1, scores.y1) },
        { name: lessons[1], net: calcNet(scores.d2, scores.y2) },
        { name: lessons[2], net: calcNet(scores.d3, scores.y3) },
        { name: lessons[3], net: calcNet(scores.d4, scores.y4) },
      ],
      totalNet: currentTotalNet
    };

    setDenemeHistory([...denemeHistory, newEntry]);
    setDenemeTitle('');
    setScores({ d1: '', y1: '', d2: '', y2: '', d3: '', y3: '', d4: '', y4: '' });
  };

  const removeDeneme = (id) => {
    setDenemeHistory(denemeHistory.filter(item => item.id !== id));
  };

  const resetAllData = () => {
    if (window.confirm('Tüm verileriniz silinecektir! Onaylıyor musunuz?')) {
      localStorage.clear();
      setSchedule([]);
      setDenemeHistory([]);
      setCustomBooks(INITIAL_BOOKS);
      setCustomTeachers(INITIAL_TEACHERS);
      alert('Sıfırlandı.');
    }
  };

  const [customWorkTime, setCustomWorkTime] = useState(25);
  const [customBreakTime, setCustomBreakTime] = useState(5);
  const [targetBlocks, setTargetBlocks] = useState(1);
  const [currentBlock, setCurrentBlock] = useState(1);
  const [pomodoroMode, setPomodoroMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [selectedEndSound, setSelectedEndSound] = useState('bell');

  const playSpecificSound = (soundType) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;

      if (soundType === 'bell') {
        [523.25, 659.25, 783.99].forEach((freq, index) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + index * 0.12);
          gain.gain.setValueAtTime(0, now + index * 0.12);
          gain.gain.linearRampToValueAtTime(0.3, now + index * 0.12 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.12 + 0.8);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + index * 0.12);
          osc.stop(now + index * 0.12 + 0.9);
        });
      } else if (soundType === 'digital') {
        [880, 880].forEach((freq, index) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, now + index * 0.2);
          gain.gain.setValueAtTime(0.2, now + index * 0.2);
          gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.2 + 0.15);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + index * 0.2);
          osc.stop(now + index * 0.2 + 0.2);
        });
      } else if (soundType === 'gong') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 1.5);
      }
    } catch (e) {}
  };

  const handleEndSoundChange = (e) => {
    const newSound = e.target.value;
    setSelectedEndSound(newSound);
    playSpecificSound(newSound);
  };

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      playSpecificSound(selectedEndSound);

      if (pomodoroMode === 'work') {
        if (currentBlock >= targetBlocks) {
          alert(`Tebrikler! ${targetBlocks} blokluk çalışma serisini tamamladın! 🎉`);
          setIsRunning(false);
          setPomodoroMode('work');
          setCurrentBlock(1);
          setTimeLeft(customWorkTime * 60);
        } else {
          alert(`Etüt ${currentBlock} bitti! Mola zamanı. ☕`);
          setPomodoroMode('break');
          setTimeLeft(customBreakTime * 60);
        }
      } else {
        alert(`Mola bitti! ${currentBlock + 1}. Blok Etüt Başlıyor. 💪`);
        setCurrentBlock(prev => prev + 1);
        setPomodoroMode('work');
        setTimeLeft(customWorkTime * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, pomodoroMode, currentBlock, targetBlocks, customWorkTime, customBreakTime, selectedEndSound]);

  const applyCustomPomodoroInputs = () => {
    const w = Math.max(1, parseInt(customWorkTime) || 1);
    const b = Math.max(1, parseInt(customBreakTime) || 1);
    const blk = Math.max(1, parseInt(targetBlocks) || 1);
    setCustomWorkTime(w);
    setCustomBreakTime(b);
    setTargetBlocks(blk);
    setCurrentBlock(1);
    setIsRunning(false);
    setPomodoroMode('work');
    setTimeLeft(w * 60);
  };

  const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  const monthSchedule = schedule.filter(item => item.month === selectedMonth);
  const activeDays = DAYS.filter(day => monthSchedule.some(item => item.day === day));

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen ${activeThemeObj.bg} p-3 md:p-6 font-sans transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Üst Menü */}
        <header className={`${activeThemeObj.card} backdrop-blur-md p-4 rounded-2xl border ${activeThemeObj.border} flex flex-col md:flex-row justify-between items-center gap-4 relative z-50 shadow-2xl`}>
          <div className="flex items-center gap-3">
            <h1 className={`text-xl md:text-2xl font-bold ${activeThemeObj.accent}`}>
              ⚡ YKS Çalışma Masası <span className="italic text-sm font-normal opacity-75 ml-2">By Yağmur</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className={`flex items-center gap-1 ${activeThemeObj.input} px-2 py-1 rounded-xl border`}>
              <span className="text-[10px] opacity-75">🎨 Tema:</span>
              <select
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
                className={`bg-transparent text-xs font-bold ${activeThemeObj.accent} outline-none cursor-pointer`}
              >
                {THEMES.map(t => (
                  <option key={t.id} value={t.id} className="bg-slate-900 text-white">{t.name}</option>
                ))}
              </select>
            </div>

            <button onClick={() => setActiveTab('program')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'program' ? activeThemeObj.primary : `${activeThemeObj.input} hover:opacity-100 opacity-80`}`}>📊 Program</button>
            <button onClick={() => setActiveTab('deneme')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'deneme' ? activeThemeObj.primary : `${activeThemeObj.input} hover:opacity-100 opacity-80`}`}>📈 Denemeler</button>
            <button onClick={() => setActiveTab('pomodoro')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'pomodoro' ? activeThemeObj.primary : `${activeThemeObj.input} hover:opacity-100 opacity-80`}`}>⏱️ Pomodoro / Blok</button>
            <button onClick={() => setActiveTab('kaynaklar')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'kaynaklar' ? activeThemeObj.primary : `${activeThemeObj.input} hover:opacity-100 opacity-80`}`}>📚 Kaynaklar & Hocalar</button>
            <button onClick={resetAllData} className="bg-red-600/80 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-xs font-bold border border-red-500/50">🗑️ Sıfırla</button>
          </div>
        </header>

        {/* YKS Geri Sayım Kartı */}
        <YksCountdownCard theme={activeThemeObj} />

        {/* 1. DERS PROGRAMI TABI */}
        {activeTab === 'program' && (
          <div className="space-y-6">
            <div className={`${activeThemeObj.card} p-4 rounded-2xl border ${activeThemeObj.border} flex flex-wrap justify-between items-center gap-4`}>
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-75 font-bold">📅 Görüntülenen Ay:</span>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className={`${activeThemeObj.input} border font-bold rounded-lg px-3 py-1.5 text-xs`}>
                  {MONTHS.map(m => <option key={m} value={m} className="bg-slate-900 text-white">{m} Ayı</option>)}
                </select>
              </div>
              <span className="text-xs opacity-75">Seçili ayda toplam <strong className={activeThemeObj.accent}>{monthSchedule.length}</strong> ders kaydı var.</span>
            </div>

            {/* Ders Ekleme Formu */}
            <div className={`${activeThemeObj.card} p-4 rounded-2xl border ${activeThemeObj.border} space-y-3`}>
              <h3 className={`text-xs font-bold ${activeThemeObj.accent} uppercase tracking-wider`}>➕ Ders / Video Ekle</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-2 text-xs">
                <select value={formMonth} onChange={(e) => setFormMonth(e.target.value)} className={`${activeThemeObj.input} border rounded-lg p-2 font-bold`}>
                  {MONTHS.map(m => <option key={m} value={m} className="bg-slate-900 text-white">{m} Ayı</option>)}
                </select>
                <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} className={`${activeThemeObj.input} border rounded-lg p-2`} />
                <select value={formDay} onChange={(e) => setFormDay(e.target.value)} className={`${activeThemeObj.input} border rounded-lg p-2`}>
                  {DAYS.map(d => <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>)}
                </select>
                <div className={`flex items-center gap-1 ${activeThemeObj.input} border rounded-lg p-1`}>
                  <span className="text-[10px] opacity-75 pl-1">Başla:</span>
                  <input type="time" value={formStartTime} onChange={(e) => setFormStartTime(e.target.value)} className="bg-transparent w-full outline-none text-xs" />
                </div>
                <div className={`flex items-center gap-1 ${activeThemeObj.input} border rounded-lg p-1`}>
                  <span className="text-[10px] opacity-75 pl-1">Bitiş:</span>
                  <input type="time" value={formEndTime} onChange={(e) => setFormEndTime(e.target.value)} className="bg-transparent w-full outline-none text-xs" />
                </div>
                <select value={formSubject} onChange={(e) => setFormSubject(e.target.value)} className={`${activeThemeObj.input} border rounded-lg p-2`}>
                  <option value="Matematik" className="bg-slate-900 text-white">Matematik</option>
                  <option value="Geometri" className="bg-slate-900 text-white">Geometri</option>
                  <option value="Fizik" className="bg-slate-900 text-white">Fizik</option>
                  <option value="Kimya" className="bg-slate-900 text-white">Kimya</option>
                  <option value="Biyoloji" className="bg-slate-900 text-white">Biyoloji</option>
                  <option value="Türkçe" className="bg-slate-900 text-white">Türkçe</option>
                  <option value="Tarih" className="bg-slate-900 text-white">Tarih</option>
                  <option value="Coğrafya" className="bg-slate-900 text-white">Coğrafya</option>
                </select>
                <select value={formTeacher} onChange={(e) => setFormTeacher(e.target.value)} className={`${activeThemeObj.input} border rounded-lg p-2`}>
                  {customTeachers.map(t => <option key={t} value={t} className="bg-slate-900 text-white">{t}</option>)}
                </select>
                <input type="text" placeholder="Kaynak Yazın" value={formBook} onChange={(e) => setFormBook(e.target.value)} list="books-list" className={`${activeThemeObj.input} border rounded-lg p-2`} />
                <datalist id="books-list">{customBooks.map((b, i) => <option key={i} value={b} />)}</datalist>
                <input type="number" placeholder="Soru Sayısı" value={formQuestions} onChange={(e) => setFormQuestions(e.target.value)} className={`${activeThemeObj.input} border rounded-lg p-2`} />
                <input type="text" placeholder="YouTube Linki" value={formYtUrl} onChange={(e) => handleYtUrlChange(e.target.value)} className={`${activeThemeObj.input} border rounded-lg p-2 col-span-2 md:col-span-1`} />
              </div>
              <button onClick={addScheduleItem} className={`w-full ${activeThemeObj.primary} font-bold py-2 rounded-xl text-xs shadow-md transition-all`}>Listeye Ekle</button>
            </div>

            {/* Ders Listesi */}
            <div className="space-y-4">
              {activeDays.length === 0 ? (
                <div className={`${activeThemeObj.card} p-8 rounded-2xl border ${activeThemeObj.border} text-center opacity-75 text-sm italic`}>{selectedMonth} ayı için henüz ders eklenmedi.</div>
              ) : (
                activeDays.map((day) => {
                  const dayItems = monthSchedule.filter(item => item.day === day);
                  return (
                    <div key={day} className={`${activeThemeObj.card} rounded-2xl border ${activeThemeObj.border} overflow-hidden shadow-lg`}>
                      <div className={`${activeThemeObj.input} px-4 py-2 border-b flex justify-between items-center`}>
                        <span className={`font-bold text-sm ${activeThemeObj.accent}`}>📅 {day}</span>
                        <span className="text-xs opacity-75 px-2 py-0.5 rounded-full">{dayItems.length} Ders</span>
                      </div>
                      <div className="divide-y opacity-90">
                        {dayItems.map((item) => (
                          <div key={item.id} className="p-3 md:p-4 hover:opacity-100 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`font-bold px-2 py-0.5 rounded border ${activeThemeObj.input}`}>{item.date}</span>
                                <span className={`font-mono font-bold px-2 py-0.5 rounded border ${activeThemeObj.input}`}>{item.startTime} - {item.endTime}</span>
                                {item.duration && (
                                  <span className={`font-bold px-2 py-0.5 rounded border ${activeThemeObj.input}`}>⏱️ {item.duration}</span>
                                )}
                                <span className="font-bold text-sm">{item.subject}</span>
                                <span className="opacity-75">• {item.teacher}</span>
                                {item.book && <span className="opacity-75">({item.book})</span>}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => removeScheduleItem(item.id)} className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-2 py-1 rounded text-xs transition-colors">Sil</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* 2. DENEMELER TABI */}
        {activeTab === 'deneme' && (
          <div className="space-y-6">
            <div className={`${activeThemeObj.card} p-6 rounded-2xl border ${activeThemeObj.border} space-y-4`}>
              <h3 className={`text-sm font-bold ${activeThemeObj.accent} uppercase tracking-wider`}>📈 Yeni Deneme Sonucu Ekle</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select value={denemeType} onChange={(e) => setDenemeType(e.target.value)} className={`${activeThemeObj.input} border rounded-xl p-2.5 text-xs font-bold`}>
                  <option value="TYT" className="bg-slate-900 text-white">TYT Denemesi</option>
                  <option value="AYT" className="bg-slate-900 text-white">AYT Denemesi</option>
                </select>
                <input type="text" placeholder="Deneme Adı (Örn: 3D Yayınları TYT 1)" value={denemeTitle} onChange={(e) => setDenemeTitle(e.target.value)} className={`${activeThemeObj.input} border rounded-xl p-2.5 text-xs col-span-2`} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className={`${activeThemeObj.input} border p-3 rounded-xl space-y-2`}>
                  <span className="font-bold block">{denemeType === 'TYT' ? 'Türkçe' : 'Matematik'}</span>
                  <div className="flex gap-1">
                    <input type="number" placeholder="Doğru" value={scores.d1} onChange={(e) => setScores({ ...scores, d1: e.target.value })} className="w-1/2 bg-black/30 border border-white/10 rounded p-1 text-white" />
                    <input type="number" placeholder="Yanlış" value={scores.y1} onChange={(e) => setScores({ ...scores, y1: e.target.value })} className="w-1/2 bg-black/30 border border-white/10 rounded p-1 text-white" />
                  </div>
                </div>
                <div className={`${activeThemeObj.input} border p-3 rounded-xl space-y-2`}>
                  <span className="font-bold block">{denemeType === 'TYT' ? 'Sosyal Bilimler' : 'Fen Bilimleri'}</span>
                  <div className="flex gap-1">
                    <input type="number" placeholder="Doğru" value={scores.d2} onChange={(e) => setScores({ ...scores, d2: e.target.value })} className="w-1/2 bg-black/30 border border-white/10 rounded p-1 text-white" />
                    <input type="number" placeholder="Yanlış" value={scores.y2} onChange={(e) => setScores({ ...scores, y2: e.target.value })} className="w-1/2 bg-black/30 border border-white/10 rounded p-1 text-white" />
                  </div>
                </div>
                <div className={`${activeThemeObj.input} border p-3 rounded-xl space-y-2`}>
                  <span className="font-bold block">{denemeType === 'TYT' ? 'Matematik' : 'Türk Dili ve Edebiyatı - Sosyal-1'}</span>
                  <div className="flex gap-1">
                    <input type="number" placeholder="Doğru" value={scores.d3} onChange={(e) => setScores({ ...scores, d3: e.target.value })} className="w-1/2 bg-black/30 border border-white/10 rounded p-1 text-white" />
                    <input type="number" placeholder="Yanlış" value={scores.y3} onChange={(e) => setScores({ ...scores, y3: e.target.value })} className="w-1/2 bg-black/30 border border-white/10 rounded p-1 text-white" />
                  </div>
                </div>
                <div className={`${activeThemeObj.input} border p-3 rounded-xl space-y-2`}>
                  <span className="font-bold block">{denemeType === 'TYT' ? 'Fen Bilimleri' : 'Sosyal Bilimler-2'}</span>
                  <div className="flex gap-1">
                    <input type="number" placeholder="Doğru" value={scores.d4} onChange={(e) => setScores({ ...scores, d4: e.target.value })} className="w-1/2 bg-black/30 border border-white/10 rounded p-1 text-white" />
                    <input type="number" placeholder="Yanlış" value={scores.y4} onChange={(e) => setScores({ ...scores, y4: e.target.value })} className="w-1/2 bg-black/30 border border-white/10 rounded p-1 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-bold">Hesaplanan Toplam Net: <span className={`${activeThemeObj.accent} font-mono text-base`}>{currentTotalNet.toFixed(2)}</span></span>
                <button onClick={saveDeneme} className={`${activeThemeObj.primary} px-5 py-2 rounded-xl text-xs font-bold transition-all`}>Denemeyi Kaydet</button>
              </div>
            </div>

            {/* Geçmiş Denemeler Listesi */}
            <div className="space-y-3">
              <h3 className={`text-sm font-bold ${activeThemeObj.accent}`}>Geçmiş Deneme Sonuçları</h3>
              {denemeHistory.length === 0 ? (
                <div className={`${activeThemeObj.card} p-6 rounded-2xl border ${activeThemeObj.border} text-center text-xs italic opacity-75`}>Henüz kaydedilmiş deneme yok.</div>
              ) : (
                denemeHistory.map((item) => (
                  <div key={item.id} className={`${activeThemeObj.card} p-4 rounded-xl border ${activeThemeObj.border} flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs shadow-md`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`${activeThemeObj.primary} font-bold px-2 py-0.5 rounded`}>{item.type}</span>
                        <span className="font-bold text-sm">{item.title}</span>
                        <span className="opacity-75">({item.date})</span>
                      </div>
                      <div className="flex gap-4 pt-1 flex-wrap">
                        {item.details.map((d, idx) => (
                          <span key={idx} className={`${activeThemeObj.input} border px-2 py-1 rounded`}>
                            {d.name}: <strong className={`${activeThemeObj.accent} font-mono`}>{d.net.toFixed(2)} Net</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] opacity-75 block uppercase">Toplam Net</span>
                        <span className={`text-base font-black font-mono ${activeThemeObj.accent}`}>{item.totalNet.toFixed(2)}</span>
                      </div>
                      <button onClick={() => removeDeneme(item.id)} className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white p-2 rounded-lg transition-colors">Sil</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 3. POMODORO / BLOK TABI */}
        {activeTab === 'pomodoro' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className={`${activeThemeObj.card} p-6 rounded-2xl border ${activeThemeObj.border} text-center space-y-6 shadow-xl`}>

              {/* Kullanıcı Özelleştirme Alanı */}
              <div className={`p-4 rounded-xl ${activeThemeObj.input} border space-y-3 text-left`}>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${activeThemeObj.accent}`}>⚙️ Süre ve Blok Ayarları</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] opacity-75 mb-1 font-bold">Çalışma Süresi (dk)</label>
                    <input
                      type="number"
                      min="1"
                      value={customWorkTime}
                      onChange={(e) => setCustomWorkTime(e.target.value)}
                      className={`w-full p-2 rounded-lg border bg-black/20 text-white`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] opacity-75 mb-1 font-bold">Mola Süresi (dk)</label>
                    <input
                      type="number"
                      min="1"
                      value={customBreakTime}
                      onChange={(e) => setCustomBreakTime(e.target.value)}
                      className={`w-full p-2 rounded-lg border bg-black/20 text-white`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] opacity-75 mb-1 font-bold">Blok Sayısı (Adet)</label>
                    <input
                      type="number"
                      min="1"
                      value={targetBlocks}
                      onChange={(e) => setTargetBlocks(e.target.value)}
                      className={`w-full p-2 rounded-lg border bg-black/20 text-white`}
                    />
                  </div>
                </div>
                <button
                  onClick={applyCustomPomodoroInputs}
                  className={`w-full ${activeThemeObj.primary} font-bold py-2 rounded-xl text-xs transition-all mt-2`}
                >
                  Ayarları Uygula ve Sıfırla
                </button>
              </div>

              <div className="flex justify-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${pomodoroMode === 'work' ? activeThemeObj.primary : `${activeThemeObj.input} border`}`}>
                  {pomodoroMode === 'work' ? `📚 Çalışma Etüdü (${currentBlock}/${targetBlocks})` : '☕ Dinlenme Molası'}
                </span>
              </div>

              <div className="text-6xl md:text-8xl font-black font-mono tracking-wider">
                {formatTime(timeLeft)}
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${isRunning ? 'bg-amber-600 hover:bg-amber-700 text-white' : activeThemeObj.primary}`}
                >
                  {isRunning ? 'Durdur' : 'Başlat'}
                </button>
                <button
                  onClick={() => { setIsRunning(false); setTimeLeft(pomodoroMode === 'work' ? customWorkTime * 60 : customBreakTime * 60); }}
                  className={`${activeThemeObj.input} hover:opacity-100 opacity-80 px-5 py-3 rounded-xl font-bold text-sm border transition-all`}
                >
                  Sıfırla
                </button>
              </div>

              <div className={`border-t ${activeThemeObj.border} pt-4 space-y-3 text-left`}>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${activeThemeObj.accent}`}>🔔 Etüt/Mola Bitiş Sesi (Seçerken Test Edebilirsiniz)</h4>
                <select
                  value={selectedEndSound}
                  onChange={handleEndSoundChange}
                  className={`w-full ${activeThemeObj.input} border rounded-xl p-2.5 text-xs font-bold`}
                >
                  <option value="bell" className="bg-slate-900 text-white">Yumuşak Zil Sesi (Chime)</option>
                  <option value="digital" className="bg-slate-900 text-white">Dijital Alarm</option>
                  <option value="gong" className="bg-slate-900 text-white">Zen Gong Sesi</option>
                </select>
                <p className="text-[10px] opacity-75">Açılır menüden bir ses seçtiğinizde, sesin nasıl çıktığını duymanız için anında çalacaktır.</p>
              </div>
            </div>
          </div>
        )}

        {/* 4. KAYNAKLAR & HOCALAR TABI */}
        {activeTab === 'kaynaklar' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${activeThemeObj.card} p-6 rounded-2xl border ${activeThemeObj.border} space-y-4`}>
              <h3 className={`text-sm font-bold ${activeThemeObj.accent} uppercase tracking-wider`}>👨‍🏫 Hoca Listesini Yönet</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Yeni Hoca Adı ve Dersi" value={newTeacherInput} onChange={(e) => setNewTeacherInput(e.target.value)} className={`flex-1 ${activeThemeObj.input} border rounded-xl p-2.5 text-xs`} />
                <button onClick={addCustomTeacher} className={`${activeThemeObj.primary} px-4 py-2 rounded-xl text-xs font-bold transition-all`}>Ekle</button>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {customTeachers.map((t, i) => (
                  <div key={i} className={`flex justify-between items-center ${activeThemeObj.input} border p-2 rounded-lg text-xs`}>
                    <span>{t}</span>
                    <button onClick={() => removeCustomTeacher(t)} className="text-red-400 hover:underline">Sil</button>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${activeThemeObj.card} p-6 rounded-2xl border ${activeThemeObj.border} space-y-4`}>
              <h3 className={`text-sm font-bold ${activeThemeObj.accent} uppercase tracking-wider`}>📚 Kaynak/Kitap Listesini Yönet</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Yeni Kitap / Yayın Adı" value={newBookInput} onChange={(e) => setNewBookInput(e.target.value)} className={`flex-1 ${activeThemeObj.input} border rounded-xl p-2.5 text-xs`} />
                <button onClick={addCustomBook} className={`${activeThemeObj.primary} px-4 py-2 rounded-xl text-xs font-bold transition-all`}>Ekle</button>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {customBooks.map((b, i) => (
                  <div key={i} className={`flex justify-between items-center ${activeThemeObj.input} border p-2 rounded-lg text-xs`}>
                    <span>{b}</span>
                    <button onClick={() => removeCustomBook(b)} className="text-red-400 hover:underline">Sil</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}