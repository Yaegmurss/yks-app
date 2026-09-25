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
  { id: 'slate', name: 'Gece Yarısı (Koyu)', bg: 'bg-slate-950', card: 'bg-slate-900/95', text: 'text-white', primary: 'bg-indigo-600', border: 'border-slate-800' },
  { id: 'zinc', name: 'Kömür Siyahı', bg: 'bg-zinc-950', card: 'bg-zinc-900/95', text: 'text-zinc-100', primary: 'bg-zinc-700', border: 'border-zinc-800' },
  { id: 'rose', name: 'Pastel Gül', bg: 'bg-rose-950/40', card: 'bg-rose-900/20', text: 'text-rose-100', primary: 'bg-rose-600', border: 'border-rose-800/40' },
  { id: 'emerald', name: 'Zümrüt Ormanı', bg: 'bg-emerald-950/40', card: 'bg-emerald-900/20', text: 'text-emerald-100', primary: 'bg-emerald-600', border: 'border-emerald-800/40' },
  { id: 'amber', name: 'Gün Batımı', bg: 'bg-amber-950/40', card: 'bg-amber-900/20', text: 'text-amber-100', primary: 'bg-amber-600', border: 'border-amber-800/40' },
  { id: 'purple', name: 'Mor Gece', bg: 'bg-purple-950/40', card: 'bg-purple-900/20', text: 'text-purple-100', primary: 'bg-purple-600', border: 'border-purple-800/40' },
  { id: 'cyan', name: 'Neon Mavi', bg: 'bg-cyan-950/40', card: 'bg-cyan-900/20', text: 'text-cyan-100', primary: 'bg-cyan-600', border: 'border-cyan-800/40' },
  { id: 'blue', name: 'Okyanus', bg: 'bg-blue-950/40', card: 'bg-blue-900/20', text: 'text-blue-100', primary: 'bg-blue-600', border: 'border-blue-800/40' },
  { id: 'indigo', name: 'Koyu İndigo', bg: 'bg-indigo-950/40', card: 'bg-indigo-900/20', text: 'text-indigo-100', primary: 'bg-indigo-600', border: 'border-indigo-800/40' },
  { id: 'violet', name: 'Menekşe', bg: 'bg-violet-950/40', card: 'bg-violet-900/20', text: 'text-violet-100', primary: 'bg-violet-600', border: 'border-violet-800/40' },
  { id: 'fuchsia', name: 'Fuşya Parlı', bg: 'bg-fuchsia-950/40', card: 'bg-fuchsia-900/20', text: 'text-fuchsia-100', primary: 'bg-fuchsia-600', border: 'border-fuchsia-800/40' },
  { id: 'pink', name: 'Pastel Pembe', bg: 'bg-pink-950/40', card: 'bg-pink-900/20', text: 'text-pink-100', primary: 'bg-pink-600', border: 'border-pink-800/40' },
  { id: 'teal', name: 'Koyu Teal', bg: 'bg-teal-950/40', card: 'bg-teal-900/20', text: 'text-teal-100', primary: 'bg-teal-600', border: 'border-teal-800/40' },
  { id: 'sky', name: 'Gök Mavisi', bg: 'bg-sky-950/40', card: 'bg-sky-900/20', text: 'text-sky-100', primary: 'bg-sky-600', border: 'border-sky-800/40' },
  { id: 'lime', name: 'Canlı Limon', bg: 'bg-lime-950/40', card: 'bg-lime-900/20', text: 'text-lime-100', primary: 'bg-lime-600', border: 'border-lime-800/40' },
  { id: 'yellow', name: 'Pastel Sarı', bg: 'bg-yellow-950/40', card: 'bg-yellow-900/20', text: 'text-yellow-100', primary: 'bg-yellow-600', border: 'border-yellow-800/40' },
  { id: 'orange', name: 'Turuncu Akşam', bg: 'bg-orange-950/40', card: 'bg-orange-900/20', text: 'text-orange-100', primary: 'bg-orange-600', border: 'border-orange-800/40' },
  { id: 'red', name: 'Kan Kırmızı', bg: 'bg-red-950/40', card: 'bg-red-900/20', text: 'text-red-100', primary: 'bg-red-600', border: 'border-red-800/40' },
  { id: 'stone', name: 'Taş Gri', bg: 'bg-stone-950', card: 'bg-stone-900/95', text: 'text-stone-100', primary: 'bg-stone-700', border: 'border-stone-800' },
  { id: 'neutral', name: 'Nötr Gri', bg: 'bg-neutral-950', card: 'bg-neutral-900/95', text: 'text-neutral-100', primary: 'bg-neutral-700', border: 'border-neutral-800' },
  { id: 'pastel1', name: 'Pastel Lavanta', bg: 'bg-purple-950/20', card: 'bg-slate-900/90', text: 'text-purple-200', primary: 'bg-purple-500', border: 'border-purple-900/30' },
  { id: 'pastel2', name: 'Pastel Mint', bg: 'bg-teal-950/20', card: 'bg-slate-900/90', text: 'text-teal-200', primary: 'bg-teal-500', border: 'border-teal-900/30' },
  { id: 'pastel3', name: 'Pastel Şeftali', bg: 'bg-orange-950/20', card: 'bg-slate-900/90', text: 'text-orange-200', primary: 'bg-orange-500', border: 'border-orange-900/30' },
  { id: 'pastel4', name: 'Pastel Lila', bg: 'bg-indigo-950/20', card: 'bg-slate-900/90', text: 'text-indigo-200', primary: 'bg-indigo-500', border: 'border-indigo-900/30' },
  { id: 'pastel5', name: 'Yumuşak Krem', bg: 'bg-zinc-900', card: 'bg-zinc-800/90', text: 'text-amber-100', primary: 'bg-amber-700', border: 'border-zinc-700' }
];

function YksCountdownCard() {
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
    <div className="bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-700 shadow-xl text-center space-y-3 relative z-10">
      <h3 className="text-sm md:text-base font-bold text-indigo-400 uppercase tracking-wider">
        ⏳ 2027 YKS'ye Kalan Süre
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
        <div className="bg-slate-950/90 border border-slate-700 p-3 rounded-xl">
          <span className="text-2xl md:text-3xl font-black font-mono text-white block">{timeLeft.days}</span>
          <span className="text-xs text-slate-400 font-bold uppercase">Gün</span>
        </div>
        <div className="bg-slate-950/90 border border-slate-700 p-3 rounded-xl">
          <span className="text-2xl md:text-3xl font-black font-mono text-indigo-300 block">{timeLeft.hours}</span>
          <span className="text-xs text-slate-400 font-bold uppercase">Saat</span>
        </div>
        <div className="bg-slate-950/90 border border-slate-700 p-3 rounded-xl">
          <span className="text-2xl md:text-3xl font-black font-mono text-purple-300 block">{timeLeft.minutes}</span>
          <span className="text-xs text-slate-400 font-bold uppercase">Dakika</span>
        </div>
        <div className="bg-slate-950/90 border border-slate-700 p-3 rounded-xl">
          <span className="text-2xl md:text-3xl font-black font-mono text-emerald-300 block">{timeLeft.seconds}</span>
          <span className="text-xs text-slate-400 font-bold uppercase">Saniye</span>
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
    } else if (timeLeft === 0) {
      playSpecificSound(selectedEndSound);

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
  }, [isRunning, timeLeft, pomodoroMode, currentBlock, targetBlocks, customWorkTime, customBreakTime, selectedEndSound]);

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
    <div className={`min-h-screen ${activeThemeObj.bg} ${activeThemeObj.text} p-3 md:p-6 font-sans transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Üst Menü */}
        <header className={`${activeThemeObj.card} backdrop-blur-md p-4 rounded-2xl border ${activeThemeObj.border} flex flex-col md:flex-row justify-between items-center gap-4 relative z-50 shadow-2xl`}>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold text-indigo-400">
              ⚡ YKS Çalışma Masası <span className="italic text-sm font-normal text-slate-400 ml-2">By Yağmur</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400">🎨 Tema:</span>
              <select
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
                className="bg-transparent text-xs font-bold text-indigo-300 outline-none cursor-pointer"
              >
                {THEMES.map(t => (
                  <option key={t.id} value={t.id} className="bg-slate-900 text-white">{t.name}</option>
                ))}
              </select>
            </div>

            <button onClick={() => setActiveTab('program')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'program' ? 'bg-indigo-600 text-white' : 'bg-slate-900/80 text-slate-400'}`}>📊 Program</button>
            <button onClick={() => setActiveTab('deneme')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'deneme' ? 'bg-indigo-600 text-white' : 'bg-slate-900/80 text-slate-400'}`}>📈 Denemeler</button>
            <button onClick={() => setActiveTab('pomodoro')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'pomodoro' ? 'bg-indigo-600 text-white' : 'bg-slate-900/80 text-slate-400'}`}>⏱️ Pomodoro / Blok</button>
            <button onClick={() => setActiveTab('kaynaklar')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'kaynaklar' ? 'bg-indigo-600 text-white' : 'bg-slate-900/80 text-slate-400'}`}>📚 Kaynaklar & Hocalar</button>
            <button onClick={resetAllData} className="bg-red-600/80 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-xs font-bold border border-red-500/50">🗑️ Sıfırla</button>
          </div>
        </header>

        {/* YKS Geri Sayım Kartı */}
        <YksCountdownCard />

        {/* 1. DERS PROGRAMI TABI */}
        {activeTab === 'program' && (
          <div className="space-y-6">
            <div className={`${activeThemeObj.card} p-4 rounded-2xl border ${activeThemeObj.border} flex flex-wrap justify-between items-center gap-4`}>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold">📅 Görüntülenen Ay:</span>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold rounded-lg px-3 py-1.5 text-xs">
                  {MONTHS.map(m => <option key={m} value={m}>{m} Ayı</option>)}
                </select>
              </div>
              <span className="text-xs text-slate-400">Seçili ayda toplam <strong>{monthSchedule.length}</strong> ders kaydı var.</span>
            </div>

            {/* Ders Ekleme Formu */}
            <div className={`${activeThemeObj.card} p-4 rounded-2xl border ${activeThemeObj.border} space-y-3`}>
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">➕ Ders / Video Ekle</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-2 text-xs">
                <select value={formMonth} onChange={(e) => setFormMonth(e.target.value)} className="bg-slate-950/90 border border-slate-700 rounded-lg p-2 font-bold text-indigo-400">
                  {MONTHS.map(m => <option key={m} value={m}>{m} Ayı</option>)}
                </select>
                <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} className="bg-slate-950/90 border border-slate-700 rounded-lg p-2 text-white" />
                <select value={formDay} onChange={(e) => setFormDay(e.target.value)} className="bg-slate-950/90 border border-slate-700 rounded-lg p-2 text-white">
                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <div className="flex items-center gap-1 bg-slate-950/90 border border-slate-700 rounded-lg p-1">
                  <span className="text-[10px] text-slate-400 pl-1">Başla:</span>
                  <input type="time" value={formStartTime} onChange={(e) => setFormStartTime(e.target.value)} className="bg-transparent w-full outline-none text-xs text-white" />
                </div>
                <div className="flex items-center gap-1 bg-slate-950/90 border border-slate-700 rounded-lg p-1">
                  <span className="text-[10px] text-slate-400 pl-1">Bitiş:</span>
                  <input type="time" value={formEndTime} onChange={(e) => setFormEndTime(e.target.value)} className="bg-transparent w-full outline-none text-xs text-white" />
                </div>
                <select value={formSubject} onChange={(e) => setFormSubject(e.target.value)} className="bg-slate-950/90 border border-slate-700 rounded-lg p-2 text-white">
                  <option value="Matematik">Matematik</option><option value="Geometri">Geometri</option><option value="Fizik">Fizik</option><option value="Kimya">Kimya</option><option value="Biyoloji">Biyoloji</option><option value="Türkçe">Türkçe</option><option value="Tarih">Tarih</option><option value="Coğrafya">Coğrafya</option>
                </select>
                <select value={formTeacher} onChange={(e) => setFormTeacher(e.target.value)} className="bg-slate-950/90 border border-slate-700 rounded-lg p-2 text-white">
                  {customTeachers.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input type="text" placeholder="Kaynak Yazın" value={formBook} onChange={(e) => setFormBook(e.target.value)} list="books-list" className="bg-slate-950/90 border border-slate-700 rounded-lg p-2 text-white" />
                <datalist id="books-list">{customBooks.map((b, i) => <option key={i} value={b} />)}</datalist>
                <input type="number" placeholder="Soru Sayısı" value={formQuestions} onChange={(e) => setFormQuestions(e.target.value)} className="bg-slate-950/90 border border-slate-700 rounded-lg p-2 text-white" />
                <input type="text" placeholder="YouTube Linki" value={formYtUrl} onChange={(e) => handleYtUrlChange(e.target.value)} className="bg-slate-950/90 border border-slate-700 rounded-lg p-2 col-span-2 md:col-span-1 text-white" />
              </div>
              <button onClick={addScheduleItem} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs">Listeye Ekle</button>
            </div>

            {/* Ders Listesi */}
            <div className="space-y-4">
              {activeDays.length === 0 ? (
                <div className={`${activeThemeObj.card} p-8 rounded-2xl border ${activeThemeObj.border} text-center text-slate-400 text-sm italic`}>{selectedMonth} ayı için henüz ders eklenmedi.</div>
              ) : (
                activeDays.map((day) => {
                  const dayItems = monthSchedule.filter(item => item.day === day);
                  return (
                    <div key={day} className={`${activeThemeObj.card} rounded-2xl border ${activeThemeObj.border} overflow-hidden shadow-lg`}>
                      <div className="bg-slate-950/90 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                        <span className="font-bold text-sm text-indigo-400">📅 {day}</span>
                        <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">{dayItems.length} Ders</span>
                      </div>
                      <div className="divide-y divide-slate-800/60">
                        {dayItems.map((item) => (
                          <div key={item.id} className="p-3 md:p-4 hover:bg-slate-800/50 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="bg-purple-900/40 text-purple-300 font-bold px-2 py-0.5 rounded border border-purple-700">{item.date}</span>
                                <span className="bg-indigo-900/40 text-indigo-300 font-mono font-bold px-2 py-0.5 rounded border border-indigo-700">{item.startTime} - {item.endTime}</span>
                                {item.duration && (
                                  <span className="bg-amber-900/40 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-700">⏱️ {item.duration}</span>
                                )}
                                <span className="font-bold text-sm text-white">{item.subject}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => removeScheduleItem(item.id)} className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-2 py-1 rounded text-xs">Sil</button>
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
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">📈 Yeni Deneme Sonucu Ekle</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select value={denemeType} onChange={(e) => setDenemeType(e.target.value)} className="bg-slate-950/90 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white">
                  <option value="TYT">TYT Denemesi</option>
                  <option value="AYT">AYT Denemesi</option>
                </select>
                <input type="text" placeholder="Deneme Adı (Örn: 3D Yayınları TYT 1)" value={denemeTitle} onChange={(e) => setDenemeTitle(e.target.value)} className="bg-slate-950/90 border border-slate-700 rounded-xl p-2.5 text-xs col-span-2 text-white" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-950/90 border border-slate-700 p-3 rounded-xl space-y-2">
                  <span className="font-bold block text-slate-300">{denemeType === 'TYT' ? 'Türkçe' : 'Matematik'}</span>
                  <div className="flex gap-1">
                    <input type="number" placeholder="Doğru" value={scores.d1} onChange={(e) => setScores({ ...scores, d1: e.target.value })} className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white" />
                    <input type="number" placeholder="Yanlış" value={scores.y1} onChange={(e) => setScores({ ...scores, y1: e.target.value })} className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white" />
                  </div>
                </div>
                <div className="bg-slate-950/90 border border-slate-700 p-3 rounded-xl space-y-2">
                  <span className="font-bold block text-slate-300">{denemeType === 'TYT' ? 'Sosyal Bilimler' : 'Fen Bilimleri'}</span>
                  <div className="flex gap-1">
                    <input type="number" placeholder="Doğru" value={scores.d2} onChange={(e) => setScores({ ...scores, d2: e.target.value })} className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white" />
                    <input type="number" placeholder="Yanlış" value={scores.y2} onChange={(e) => setScores({ ...scores, y2: e.target.value })} className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white" />
                  </div>
                </div>
                <div className="bg-slate-950/90 border border-slate-700 p-3 rounded-xl space-y-2">
                  <span className="font-bold block text-slate-300">{denemeType === 'TYT' ? 'Matematik' : 'Türk Dili ve Edebiyatı - Sosyal-1'}</span>
                  <div className="flex gap-1">
                    <input type="number" placeholder="Doğru" value={scores.d3} onChange={(e) => setScores({ ...scores, d3: e.target.value })} className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white" />
                    <input type="number" placeholder="Yanlış" value={scores.y3} onChange={(e) => setScores({ ...scores, y3: e.target.value })} className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white" />
                  </div>
                </div>
                <div className="bg-slate-950/90 border border-slate-700 p-3 rounded-xl space-y-2">
                  <span className="font-bold block text-slate-300">{denemeType === 'TYT' ? 'Fen Bilimleri' : 'Sosyal Bilimler-2'}</span>
                  <div className="flex gap-1">
                    <input type="number" placeholder="Doğru" value={scores.d4} onChange={(e) => setScores({ ...scores, d4: e.target.value })} className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white" />
                    <input type="number" placeholder="Yanlış" value={scores.y4} onChange={(e) => setScores({ ...scores, y4: e.target.value })} className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-bold text-slate-300">Hesaplanan Toplam Net: <span className="text-indigo-400 font-mono text-base">{currentTotalNet.toFixed(2)}</span></span>
                <button onClick={saveDeneme} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-xs font-bold">Denemeyi Kaydet</button>
              </div>
            </div>

            {/* Geçmiş Denemeler Listesi */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-indigo-400">Geçmiş Deneme Sonuçları</h3>
              {denemeHistory.length === 0 ? (
                <div className={`${activeThemeObj.card} p-6 rounded-2xl border ${activeThemeObj.border} text-center text-xs italic text-slate-400`}>Henüz kaydedilmiş deneme yok.</div>
              ) : (
                denemeHistory.map((item) => (
                  <div key={item.id} className={`${activeThemeObj.card} p-4 rounded-xl border ${activeThemeObj.border} flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-indigo-600 text-white font-bold px-2 py-0.5 rounded">{item.type}</span>
                        <span className="font-bold text-sm text-white">{item.title}</span>
                        <span className="text-slate-400">({item.date})</span>
                      </div>
                      <div className="flex gap-4 pt-1 flex-wrap">
                        {item.details.map((d, idx) => (
                          <span key={idx} className="bg-slate-800 px-2 py-1 rounded text-slate-300">
                            {d.name}: <strong className="text-indigo-300 font-mono">{d.net.toFixed(2)} Net</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase">Toplam Net</span>
                        <span className="text-base font-black font-mono text-indigo-400">{item.totalNet.toFixed(2)}</span>
                      </div>
                      <button onClick={() => removeDeneme(item.id)} className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white p-2 rounded-lg">Sil</button>
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
              <div className="flex justify-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${pomodoroMode === 'work' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                  {pomodoroMode === 'work' ? `📚 Çalışma Etüdü (${currentBlock}/${targetBlocks})` : '☕ Dinlenme Molası'}
                </span>
              </div>

              <div className="text-6xl md:text-8xl font-black font-mono tracking-wider text-white">
                {formatTime(timeLeft)}
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-8 py-3 rounded-xl font-bold text-sm ${isRunning ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                >
                  {isRunning ? 'Durdur' : 'Başlat'}
                </button>
                <button
                  onClick={() => { setIsRunning(false); setTimeLeft(pomodoroMode === 'work' ? customWorkTime * 60 : customBreakTime * 60); }}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl font-bold text-sm border border-slate-700"
                >
                  Sıfırla
                </button>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-3 text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">🔔 Etüt/Mola Bitiş Sesi (Seçerken Test Edebilirsiniz)</h4>
                <select
                  value={selectedEndSound}
                  onChange={handleEndSoundChange}
                  className="w-full bg-slate-950/90 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white"
                >
                  <option value="bell">Yumuşak Zil Sesi (Chime)</option>
                  <option value="digital">Dijital Alarm</option>
                  <option value="gong">Zen Gong Sesi</option>
                </select>
                <p className="text-[10px] text-slate-400">Açılır menüden bir ses seçtiğinizde, sesin nasıl çıktığını duymanız için anında çalacaktır.</p>
              </div>

              <div className="border-t border-slate-800 pt-4 grid grid-cols-3 gap-2 text-xs">
                <button onClick={() => applyCustomPomodoro(25, 5, 1)} className="bg-slate-950/90 border border-slate-700 p-3 rounded-xl font-bold hover:border-indigo-500 text-slate-300">25 dk Çalış / 5 dk Mola</button>
                <button onClick={() => applyCustomPomodoro(50, 10, 1)} className="bg-slate-950/90 border border-slate-700 p-3 rounded-xl font-bold hover:border-indigo-500 text-slate-300">50 dk Çalış / 10 dk Mola</button>
                <button onClick={() => applyCustomPomodoro(45, 15, 4)} className="bg-slate-950/90 border border-slate-700 p-3 rounded-xl font-bold hover:border-indigo-500 text-slate-300">4x 45'li Uzun Blok</button>
              </div>
            </div>
          </div>
        )}

        {/* 4. KAYNAKLAR & HOCALAR TABI */}
        {activeTab === 'kaynaklar' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${activeThemeObj.card} p-6 rounded-2xl border ${activeThemeObj.border} space-y-4`}>
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">👨‍🏫 Hoca Listesini Yönet</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Yeni Hoca Adı ve Dersi" value={newTeacherInput} onChange={(e) => setNewTeacherInput(e.target.value)} className="flex-1 bg-slate-950/90 border border-slate-700 rounded-xl p-2.5 text-xs text-white" />
                <button onClick={addCustomTeacher} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Ekle</button>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {customTeachers.map((t, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-950/90 border border-slate-800/80 p-2 rounded-lg text-xs text-slate-300">
                    <span>{t}</span>
                    <button onClick={() => removeCustomTeacher(t)} className="text-red-400 hover:underline">Sil</button>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${activeThemeObj.card} p-6 rounded-2xl border ${activeThemeObj.border} space-y-4`}>
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">📚 Kaynak/Kitap Listesini Yönet</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Yeni Kitap / Yayın Adı" value={newBookInput} onChange={(e) => setNewBookInput(e.target.value)} className="flex-1 bg-slate-950/90 border border-slate-700 rounded-xl p-2.5 text-xs text-white" />
                <button onClick={addCustomBook} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Ekle</button>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {customBooks.map((b, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-950/90 border border-slate-800/80 p-2 rounded-lg text-xs text-slate-300">
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