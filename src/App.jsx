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

// 25 Genişletilmiş Tema (Açık, Pastel, Canlı ve Koyu Tonlar - Kart renkleriyle tam uyumlu)
const THEMES = [
  {
    name: 'Klasik Koyu (Slate)',
    bg: 'bg-slate-900',
    card: 'bg-slate-800/95',
    subCard: 'bg-slate-900/90',
    border: 'border-slate-700',
    text: 'text-indigo-400'
  },
  {
    name: 'Ferah Pastel Mavi',
    bg: 'bg-sky-50',
    card: 'bg-white/95',
    subCard: 'bg-sky-100/60',
    border: 'border-sky-200',
    text: 'text-sky-700'
  },
  {
    name: 'Tatlı Pastel Pembe',
    bg: 'bg-pink-50',
    card: 'bg-white/95',
    subCard: 'bg-pink-100/60',
    border: 'border-pink-200',
    text: 'text-pink-700'
  },
  {
    name: 'Mint Yeşili',
    bg: 'bg-emerald-50',
    card: 'bg-white/95',
    subCard: 'bg-emerald-100/60',
    border: 'border-emerald-200',
    text: 'text-emerald-700'
  },
  {
    name: 'Güneşli Pastel Sarı',
    bg: 'bg-amber-50',
    card: 'bg-white/95',
    subCard: 'bg-amber-100/60',
    border: 'border-amber-200',
    text: 'text-amber-700'
  },
  {
    name: 'Lavanta Moru',
    bg: 'bg-purple-50',
    card: 'bg-white/95',
    subCard: 'bg-purple-100/60',
    border: 'border-purple-200',
    text: 'text-purple-700'
  },
  {
    name: 'Gece Mavisi',
    bg: 'bg-gray-950',
    card: 'bg-gray-900/95',
    subCard: 'bg-gray-950/90',
    border: 'border-gray-800',
    text: 'text-blue-400'
  },
  {
    name: 'Koyu Mor',
    bg: 'bg-purple-950',
    card: 'bg-purple-900/95',
    subCard: 'bg-purple-950/90',
    border: 'border-purple-800',
    text: 'text-purple-300'
  },
  {
    name: 'Derin İndigo',
    bg: 'bg-indigo-950',
    card: 'bg-indigo-900/95',
    subCard: 'bg-indigo-950/90',
    border: 'border-indigo-800',
    text: 'text-indigo-300'
  },
  {
    name: 'Zümrüt Siyahı',
    bg: 'bg-emerald-950',
    card: 'bg-emerald-900/95',
    subCard: 'bg-emerald-950/90',
    border: 'border-emerald-800',
    text: 'text-emerald-300'
  },
  {
    name: 'Koyu Gül Kurusu',
    bg: 'bg-rose-950',
    card: 'bg-rose-900/95',
    subCard: 'bg-rose-950/90',
    border: 'border-rose-800',
    text: 'text-rose-300'
  },
  {
    name: 'Obsidyen',
    bg: 'bg-neutral-900',
    card: 'bg-neutral-800/95',
    subCard: 'bg-neutral-900/90',
    border: 'border-neutral-700',
    text: 'text-amber-400'
  },
  {
    name: 'Saf Gece Siyahı',
    bg: 'bg-black',
    card: 'bg-zinc-900/95',
    subCard: 'bg-black/90',
    border: 'border-zinc-800',
    text: 'text-zinc-300'
  },
  {
    name: 'Koyu Kırmızı Kanvas',
    bg: 'bg-red-950',
    card: 'bg-red-900/95',
    subCard: 'bg-red-950/90',
    border: 'border-red-800',
    text: 'text-red-300'
  },
  {
    name: 'Derin Amber',
    bg: 'bg-amber-950',
    card: 'bg-amber-900/95',
    subCard: 'bg-amber-950/90',
    border: 'border-amber-800',
    text: 'text-amber-300'
  },
  {
    name: 'Koyu Turkuaz',
    bg: 'bg-teal-950',
    card: 'bg-teal-900/95',
    subCard: 'bg-teal-950/90',
    border: 'border-teal-800',
    text: 'text-teal-300'
  },
  {
    name: 'Koyu Fuşya',
    bg: 'bg-fuchsia-950',
    card: 'bg-fuchsia-900/95',
    subCard: 'bg-fuchsia-950/90',
    border: 'border-fuchsia-800',
    text: 'text-fuchsia-300'
  },
  {
    name: 'Koyu Limon',
    bg: 'bg-lime-950',
    card: 'bg-lime-900/95',
    subCard: 'bg-lime-950/90',
    border: 'border-lime-800',
    text: 'text-lime-300'
  },
  {
    name: 'Koyu Askeri Yeşil',
    bg: 'bg-green-950',
    card: 'bg-green-900/95',
    subCard: 'bg-green-950/90',
    border: 'border-green-800',
    text: 'text-green-300'
  },
  {
    name: 'Koyu Sarı Ton',
    bg: 'bg-yellow-950',
    card: 'bg-yellow-900/95',
    subCard: 'bg-yellow-950/90',
    border: 'border-yellow-800',
    text: 'text-yellow-300'
  },
  {
    name: 'Gümüş Gri',
    bg: 'bg-slate-200',
    card: 'bg-white/95',
    subCard: 'bg-slate-100',
    border: 'border-slate-300',
    text: 'text-slate-800'
  },
  {
    name: 'Koyu Deniz Mavisi',
    bg: 'bg-sky-950',
    card: 'bg-sky-900/95',
    subCard: 'bg-sky-950/90',
    border: 'border-sky-800',
    text: 'text-sky-300'
  },
  {
    name: 'Gece Menekşesi',
    bg: 'bg-purple-900',
    card: 'bg-purple-800/95',
    subCard: 'bg-purple-950/90',
    border: 'border-purple-700',
    text: 'text-pink-300'
  },
  {
    name: 'Krem & Kahve',
    bg: 'bg-stone-100',
    card: 'bg-white/95',
    subCard: 'bg-stone-200/70',
    border: 'border-stone-300',
    text: 'text-stone-800'
  },
  {
    name: 'Pastel Turuncu',
    bg: 'bg-orange-50',
    card: 'bg-white/95',
    subCard: 'bg-orange-100/60',
    border: 'border-orange-200',
    text: 'text-orange-700'
  }
];

// Geri Sayım Bileşeni
function YksCountdownCard({ currentTheme }) {
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

  const isLight = currentTheme.bg.includes('-50') || currentTheme.bg.includes('-100') || currentTheme.bg.includes('slate-200');

  return (
    <div className={`${currentTheme.card} backdrop-blur-md p-5 rounded-2xl border ${currentTheme.border} shadow-xl text-center space-y-3 relative z-10`}>
      <h3 className={`text-sm md:text-base font-bold ${currentTheme.text} uppercase tracking-wider`}>
        ⏳ 2027 YKS'ye Kalan Süre
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
        <div className={`${currentTheme.subCard} border ${currentTheme.border} p-3 rounded-xl`}>
          <span className={`text-2xl md:text-3xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'} block`}>{timeLeft.days}</span>
          <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} font-bold uppercase`}>Gün</span>
        </div>
        <div className={`${currentTheme.subCard} border ${currentTheme.border} p-3 rounded-xl`}>
          <span className={`text-2xl md:text-3xl font-black font-mono ${isLight ? 'text-sky-700' : 'text-indigo-300'} block`}>{timeLeft.hours}</span>
          <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} font-bold uppercase`}>Saat</span>
        </div>
        <div className={`${currentTheme.subCard} border ${currentTheme.border} p-3 rounded-xl`}>
          <span className={`text-2xl md:text-3xl font-black font-mono ${isLight ? 'text-purple-700' : 'text-purple-300'} block`}>{timeLeft.minutes}</span>
          <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} font-bold uppercase`}>Dakika</span>
        </div>
        <div className={`${currentTheme.subCard} border ${currentTheme.border} p-3 rounded-xl`}>
          <span className={`text-2xl md:text-3xl font-black font-mono ${isLight ? 'text-emerald-700' : 'text-emerald-300'} block`}>{timeLeft.seconds}</span>
          <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} font-bold uppercase`}>Saniye</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('program');
  const [themeIndex, setThemeIndex] = useState(() => {
    const saved = localStorage.getItem('yks_themeIndex');
    return saved !== null ? parseInt(saved) : 0;
  });
  const [showColorPicker, setShowColorPicker] = useState(false);

  const currentTheme = THEMES[themeIndex] || THEMES[0];
  const isLight = currentTheme.bg.includes('-50') || currentTheme.bg.includes('-100') || currentTheme.bg.includes('slate-200');

  useEffect(() => {
    localStorage.setItem('yks_themeIndex', themeIndex);
  }, [themeIndex]);

  // Özel Hocalar Yönetimi
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

  // Özel Kaynaklar Yönetimi
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

  const handleOpenYoutube = (url) => {
    if (!url) return;
    const onay = window.confirm("YouTube'a gitmek istiyor musunuz?");
    if (onay) {
      window.open(url, '_blank');
    }
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

  const toggleItemStatus = (id, newStatus) => {
    setSchedule(schedule.map(item => item.id === id ? { ...item, status: newStatus } : item));
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

  const playNiceBellSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;

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
    } catch (e) {}
  };

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      playNiceBellSound();

      if (pomodoroMode === 'work') {
        if (currentBlock < targetBlocks) {
          alert(`Etüt ${currentBlock} bitti! Mola zamanı. ☕`);
          setPomodoroMode('break');
          setTimeLeft(customBreakTime * 60);
        } else {
          alert(`Tebrikler! ${targetBlocks} blokluk çalışma serisini tamamladın! 🎉`);
          setIsRunning(false);
          setPomodoroMode('work');
          setCurrentBlock(1);
          setTimeLeft(customWorkTime * 60);
        }
      } else {
        alert(`Mola bitti! ${currentBlock + 1}. Blok Etüt Başlıyor. 💪`);
        setCurrentBlock(prev => prev + 1);
        setPomodoroMode('work');
        setTimeLeft(customWorkTime * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, pomodoroMode, currentBlock, targetBlocks, customWorkTime, customBreakTime]);

  const applyCustomPomodoro = (workMins, breakMins, blocks = targetBlocks) => {
    const w = Math.max(1, parseInt(workMins) || 1);
    const b = Math.max(1, parseInt(breakMins) || 1);
    const blk = Math.max(1, parseInt(blocks) || 1);
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
    <div className={`min-h-screen ${currentTheme.bg} ${isLight ? 'text-slate-900' : 'text-white'} p-3 md:p-6 font-sans transition-colors duration-300 relative`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Üst Menü */}
        <header className={`${currentTheme.card} backdrop-blur-md p-4 rounded-2xl border ${currentTheme.border} flex flex-col md:flex-row justify-between items-center gap-4 relative z-50 shadow-2xl`}>
          <div className="flex items-center gap-3">
            <h1 className={`text-xl md:text-2xl font-bold ${currentTheme.text}`}>
              ⚡ YKS Çalışma Masası <span className={`italic text-sm font-normal ${isLight ? 'text-slate-600' : 'text-slate-400'} ml-2`}>By Yağmur</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setActiveTab('program')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'program' ? 'bg-indigo-600 text-white' : `${isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-900 text-slate-400'}`}`}>📊 Program</button>
            <button onClick={() => setActiveTab('deneme')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'deneme' ? 'bg-indigo-600 text-white' : `${isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-900 text-slate-400'}`}`}>📈 Denemeler</button>
            <button onClick={() => setActiveTab('pomodoro')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'pomodoro' ? 'bg-indigo-600 text-white' : `${isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-900 text-slate-400'}`}`}>⏱️ Pomodoro / Blok</button>
            <button onClick={() => setActiveTab('kaynaklar')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'kaynaklar' ? 'bg-indigo-600 text-white' : `${isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-900 text-slate-400'}`}`}>📚 Kaynaklar & Hocalar</button>

            {/* Tema Seçici Butonu */}
            <div className="relative">
              <button onClick={() => setShowColorPicker(!showColorPicker)} className={`${isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-300' : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'} px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1`}>
                🎨 Tema ({currentTheme.name})
              </button>
              {showColorPicker && (
                <div className={`absolute right-0 mt-2 w-60 max-h-80 overflow-y-auto ${isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-slate-700'} border rounded-xl p-2 shadow-2xl z-50 space-y-1`}>
                  <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'} font-bold block px-2 pb-1 uppercase tracking-wider`}>25 Farklı Tema Seçeneği</span>
                  {THEMES.map((th, idx) => (
                    <button key={idx} onClick={() => { setThemeIndex(idx); setShowColorPicker(false); }} className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium ${isLight ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-700 text-slate-300'} flex items-center gap-2 ${themeIndex === idx ? 'bg-indigo-600 text-white' : ''}`}>
                      <span className={`w-3 h-3 rounded-full ${th.bg} border ${th.border} inline-block shrink-0`}></span>
                      <span className="truncate">{th.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={resetAllData} className="bg-red-600/80 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-xs font-bold border border-red-500/50">🗑️ Sıfırla</button>
          </div>
        </header>

        {/* YKS Geri Sayım Kartı */}
        <YksCountdownCard currentTheme={currentTheme} />

        {/* 1. DERS PROGRAMI TABI */}
        {activeTab === 'program' && (
          <div className="space-y-6">
            <div className={`${currentTheme.card} p-4 rounded-2xl border ${currentTheme.border} flex flex-wrap justify-between items-center gap-4`}>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} font-bold`}>📅 Görüntülenen Ay:</span>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className={`${isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-indigo-950 border-indigo-700 text-indigo-300'} font-bold rounded-lg px-3 py-1.5 text-xs`}>
                  {MONTHS.map(m => <option key={m} value={m}>{m} Ayı</option>)}
                </select>
              </div>
              <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Seçili ayda toplam <strong>{monthSchedule.length}</strong> ders kaydı var.</span>
            </div>

            {/* Ders Ekleme Formu */}
            <div className={`${currentTheme.card} p-4 rounded-2xl border ${currentTheme.border} space-y-3`}>
              <h3 className={`text-xs font-bold ${currentTheme.text} uppercase tracking-wider`}>➕ Ders / Video Ekle</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-2 text-xs">
                <select value={formMonth} onChange={(e) => setFormMonth(e.target.value)} className={`${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2 font-bold ${currentTheme.text}`}>
                  {MONTHS.map(m => <option key={m} value={m}>{m} Ayı</option>)}
                </select>
                <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} className={`${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2`} />
                <select value={formDay} onChange={(e) => setFormDay(e.target.value)} className={`${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2`}>
                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <div className={`flex items-center gap-1 ${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-1`}>
                  <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'} pl-1`}>Başla:</span>
                  <input type="time" value={formStartTime} onChange={(e) => setFormStartTime(e.target.value)} className="bg-transparent w-full outline-none text-xs" />
                </div>
                <div className={`flex items-center gap-1 ${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-1`}>
                  <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'} pl-1`}>Bitiş:</span>
                  <input type="time" value={formEndTime} onChange={(e) => setFormEndTime(e.target.value)} className="bg-transparent w-full outline-none text-xs" />
                </div>
                <select value={formSubject} onChange={(e) => setFormSubject(e.target.value)} className={`${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2`}>
                  <option value="Matematik">Matematik</option><option value="Geometri">Geometri</option><option value="Fizik">Fizik</option><option value="Kimya">Kimya</option><option value="Biyoloji">Biyoloji</option><option value="Türkçe">Türkçe</option><option value="Tarih">Tarih</option><option value="Coğrafya">Coğrafya</option>
                </select>
                <select value={formTeacher} onChange={(e) => setFormTeacher(e.target.value)} className={`${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2`}>
                  {customTeachers.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input type="text" placeholder="Kaynak Yazın" value={formBook} onChange={(e) => setFormBook(e.target.value)} list="books-list" className={`${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2`} />
                <datalist id="books-list">{customBooks.map((b, i) => <option key={i} value={b} />)}</datalist>
                <input type="number" placeholder="Soru Sayısı" value={formQuestions} onChange={(e) => setFormQuestions(e.target.value)} className={`${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2`} />
                <input type="text" placeholder="YouTube Linki" value={formYtUrl} onChange={(e) => handleYtUrlChange(e.target.value)} className={`${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2 col-span-2 md:col-span-1`} />
              </div>
              <button onClick={addScheduleItem} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs">Listeye Ekle</button>
            </div>

            {/* Ders Listesi */}
            <div className="space-y-4">
              {activeDays.length === 0 ? (
                <div className={`${currentTheme.card} p-8 rounded-2xl border ${currentTheme.border} text-center ${isLight ? 'text-slate-500' : 'text-slate-400'} text-sm italic`}>{selectedMonth} ayı için henüz ders eklenmedi.</div>
              ) : (
                activeDays.map((day) => {
                  const dayItems = monthSchedule.filter(item => item.day === day);
                  return (
                    <div key={day} className={`${currentTheme.card} rounded-2xl border ${currentTheme.border} overflow-hidden shadow-lg`}>
                      <div className={`${currentTheme.subCard} px-4 py-2 border-b ${currentTheme.border} flex justify-between items-center`}>
                        <span className={`font-bold text-sm ${currentTheme.text}`}>📅 {day}</span>
                        <span className={`text-xs ${isLight ? 'text-slate-600 bg-slate-200' : 'text-slate-400 bg-slate-800'} px-2 py-0.5 rounded-full`}>{dayItems.length} Ders</span>
                      </div>
                      <div className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-700/60'}`}>
                        {dayItems.map((item) => (
                          <div key={item.id} className={`p-3 md:p-4 ${isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-800/50'} flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs`}>
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="bg-purple-900/20 text-purple-600 font-bold px-2 py-0.5 rounded border border-purple-300">{item.date}</span>
                                <span className="bg-indigo-900/20 text-indigo-600 font-mono font-bold px-2 py-0.5 rounded border border-indigo-300">{item.startTime} - {item.endTime}</span>
                                {item.duration && (
                                  <span className="bg-amber-900/25 text-amber-700 font-bold px-2 py-0.5 rounded border border-amber-300">⏱️ {item.duration}</span>
                                )}
                                <span className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.subject}</span>
                                <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>({item.teacher})</span>
                              </div>
                              <div className={`${isLight ? 'text-slate-600' : 'text-slate-400'} flex flex-wrap gap-3 pt-1`}>
                                <span>📖 Kaynak: <strong className={isLight ? 'text-slate-900' : 'text-slate-200'}>{item.book}</strong></span>
                                <span>✏️ Soru Sayısı: <strong className="text-emerald-600">{item.questions > 0 ? `${item.questions} Soru` : 'Belirtilmedi'}</strong></span>
                                {item.ytUrl && (
                                  <button onClick={() => handleOpenYoutube(item.ytUrl)} className="text-indigo-500 hover:text-indigo-700 font-bold underline">
                                    ▶️ YouTube'da Aç
                                  </button>
                                )}
                              </div>
                            </div>
                            {item.embedUrl && (
                              <div className={`w-full md:w-64 h-36 rounded-xl overflow-hidden border ${currentTheme.border} shrink-0 cursor-pointer relative group`} onClick={() => handleOpenYoutube(item.ytUrl)}>
                                <iframe className="w-full h-full pointer-events-none" src={item.embedUrl} title="Ders Video" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1">
                                  ▶️ YouTube'da İzle
                                </div>
                              </div>
                            )}
                            <div className="flex items-center gap-2 self-end md:self-center">
                              <button onClick={() => toggleItemStatus(item.id, 'success')} className={`px-3 py-1.5 rounded-lg font-bold border ${item.status === 'success' ? 'bg-emerald-600 border-emerald-400 text-white' : `${currentTheme.subCard} border ${currentTheme.border}${isLight ? 'text-slate-700' : 'text-slate-400'}`}`}>✔</button>
                              <button onClick={() => toggleItemStatus(item.id, 'failed')} className={`px-3 py-1.5 rounded-lg font-bold border ${item.status === 'failed' ? 'bg-red-600 border-red-400 text-white' : `${currentTheme.subCard} border ${currentTheme.border}${isLight ? 'text-slate-700' : 'text-slate-400'}`}`}>✖</button>
                              <button onClick={() => removeScheduleItem(item.id)} className="text-slate-400 hover:text-red-500 font-bold p-1 ml-2">🗑️</button>
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

        {/* 2. DENEME ANALİZİ TABI */}
        {activeTab === 'deneme' && (
          <div className="space-y-6">
            <div className={`${currentTheme.card} p-6 rounded-2xl border ${currentTheme.border} space-y-4`}>
              <div className={`flex justify-between items-center border-b ${currentTheme.border} pb-3`}>
                <h2 className="text-lg font-bold text-purple-500">✍️ Deneme Sonucu Ekle</h2>
                <div className={`flex gap-2 ${currentTheme.subCard} p-1 rounded-xl border ${currentTheme.border}`}>
                  <button onClick={() => setDenemeType('TYT')} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${denemeType === 'TYT' ? 'bg-purple-600 text-white' : `${isLight ? 'text-slate-600' : 'text-slate-400'}`}`}>TYT</button>
                  <button onClick={() => setDenemeType('AYT')} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${denemeType === 'AYT' ? 'bg-purple-600 text-white' : `${isLight ? 'text-slate-600' : 'text-slate-400'}`}`}>AYT</button>
                </div>
              </div>
              <input type="text" value={denemeTitle} onChange={(e) => setDenemeTitle(e.target.value)} placeholder={`Deneme Adı (${denemeType})`} className={`w-full ${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2 text-sm`} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {(denemeType === 'TYT' ? ['Türkçe', 'Sosyal', 'Matematik', 'Fen'] : ['Matematik', 'Fen Bilimleri', 'Ed-Sos1', 'Sosyal-2']).map((ders, index) => {
                  const num = index + 1;
                  return (
                    <div key={ders} className={`${currentTheme.subCard} p-3 rounded-xl border ${currentTheme.border} space-y-1`}>
                      <span className="uppercase font-bold text-indigo-500">{ders}</span>
                      <div className="flex gap-2">
                        <input type="number" placeholder="D" value={scores[`d${num}`]} onChange={(e) => setScores({ ...scores, [`d${num}`]: e.target.value })} className={`w-1/2 ${isLight ? 'bg-white' : 'bg-slate-800'} border ${currentTheme.border} rounded p-1 text-center`} />
                        <input type="number" placeholder="Y" value={scores[`y${num}`]} onChange={(e) => setScores({ ...scores, [`y${num}`]: e.target.value })} className={`w-1/2 ${isLight ? 'bg-white' : 'bg-slate-800'} border ${currentTheme.border} rounded p-1 text-center`} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center bg-purple-500/10 p-3 rounded-xl border border-purple-300">
                <span className="text-sm font-bold text-purple-600">{denemeType} Toplam: {currentTotalNet.toFixed(2)} Net</span>
                <button onClick={saveDeneme} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-xs font-bold">Kaydet</button>
              </div>
            </div>

            <div className={`${currentTheme.card} p-6 rounded-2xl border ${currentTheme.border} space-y-3`}>
              <h3 className={`text-sm font-bold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>📋 Kayıtlı Denemeler</h3>
              {denemeHistory.length === 0 ? <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'} italic`}>Kayıtlı deneme yok.</p> : (
                denemeHistory.map(d => (
                  <div key={d.id} className={`${currentTheme.subCard} p-3 rounded-xl border ${currentTheme.border} flex justify-between items-center text-xs`}>
                    <div>
                      <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>{d.title}</span> ({d.type})
                      <span className="text-slate-500 block pt-0.5">{d.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-base font-black text-purple-500">{d.totalNet} Net</span>
                      <button onClick={() => removeDeneme(d.id)} className="text-slate-400 hover:text-red-500 font-bold">🗑️</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 3. POMODORO TABI */}
        {activeTab === 'pomodoro' && (
          <div className={`${currentTheme.card} p-6 md:p-8 rounded-2xl border ${currentTheme.border} max-w-2xl mx-auto space-y-6 text-center`}>
            <h2 className="text-xl font-bold text-indigo-500">⏱️ Esnek Süreli & Bloklu Pomodoro</h2>

            <div className={`${currentTheme.subCard} p-4 rounded-xl border ${currentTheme.border} space-y-3`}>
              <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} font-bold block uppercase tracking-wider`}>⚙️ Çalışma Ayarları</span>
              <div className="flex flex-wrap justify-center items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Çalışma (dk):</span>
                  <input type="number" value={customWorkTime} onChange={(e) => applyCustomPomodoro(e.target.value, customBreakTime, targetBlocks)} className={`w-16 ${isLight ? 'bg-white' : 'bg-slate-800'} border ${currentTheme.border} rounded-lg p-1.5 text-center font-bold text-indigo-500`} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Mola (dk):</span>
                  <input type="number" value={customBreakTime} onChange={(e) => applyCustomPomodoro(customWorkTime, e.target.value, targetBlocks)} className={`w-16 ${isLight ? 'bg-white' : 'bg-slate-800'} border ${currentTheme.border} rounded-lg p-1.5 text-center font-bold text-emerald-500`} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Blok Sayısı (Etüt):</span>
                  <input type="number" min="1" value={targetBlocks} onChange={(e) => applyCustomPomodoro(customWorkTime, customBreakTime, e.target.value)} className={`w-16 ${isLight ? 'bg-white' : 'bg-slate-800'} border ${currentTheme.border} rounded-lg p-1.5 text-center font-bold text-amber-500`} />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-1">
                <button onClick={() => applyCustomPomodoro(25, 5, 1)} className={`${isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'} border ${currentTheme.border} px-3 py-1 rounded-lg text-[11px]`}>⚡ Tekil (25/5 dk)</button>
                <button onClick={() => applyCustomPomodoro(50, 10, 2)} className="bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-300 px-3 py-1 rounded-lg text-[11px] font-bold text-indigo-600">🧱 2 Blok (50/10 dk)</button>
                <button onClick={() => applyCustomPomodoro(45, 15, 3)} className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-300 px-3 py-1 rounded-lg text-[11px] font-bold text-purple-600">🚀 3 Blok Maraton</button>
              </div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${pomodoroMode === 'work' ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                {pomodoroMode === 'work' ? `🧠 ÇALIŞMA (${currentBlock}/${targetBlocks}. BLOK)` : '☕ MOLA'}
              </span>
            </div>

            <div className={`text-6xl md:text-7xl font-mono font-extrabold tracking-widest ${isLight ? 'text-indigo-600' : 'text-indigo-300'} ${currentTheme.subCard} py-8 rounded-3xl border ${currentTheme.border} shadow-inner`}>
              {formatTime(timeLeft)}
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => setIsRunning(!isRunning)} className={`px-8 py-3 rounded-xl font-bold text-sm text-white ${isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {isRunning ? '⏸️ Duraklat' : '▶️ Başlat'}
              </button>
              <button onClick={() => applyCustomPomodoro(customWorkTime, customBreakTime, targetBlocks)} className={`${isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'} px-6 py-3 rounded-xl font-bold text-sm`}>
                🔄 Sıfırla
              </button>
            </div>
          </div>
        )}

        {/* 4. KAYNAKLAR & HOCALAR YÖNETİMİ TABI */}
        {activeTab === 'kaynaklar' && (
          <div className="space-y-8">
            {/* Kaynaklar Bölümü */}
            <div className={`${currentTheme.card} p-6 rounded-2xl border ${currentTheme.border} space-y-6`}>
              <h2 className="text-lg font-bold text-emerald-500">📚 Kaynak Yönetimi</h2>
              <div className={`flex gap-2 ${currentTheme.subCard} p-3 rounded-xl border ${currentTheme.border} max-w-md`}>
                <input type="text" value={newBookInput} onChange={(e) => setNewBookInput(e.target.value)} placeholder="Yeni Yayın Ekle..." className={`border ${currentTheme.border} rounded-lg p-2 text-xs flex-1 ${isLight ? 'bg-white text-slate-900' : 'bg-slate-800 text-white'}`} />
                <button onClick={addCustomBook} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold">➕ Ekle</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {customBooks.map((b, i) => (
                  <div key={i} className={`${currentTheme.subCard} p-3 rounded-xl border ${currentTheme.border} text-xs ${isLight ? 'text-slate-800' : 'text-slate-300'} font-medium flex justify-between items-center`}>
                    <span className="truncate pr-2">{b}</span>
                    <button onClick={() => removeCustomBook(b)} className="text-slate-400 hover:text-red-500 text-sm font-bold">🗑️</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Hocalar Bölümü */}
            <div className={`${currentTheme.card} p-6 rounded-2xl border ${currentTheme.border} space-y-6`}>
              <h2 className="text-lg font-bold text-indigo-500">👨‍🏫 Hoca Yönetimi</h2>
              <div className={`flex gap-2 ${currentTheme.subCard} p-3 rounded-xl border ${currentTheme.border} max-w-md`}>
                <input type="text" value={newTeacherInput} onChange={(e) => setNewTeacherInput(e.target.value)} placeholder="Örn: Ahmet Hoca (Matematik)" className={`border ${currentTheme.border} rounded-lg p-2 text-xs flex-1 ${isLight ? 'bg-white text-slate-900' : 'bg-slate-800 text-white'}`} />
                <button onClick={addCustomTeacher} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold">➕ Ekle</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {customTeachers.map((t, i) => (
                  <div key={i} className={`${currentTheme.subCard} p-3 rounded-xl border ${currentTheme.border} text-xs ${isLight ? 'text-slate-800' : 'text-slate-300'} font-medium flex justify-between items-center`}>
                    <span className="truncate pr-2">{t}</span>
                    <button onClick={() => removeCustomTeacher(t)} className="text-slate-400 hover:text-red-500 text-sm font-bold">🗑️</button>
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