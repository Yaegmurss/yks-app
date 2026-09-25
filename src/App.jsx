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

// Geri Sayım Bileşeni
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
    <div className="bg-slate-800/90 backdrop-blur-md p-5 rounded-2xl border border-slate-700 shadow-xl text-center space-y-3">
      <h3 className="text-sm md:text-base font-bold text-indigo-400 uppercase tracking-wider">
        ⏳ 2027 YKS'ye Kalan Süre
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
        <div className="bg-slate-900/90 border border-slate-700/80 p-3 rounded-xl">
          <span className="text-2xl md:text-3xl font-black font-mono text-white block">{timeLeft.days}</span>
          <span className="text-xs text-slate-400 font-bold uppercase">Gün</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-700/80 p-3 rounded-xl">
          <span className="text-2xl md:text-3xl font-black font-mono text-indigo-300 block">{timeLeft.hours}</span>
          <span className="text-xs text-slate-400 font-bold uppercase">Saat</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-700/80 p-3 rounded-xl">
          <span className="text-2xl md:text-3xl font-black font-mono text-purple-300 block">{timeLeft.minutes}</span>
          <span className="text-xs text-slate-400 font-bold uppercase">Dakika</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-700/80 p-3 rounded-xl">
          <span className="text-2xl md:text-3xl font-black font-mono text-emerald-300 block">{timeLeft.seconds}</span>
          <span className="text-xs text-slate-400 font-bold uppercase">Saniye</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('program');
  const [bgColor, setBgColor] = useState(() => localStorage.getItem('yks_bgColor') || 'bg-slate-900');

  useEffect(() => {
    localStorage.setItem('yks_bgColor', bgColor);
  }, [bgColor]);

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
  const [formStartTime, setFormStartTime] = useState('09:00');
  const [formDuration, setFormDuration] = useState('60');
  const [formYtUrl, setFormYtUrl] = useState('');
  const [formYtSpeed, setFormYtSpeed] = useState('1');

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const handleYtUrlChange = (val) => {
    setFormYtUrl(val);
    const lowerVal = val.toLowerCase();
    const foundTeacher = customTeachers.find(t => lowerVal.includes(t.split(' ')[0].toLowerCase()));
    if (foundTeacher) setFormTeacher(foundTeacher);
  };

  const addScheduleItem = () => {
    const rawDuration = parseFloat(formDuration) || 0;
    const speed = parseFloat(formYtSpeed) || 1;
    const netVideoMinutes = Math.round(rawDuration / speed);
    const usedBook = formBook.trim() || 'Genel Kaynak';

    if (!customBooks.includes(usedBook)) {
      setCustomBooks([...customBooks, usedBook]);
    }

    const newItem = {
      id: Date.now(),
      month: formMonth,
      date: formDate,
      day: formDay,
      subject: formSubject,
      teacher: formTeacher,
      book: usedBook,
      startTime: formStartTime,
      duration: rawDuration,
      ytUrl: formYtUrl,
      ytSpeed: speed,
      netDuration: netVideoMinutes,
      embedUrl: getEmbedUrl(formYtUrl),
      status: 'pending'
    };

    setSchedule([...schedule, newItem]);
    setFormYtUrl('');
    setFormBook('');
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

  const playBeepSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.value = 800;
      gain.gain.value = 0.5;
      osc.start();
      setTimeout(() => osc.stop(), 1000);
    } catch (e) {}
  };

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      playBeepSound();

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
    <div className={`min-h-screen ${bgColor} text-white p-3 md:p-6 font-sans transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Üst Menü */}
        <header className="bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold text-indigo-400">
              ⚡ YKS Çalışma Masası <span className="italic text-sm font-normal text-slate-400 ml-2">By Yağmur</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setActiveTab('program')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'program' ? 'bg-indigo-600' : 'bg-slate-900 text-slate-400'}`}>📊 Program</button>
            <button onClick={() => setActiveTab('deneme')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'deneme' ? 'bg-indigo-600' : 'bg-slate-900 text-slate-400'}`}>📈 Denemeler</button>
            <button onClick={() => setActiveTab('pomodoro')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'pomodoro' ? 'bg-indigo-600' : 'bg-slate-900 text-slate-400'}`}>⏱️ Pomodoro / Blok</button>
            <button onClick={() => setActiveTab('kaynaklar')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'kaynaklar' ? 'bg-indigo-600' : 'bg-slate-900 text-slate-400'}`}>📚 Kaynaklar & Hocalar</button>

            <button onClick={resetAllData} className="bg-red-600/80 hover:bg-red-600 px-3 py-2 rounded-xl text-xs font-bold border border-red-500/50">🗑️ Sıfırla</button>
          </div>
        </header>

        {/* YKS Geri Sayım Kartı */}
        <YksCountdownCard />

        {/* 1. DERS PROGRAMI TABI */}
        {activeTab === 'program' && (
          <div className="space-y-6">
            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold">📅 Görüntülenen Ay:</span>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold rounded-lg px-3 py-1.5 text-xs">
                  {MONTHS.map(m => <option key={m} value={m}>{m} Ayı</option>)}
                </select>
              </div>
              <span className="text-xs text-slate-400">Seçili ayda toplam <strong>{monthSchedule.length}</strong> ders kaydı var.</span>
            </div>

            {/* Ders Ekleme Formu */}
            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">➕ Ders / Video Ekle</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-2 text-xs">
                <select value={formMonth} onChange={(e) => setFormMonth(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg p-2 font-bold text-indigo-300">
                  {MONTHS.map(m => <option key={m} value={m}>{m} Ayı</option>)}
                </select>
                <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg p-2" />
                <select value={formDay} onChange={(e) => setFormDay(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg p-2">
                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <input type="time" value={formStartTime} onChange={(e) => setFormStartTime(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg p-2" />
                <select value={formSubject} onChange={(e) => setFormSubject(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg p-2">
                  <option value="Matematik">Matematik</option><option value="Geometri">Geometri</option><option value="Fizik">Fizik</option><option value="Kimya">Kimya</option><option value="Biyoloji">Biyoloji</option><option value="Türkçe">Türkçe</option><option value="Tarih">Tarih</option><option value="Coğrafya">Coğrafya</option>
                </select>
                <select value={formTeacher} onChange={(e) => setFormTeacher(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg p-2">
                  {customTeachers.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input type="text" placeholder="Kaynak Yazın" value={formBook} onChange={(e) => setFormBook(e.target.value)} list="books-list" className="bg-slate-900 border border-slate-700 rounded-lg p-2" />
                <datalist id="books-list">{customBooks.map((b, i) => <option key={i} value={b} />)}</datalist>
                <input type="number" placeholder="Süre (dk)" value={formDuration} onChange={(e) => setFormDuration(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg p-2" />
                <input type="text" placeholder="YouTube Linki" value={formYtUrl} onChange={(e) => handleYtUrlChange(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg p-2 col-span-2 md:col-span-1" />
                <select value={formYtSpeed} onChange={(e) => setFormYtSpeed(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg p-2">
                  <option value="1">1.0x</option><option value="1.25">1.25x</option><option value="1.5">1.5x</option><option value="1.75">1.75x</option><option value="2">2.0x</option>
                </select>
              </div>
              <button onClick={addScheduleItem} className="w-full bg-indigo-600 hover:bg-indigo-700 font-bold py-2 rounded-xl text-xs">Listeye Ekle</button>
            </div>

            {/* Ders Listesi */}
            <div className="space-y-4">
              {activeDays.length === 0 ? (
                <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 text-center text-slate-400 text-sm italic">{selectedMonth} ayı için henüz ders eklenmedi.</div>
              ) : (
                activeDays.map((day) => {
                  const dayItems = monthSchedule.filter(item => item.day === day);
                  return (
                    <div key={day} className="bg-slate-800/90 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
                      <div className="bg-slate-900 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
                        <span className="font-bold text-sm text-indigo-400">📅 {day}</span>
                        <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">{dayItems.length} Ders</span>
                      </div>
                      <div className="divide-y divide-slate-700/60">
                        {dayItems.map((item) => (
                          <div key={item.id} className="p-3 md:p-4 hover:bg-slate-800/50 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="bg-purple-950 text-purple-300 font-bold px-2 py-0.5 rounded border border-purple-800/50">{item.date}</span>
                                <span className="bg-indigo-950 text-indigo-300 font-mono font-bold px-2 py-0.5 rounded border border-indigo-800/50">{item.startTime}</span>
                                <span className="font-bold text-sm text-white">{item.subject}</span>
                                <span className="text-slate-400">({item.teacher})</span>
                              </div>
                              <div className="text-slate-400 flex flex-wrap gap-3 pt-1">
                                <span>📖 Kaynak: <strong className="text-slate-200">{item.book}</strong></span>
                                <span>⏱️ Süre: <strong className="text-slate-200">{item.duration} dk</strong></span>
                              </div>
                            </div>
                            {item.embedUrl && (
                              <div className="w-full md:w-64 h-36 rounded-xl overflow-hidden border border-slate-700 shrink-0">
                                <iframe className="w-full h-full" src={item.embedUrl} title="Ders Video" allowFullScreen />
                              </div>
                            )}
                            <div className="flex items-center gap-2 self-end md:self-center">
                              <button onClick={() => toggleItemStatus(item.id, 'success')} className={`px-3 py-1.5 rounded-lg font-bold border ${item.status === 'success' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>✔</button>
                              <button onClick={() => toggleItemStatus(item.id, 'failed')} className={`px-3 py-1.5 rounded-lg font-bold border ${item.status === 'failed' ? 'bg-red-600 border-red-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>✖</button>
                              <button onClick={() => removeScheduleItem(item.id)} className="text-slate-500 hover:text-red-400 font-bold p-1 ml-2">🗑️</button>
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
            <div className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <h2 className="text-lg font-bold text-purple-400">✍️ Deneme Sonucu Ekle</h2>
                <div className="flex gap-2 bg-slate-900 p-1 rounded-xl border border-slate-700">
                  <button onClick={() => setDenemeType('TYT')} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${denemeType === 'TYT' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>TYT</button>
                  <button onClick={() => setDenemeType('AYT')} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${denemeType === 'AYT' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>AYT</button>
                </div>
              </div>
              <input type="text" value={denemeTitle} onChange={(e) => setDenemeTitle(e.target.value)} placeholder={`Deneme Adı (${denemeType})`} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {(denemeType === 'TYT' ? ['Türkçe', 'Sosyal', 'Matematik', 'Fen'] : ['Matematik', 'Fen Bilimleri', 'Ed-Sos1', 'Sosyal-2']).map((ders, index) => {
                  const num = index + 1;
                  return (
                    <div key={ders} className="bg-slate-900 p-3 rounded-xl border border-slate-700 space-y-1">
                      <span className="uppercase font-bold text-indigo-400">{ders}</span>
                      <div className="flex gap-2">
                        <input type="number" placeholder="D" value={scores[`d${num}`]} onChange={(e) => setScores({ ...scores, [`d${num}`]: e.target.value })} className="w-1/2 bg-slate-800 border border-slate-700 rounded p-1 text-center" />
                        <input type="number" placeholder="Y" value={scores[`y${num}`]} onChange={(e) => setScores({ ...scores, [`y${num}`]: e.target.value })} className="w-1/2 bg-slate-800 border border-slate-700 rounded p-1 text-center" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center bg-purple-950/40 p-3 rounded-xl border border-purple-800/50">
                <span className="text-sm font-bold">{denemeType} Toplam: {currentTotalNet.toFixed(2)} Net</span>
                <button onClick={saveDeneme} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-xs font-bold">Kaydet</button>
              </div>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="text-sm font-bold text-slate-300">📋 Kayıtlı Denemeler</h3>
              {denemeHistory.length === 0 ? <p className="text-xs text-slate-500 italic">Kayıtlı deneme yok.</p> : (
                denemeHistory.map(d => (
                  <div key={d.id} className="bg-slate-900 p-3 rounded-xl border border-slate-700 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-200">{d.title}</span> ({d.type})
                      <span className="text-slate-500 block pt-0.5">{d.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-base font-black text-purple-400">{d.totalNet} Net</span>
                      <button onClick={() => removeDeneme(d.id)} className="text-slate-500 hover:text-red-400 font-bold">🗑️</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 3. POMODORO TABI */}
        {activeTab === 'pomodoro' && (
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-2xl border border-slate-700 max-w-2xl mx-auto space-y-6 text-center">
            <h2 className="text-xl font-bold text-indigo-400">⏱️ Esnek Süreli & Bloklu Pomodoro</h2>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 space-y-3">
              <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">⚙️ Çalışma Ayarları</span>
              <div className="flex flex-wrap justify-center items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-300">Çalışma (dk):</span>
                  <input type="number" value={customWorkTime} onChange={(e) => applyCustomPomodoro(e.target.value, customBreakTime, targetBlocks)} className="w-16 bg-slate-800 border border-slate-600 rounded-lg p-1.5 text-center font-bold text-indigo-300" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-300">Mola (dk):</span>
                  <input type="number" value={customBreakTime} onChange={(e) => applyCustomPomodoro(customWorkTime, e.target.value, targetBlocks)} className="w-16 bg-slate-800 border border-slate-600 rounded-lg p-1.5 text-center font-bold text-emerald-300" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-300">Blok Sayısı (Etüt):</span>
                  <input type="number" min="1" value={targetBlocks} onChange={(e) => applyCustomPomodoro(customWorkTime, customBreakTime, e.target.value)} className="w-16 bg-slate-800 border border-slate-600 rounded-lg p-1.5 text-center font-bold text-amber-300" />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-1">
                <button onClick={() => applyCustomPomodoro(25, 5, 1)} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1 rounded-lg text-[11px]">⚡ Tekil (25/5 dk)</button>
                <button onClick={() => applyCustomPomodoro(50, 10, 2)} className="bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700 px-3 py-1 rounded-lg text-[11px] font-bold text-indigo-300">🧱 2 Blok (50/10 dk)</button>
                <button onClick={() => applyCustomPomodoro(45, 15, 3)} className="bg-purple-950/80 hover:bg-purple-900 border border-purple-700 px-3 py-1 rounded-lg text-[11px] font-bold text-purple-300">🚀 3 Blok Maraton</button>
              </div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${pomodoroMode === 'work' ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                {pomodoroMode === 'work' ? `🧠 ÇALIŞMA (${currentBlock}/${targetBlocks}. BLOK)` : '☕ MOLA'}
              </span>
            </div>

            <div className="text-6xl md:text-7xl font-mono font-extrabold tracking-widest text-indigo-300 bg-slate-900/90 py-8 rounded-3xl border border-slate-700 shadow-inner">
              {formatTime(timeLeft)}
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => setIsRunning(!isRunning)} className={`px-8 py-3 rounded-xl font-bold text-sm ${isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {isRunning ? '⏸️ Duraklat' : '▶️ Başlat'}
              </button>
              <button onClick={() => applyCustomPomodoro(customWorkTime, customBreakTime, targetBlocks)} className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-bold text-sm text-slate-300">
                🔄 Sıfırla
              </button>
            </div>
          </div>
        )}

        {/* 4. KAYNAKLAR & HOCALAR YÖNETİMİ TABI */}
        {activeTab === 'kaynaklar' && (
          <div className="space-y-8">
            {/* Kaynaklar Bölümü */}
            <div className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 space-y-6">
              <h2 className="text-lg font-bold text-emerald-400">📚 Kaynak Yönetimi</h2>
              <div className="flex gap-2 bg-slate-900 p-3 rounded-xl border border-slate-700 max-w-md">
                <input type="text" value={newBookInput} onChange={(e) => setNewBookInput(e.target.value)} placeholder="Yeni Yayın Ekle..." className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs flex-1 text-white" />
                <button onClick={addCustomBook} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold">➕ Ekle</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {customBooks.map((b, i) => (
                  <div key={i} className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 font-medium flex justify-between items-center">
                    <span className="truncate pr-2">{b}</span>
                    <button onClick={() => removeCustomBook(b)} className="text-slate-500 hover:text-red-400 text-sm font-bold">🗑️</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Hocalar Bölümü */}
            <div className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 space-y-6">
              <h2 className="text-lg font-bold text-indigo-400">👨‍🏫 Hoca Yönetimi</h2>
              <div className="flex gap-2 bg-slate-900 p-3 rounded-xl border border-slate-700 max-w-md">
                <input type="text" value={newTeacherInput} onChange={(e) => setNewTeacherInput(e.target.value)} placeholder="Örn: Hoca Adı (Ders)" className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs flex-1 text-white" />
                <button onClick={addCustomTeacher} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold">➕ Hoca Ekle</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {customTeachers.map((t, i) => (
                  <div key={i} className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 font-medium flex justify-between items-center">
                    <span className="truncate pr-2">{t}</span>
                    <button onClick={() => removeCustomTeacher(t)} className="text-slate-500 hover:text-red-400 text-sm font-bold">🗑️</button>
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