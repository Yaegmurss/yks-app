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
  const [activeTab, setActiveTab] = useState('pomodoro');
  const [themeIndex, setThemeIndex] = useState(0);
  const currentTheme = THEMES[themeIndex] || THEMES[0];
  const isLight = currentTheme.bg.includes('-50') || currentTheme.bg.includes('-100');

  // Pomodoro & Ses State'leri
  const [customWorkTime, setCustomWorkTime] = useState(25);
  const [customBreakTime, setCustomBreakTime] = useState(5);
  const [targetBlocks, setTargetBlocks] = useState(1);
  const [currentBlock, setCurrentBlock] = useState(1);
  const [pomodoroMode, setPomodoroMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Arka Plan Sesi State'leri (Doğrudan Pomodoro ekranında yer alacak)
  const [selectedSound, setSelectedSound] = useState('none');
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  // Ses Sentezleme Motoru (Web Audio API)
  useEffect(() => {
    let audioInterval = null;
    if (isSoundPlaying && selectedSound !== 'none') {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        if (selectedSound === 'study') {
          // Deneme Ortamı / Kütüphane Uğultusu Sesi
          const bufferSize = 2 * audioCtx.sampleRate;
          const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * 0.3;
          }
          const noise = audioCtx.createBufferSource();
          noise.buffer = noiseBuffer;
          noise.loop = true;
          const filter = audioCtx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 400;
          const gain = audioCtx.createGain();
          gain.gain.value = 0.08;
          noise.connect(filter);
          filter.connect(gain);
          gain.connect(audioCtx.destination);
          noise.start();

          audioInterval = { stop: () => { try { noise.stop(); audioCtx.close(); } catch(e){} } };
        } else if (selectedSound === 'rain') {
          // Yağmur Sesi
          const bufferSize = 2 * audioCtx.sampleRate;
          const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) { output[i] = Math.random() * 2 - 1; }
          const whiteNoise = audioCtx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;
          const filter = audioCtx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = 1000;
          const gain = audioCtx.createGain();
          gain.gain.value = 0.05;
          whiteNoise.connect(filter);
          filter.connect(gain);
          gain.connect(audioCtx.destination);
          whiteNoise.start();

          audioInterval = { stop: () => { try { whiteNoise.stop(); audioCtx.close(); } catch(e){} } };
        } else if (selectedSound === 'fire') {
          // Şömine Sesi
          audioInterval = setInterval(() => {
            if (Math.random() > 0.4) {
              const osc = audioCtx.createOscillator();
              const gain = audioCtx.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(80 + Math.random() * 150, audioCtx.currentTime);
              gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
              osc.connect(gain);
              gain.connect(audioCtx.destination);
              osc.start();
              osc.stop(audioCtx.currentTime + 0.08);
            }
          }, 120);
        } else if (selectedSound === 'birds') {
          // Kuş Sesleri
          audioInterval = setInterval(() => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            const startFreq = 2000 + Math.random() * 1500;
            osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(startFreq + 800, audioCtx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.15);
          }, 800);
        } else if (selectedSound === 'lofi') {
          // Hafif Müzik / Akor
          const notes = [261.63, 329.63, 392.00, 523.25];
          audioInterval = setInterval(() => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            const freq = notes[Math.floor(Math.random() * notes.length)];
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.2);
          }, 1500);
        }

        return () => {
          if (audioInterval) {
            if (typeof audioInterval.stop === 'function') audioInterval.stop();
            else clearInterval(audioInterval);
          }
        };
      } catch (e) {}
    }
  }, [isSoundPlaying, selectedSound]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${isLight ? 'text-slate-900' : 'text-white'} p-3 md:p-6 font-sans`}>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* POMODORO / BLOK SEKMESİ */}
        {activeTab === 'pomodoro' && (
          <div className={`${currentTheme.card} p-6 rounded-2xl border ${currentTheme.border} text-center space-y-6 shadow-2xl`}>

            {/* ÇALIŞMA AYARLARI VE ARKA PLAN SESLERİ BÖLÜMÜ */}
            <div className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.subCard} space-y-4 text-left`}>
              <h3 className={`text-xs font-bold ${currentTheme.text} uppercase tracking-wider text-center`}>
                ⚙️ ÇALIŞMA AYARLARI & ARKA PLAN SESİ
              </h3>

              {/* Süre Ayarları */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className={`block text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} mb-1 font-bold`}>Çalışma (dk)</label>
                  <input type="number" value={customWorkTime} onChange={(e) => setCustomWorkTime(e.target.value)} className={`w-full ${currentTheme.subCard} border ${currentTheme.border} rounded p-1.5 text-center font-bold`} />
                </div>
                <div>
                  <label className={`block text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} mb-1 font-bold`}>Mola (dk)</label>
                  <input type="number" value={customBreakTime} onChange={(e) => setCustomBreakTime(e.target.value)} className={`w-full ${currentTheme.subCard} border ${currentTheme.border} rounded p-1.5 text-center font-bold`} />
                </div>
                <div>
                  <label className={`block text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} mb-1 font-bold`}>Blok Sayısı (Etüt)</label>
                  <input type="number" value={targetBlocks} onChange={(e) => setTargetBlocks(e.target.value)} className={`w-full ${currentTheme.subCard} border ${currentTheme.border} rounded p-1.5 text-center font-bold`} />
                </div>
              </div>

              {/* Hızlı Seçim Butonları */}
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                <button onClick={() => { setCustomWorkTime(25); setCustomBreakTime(5); setTargetBlocks(1); setTimeLeft(25*60); }} className="px-3 py-1.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-lg text-xs font-bold">⚡ Tekil (25/5 dk)</button>
                <button onClick={() => { setCustomWorkTime(50); setCustomBreakTime(10); setTargetBlocks(2); setTimeLeft(50*60); }} className="px-3 py-1.5 bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold">🪵 2 Blok (50/10 dk)</button>
                <button onClick={() => { setCustomWorkTime(40); setCustomBreakTime(10); setTargetBlocks(3); setTimeLeft(40*60); }} className="px-3 py-1.5 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-lg text-xs font-bold">🚀 3 Blok Maraton</button>
              </div>

              {/* ARKA PLAN SESİ SEÇİMİ (İstediğin Bölüm) */}
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

            </div>

            {/* Sayaç Ekranı */}
            <div className="flex justify-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${pomodoroMode === 'work' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                {pomodoroMode === 'work' ? `🧠 ÇALIŞMA (${currentBlock}/${targetBlocks}. BLOK)` : '☕ DİNLENME MOLASI'}
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
        )}

      </div>
    </div>
  );
}