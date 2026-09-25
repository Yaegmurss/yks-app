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

  // ARKA PLAN SESLERİ İÇİN GİZLİ YOUTUBE OYNATICI STATE'LERİ
  const [selectedSound, setSelectedSound] = useState('none');
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  // Seslerin YouTube Video ID'leri (Uygulama içinde çalması için)
  const soundVideoIds = {
    study: '5qap5aO4i9A', // Kütüphane / Çalışma Ortamı Atmosferi
    rain: 'mPZkdNFkNps',   // Yağmur Sesi
    fire: 'L_LUpnjgPso',   // Şömine Sesi
    birds: 'V_VPg993F40',  // Kuş ve Doğa Sesleri
    lofi: 'jfKfPfyJRdk'    // Hafif Lofi Müzik
  };

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

      {/* ARKA PLANDA SES ÇALAN GİZLİ YOUTUBE OYNATICI */}
      {isSoundPlaying && selectedSound !== 'none' && soundVideoIds[selectedSound] && (
        <div className="hidden">
          <iframe
            src={`https://www.youtube.com/embed/${soundVideoIds[selectedSound]}?autoplay=1&loop=1&playlist=${soundVideoIds[selectedSound]}`}
            allow="autoplay"
            title="Arka Plan Sesi"
          />
        </div>
      )}

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
                              <button onClick={() => toggleItemStatus(item.id, item.status === 'success' ? 'pending' : 'success')} className={`px-3 py-1.5 rounded-xl font-bold ${item.status === 'success' ? 'bg-emerald-600 text-white' : `${isLight ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}`}>
                                {item.status === 'success' ? '✅ Tamamlandı' : 'Çalışılmadı'}
                              </button>
                              <button onClick={() => removeScheduleItem(item.id)} className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-2.5 py-1.5 rounded-xl transition-colors">🗑️</button>
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
            <div className={`${currentTheme.card} p-4 rounded-2xl border ${currentTheme.border} space-y-4`}>
              <h3 className={`text-xs font-bold ${currentTheme.text} uppercase tracking-wider`}>📈 Yeni Deneme Neti Hesapla ve Kaydet</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className={`block text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'} font-bold mb-1`}>Deneme Türü</label>
                  <select value={denemeType} onChange={(e) => setDenemeType(e.target.value)} className={`w-full ${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2 font-bold`}>
                    <option value="TYT">TYT Denemesi</option>
                    <option value="AYT">AYT Denemesi</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'} font-bold mb-1`}>Deneme Adı / Yayın</label>
                  <input type="text" placeholder="Örn: 3D Yayınları TYT 1" value={denemeTitle} onChange={(e) => setDenemeTitle(e.target.value)} className={`w-full ${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2`} />
                </div>
              </div>

              {/* Ders Net Girişleri */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className={`${currentTheme.subCard} border ${currentTheme.border} p-3 rounded-xl space-y-2`}>
                  <span className="font-bold text-indigo-400 block">{denemeType === 'TYT' ? 'Türkçe' : 'Matematik'}</span>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Doğru" value={scores.d1} onChange={(e) => setScores({ ...scores, d1: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                    <input type="number" placeholder="Yanlış" value={scores.y1} onChange={(e) => setScores({ ...scores, y1: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                  </div>
                  <span className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} block text-right font-mono`}>Net: {calcNet(scores.d1, scores.y1).toFixed(2)}</span>
                </div>

                <div className={`${currentTheme.subCard} border ${currentTheme.border} p-3 rounded-xl space-y-2`}>
                  <span className="font-bold text-sky-400 block">{denemeType === 'TYT' ? 'Sosyal Bilimler' : 'Fen Bilimleri'}</span>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Doğru" value={scores.d2} onChange={(e) => setScores({ ...scores, d2: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                    <input type="number" placeholder="Yanlış" value={scores.y2} onChange={(e) => setScores({ ...scores, y2: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                  </div>
                  <span className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} block text-right font-mono`}>Net: {calcNet(scores.d2, scores.y2).toFixed(2)}</span>
                </div>

                <div className={`${currentTheme.subCard} border ${currentTheme.border} p-3 rounded-xl space-y-2`}>
                  <span className="font-bold text-purple-400 block">{denemeType === 'TYT' ? 'Temel Matematik' : 'Türk Dili ve Ed. / Sos-1'}</span>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Doğru" value={scores.d3} onChange={(e) => setScores({ ...scores, d3: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                    <input type="number" placeholder="Yanlış" value={scores.y3} onChange={(e) => setScores({ ...scores, y3: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                  </div>
                  <span className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} block text-right font-mono`}>Net: {calcNet(scores.d3, scores.y3).toFixed(2)}</span>
                </div>

                <div className={`${currentTheme.subCard} border ${currentTheme.border} p-3 rounded-xl space-y-2`}>
                  <span className="font-bold text-emerald-400 block">{denemeType === 'TYT' ? 'Fen Bilimleri' : 'Sosyal Bilimler-2'}</span>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Doğru" value={scores.d4} onChange={(e) => setScores({ ...scores, d4: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                    <input type="number" placeholder="Yanlış" value={scores.y4} onChange={(e) => setScores({ ...scores, y4: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                  </div>
                  <span className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} block text-right font-mono`}>Net: {calcNet(scores.d4, scores.y4).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className={`text-sm font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>Toplam Net: <span className="text-emerald-500 font-mono text-lg">{currentTotalNet.toFixed(2)}</span></span>
                <button onClick={saveDeneme} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-xl text-xs">Denemeyi Kaydet</button>
              </div>
            </div>

            {/* Geçmiş Denemeler */}
            <div className="space-y-3">
              <h3 className={`text-xs font-bold ${currentTheme.text} uppercase tracking-wider`}>📜 Geçmiş Deneme Sonuçları</h3>
              {denemeHistory.length === 0 ? (
                <div className={`${currentTheme.card} p-8 rounded-2xl border ${currentTheme.border} text-center ${isLight ? 'text-slate-500' : 'text-slate-400'} text-sm italic`}>Henüz kaydedilmiş deneme sonucu bulunmuyor.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {denemeHistory.map(deneme => (
                    <div key={deneme.id} className={`${currentTheme.card} p-4 rounded-2xl border ${currentTheme.border} space-y-2`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="bg-indigo-900/20 text-indigo-600 font-bold px-2 py-0.5 rounded text-[10px] border border-indigo-300 mr-2">{deneme.type}</span>
                          <span className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{deneme.title}</span>
                        </div>
                        <button onClick={() => removeDeneme(deneme.id)} className="text-red-500 hover:text-red-700 text-xs">🗑️</button>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center pt-1">
                        {deneme.details.map((det, idx) => (
                          <div key={idx} className={`${currentTheme.subCard} p-1.5 rounded-lg border ${currentTheme.border}`}>
                            <span className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} block truncate`}>{det.name}</span>
                            <span className="font-bold text-xs text-indigo-400 font-mono">{det.net.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-slate-700/50 text-xs">
                        <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Tarih: {deneme.date}</span>
                        <span className="font-bold text-emerald-500">Toplam: {deneme.totalNet.toFixed(2)} Net</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. POMODORO / BLOK TABI */}
        {activeTab === 'pomodoro' && (
          <div className="space-y-6">
            <div className={`${currentTheme.card} p-6 rounded-2xl border ${currentTheme.border} text-center max-w-xl mx-auto space-y-6 shadow-2xl`}>

              {/* ÇALIŞMA AYARLARI KUTUSU */}
              <div className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.subCard} space-y-4 text-left`}>
                <h4 className={`text-xs font-bold ${currentTheme.text} uppercase tracking-wider text-center`}>⚙️ ÇALIŞMA AYARLARI</h4>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className={`block text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} mb-1`}>Çalışma (Dk)</label>
                    <input type="number" value={customWorkTime} onChange={(e) => setCustomWorkTime(e.target.value)} className={`w-full ${currentTheme.subCard} border ${currentTheme.border} rounded p-1.5 text-center font-bold`} />
                  </div>
                  <div>
                    <label className={`block text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} mb-1`}>Mola (Dk)</label>
                    <input type="number" value={customBreakTime} onChange={(e) => setCustomBreakTime(e.target.value)} className={`w-full ${currentTheme.subCard} border ${currentTheme.border} rounded p-1.5 text-center font-bold`} />
                  </div>
                  <div>
                    <label className={`block text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} mb-1`}>Blok Sayısı</label>
                    <input type="number" value={targetBlocks} onChange={(e) => setTargetBlocks(e.target.value)} className={`w-full ${currentTheme.subCard} border ${currentTheme.border} rounded p-1.5 text-center font-bold`} />
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 pt-1">
                  <button onClick={() => applyCustomPomodoro(25, 5, 1)} className="px-3 py-1 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-lg text-[11px] font-bold">⚡ Tekil (25/5 dk)</button>
                  <button onClick={() => applyCustomPomodoro(50, 10, 2)} className="px-3 py-1 bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded-lg text-[11px] font-bold">🪵 2 Blok (50/10 dk)</button>
                  <button onClick={() => applyCustomPomodoro(40, 10, 3)} className="px-3 py-1 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-lg text-[11px] font-bold">🚀 3 Blok Maraton</button>
                </div>

                {/* ARKA PLAN SESLERİ SEÇİM BÖLÜMÜ */}
                <div className="pt-3 border-t border-slate-700/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-bold ${currentTheme.text} uppercase tracking-wider`}>🎧 Etüt Arka Plan Sesi</span>
                    <button
                      onClick={() => setIsSoundPlaying(!isSoundPlaying)}
                      disabled={selectedSound === 'none'}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${selectedSound === 'none' ? 'opacity-50 cursor-not-allowed bg-slate-700 text-slate-400' : isSoundPlaying ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'}`}
                    >
                      {isSoundPlaying ? 'Sesi Kapat 🔇' : 'Sesi Aç 🔊'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'none', label: 'Ses Yok', icon: '🔇' },
                      { id: 'study', label: 'Deneme Ortamı', icon: '🏛️' },
                      { id: 'rain', label: 'Yağmur Sesi', icon: '🌧️' },
                      { id: 'fire', label: 'Şömine Sesi', icon: '🔥' },
                      { id: 'birds', label: 'Kuş Sesleri', icon: '🐦' },
                      { id: 'lofi', label: 'Hafif Müzik', icon: '🎶' }
                    ].map((sound) => (
                      <button
                        key={sound.id}
                        onClick={() => { setSelectedSound(sound.id); setIsSoundPlaying(sound.id !== 'none'); }}
                        className={`p-2 rounded-lg border text-left font-medium transition-all flex items-center gap-2 ${selectedSound === sound.id ? 'bg-indigo-600 text-white border-indigo-500 shadow-md' : `${isLight ? 'bg-white hover:bg-slate-100 text-slate-800' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'} ${currentTheme.border}`}`}
                      >
                        <span>{sound.icon}</span>
                        <span className="truncate">{sound.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => applyCustomPomodoro(customWorkTime, customBreakTime, targetBlocks)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs mt-2">Ayarları Uygula ve Sıfırla</button>
              </div>

              <div className="flex justify-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${pomodoroMode === 'work' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                  {pomodoroMode === 'work' ? `💪 ${currentBlock}. Etüt Çalışması` : '☕ Dinlenme Molası'}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-300'}`}>
                  Hedef Blok: {targetBlocks}
                </span>
              </div>

              <div className={`text-6xl md:text-8xl font-black font-mono tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {formatTime(timeLeft)}
              </div>

              <div className="flex justify-center gap-3">
                <button onClick={() => setIsRunning(!isRunning)} className={`px-6 py-3 rounded-xl font-bold text-sm text-white ${isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                  {isRunning ? '⏸️ Duraklat' : '▶️ Başlat'}
                </button>
                <button onClick={() => { setIsRunning(false); setTimeLeft(pomodoroMode === 'work' ? customWorkTime * 60 : customBreakTime * 60); }} className={`${isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'} px-4 py-3 rounded-xl font-bold text-sm`}>
                  🔄 Sıfırla
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 4. KAYNAKLAR & HOCALAR TABI */}
        {activeTab === 'kaynaklar' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`${currentTheme.card} p-4 rounded-2xl border ${currentTheme.border} space-y-3`}>
                <h3 className={`text-xs font-bold ${currentTheme.text} uppercase tracking-wider`}>👨‍🏫 Takip Edilen Hocalar</h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="Yeni hoca adı ve branşı" value={newTeacherInput} onChange={(e) => setNewTeacherInput(e.target.value)} className={`w-full ${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2 text-xs`} />
                  <button onClick={addCustomTeacher} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg text-xs shrink-0">Ekle</button>
                </div>
                <div className={`max-h-60 overflow-y-auto space-y-1.5 pr-1`}>
                  {customTeachers.map((teacher, index) => (
                    <div key={index} className={`${currentTheme.subCard} p-2 rounded-lg border ${currentTheme.border} flex justify-between items-center text-xs`}>
                      <span className={isLight ? 'text-slate-800 font-medium' : 'text-slate-200'}>{teacher}</span>
                      <button onClick={() => removeCustomTeacher(teacher)} className="text-red-500 hover:text-red-700">🗑️</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${currentTheme.card} p-4 rounded-2xl border ${currentTheme.border} space-y-3`}>
                <h3 className={`text-xs font-bold ${currentTheme.text} uppercase tracking-wider`}>📚 Soru Bankaları & Kaynaklar</h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="Yeni kaynak adı" value={newBookInput} onChange={(e) => setNewBookInput(e.target.value)} className={`w-full ${currentTheme.subCard} border ${currentTheme.border} rounded-lg p-2 text-xs`} />
                  <button onClick={addCustomBook} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg text-xs shrink-0">Ekle</button>
                </div>
                <div className={`max-h-60 overflow-y-auto space-y-1.5 pr-1`}>
                  {customBooks.map((book, index) => (
                    <div key={index} className={`${currentTheme.subCard} p-2 rounded-lg border ${currentTheme.border} flex justify-between items-center text-xs`}>
                      <span className={isLight ? 'text-slate-800 font-medium' : 'text-slate-200'}>{book}</span>
                      <button onClick={() => removeCustomBook(book)} className="text-red-500 hover:text-red-700">🗑️</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}