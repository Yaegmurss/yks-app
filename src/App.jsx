<button onClick={() => toggleItemStatus(item.id, item.status === 'success' ? 'pending' : 'success')} className={`px-3 py-1.5 rounded-xl font-bold ${item.status === 'success' ? 'bg-emerald-600 text-white' : `${isLight ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}`}>
                              {item.status === 'success' ? '✅ Tamamlandı' : 'Çalışılmadı'}
                            </button>
                            <button onClick={() => removeScheduleItem(item.id)} className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-2.5 py-1.5 rounded-xl transition-colors">🗑️</button>
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
                {/* 1. Ders */}
                <div className={`${currentTheme.subCard} border ${currentTheme.border} p-3 rounded-xl space-y-2`}>
                  <span className="font-bold text-indigo-400 block">{denemeType === 'TYT' ? 'Türkçe' : 'Matematik'}</span>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Doğru" value={scores.d1} onChange={(e) => setScores({ ...scores, d1: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                    <input type="number" placeholder="Yanlış" value={scores.y1} onChange={(e) => setScores({ ...scores, y1: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                  </div>
                  <span className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} block text-right font-mono`}>Net: {calcNet(scores.d1, scores.y1).toFixed(2)}</span>
                </div>

                {/* 2. Ders */}
                <div className={`${currentTheme.subCard} border ${currentTheme.border} p-3 rounded-xl space-y-2`}>
                  <span className="font-bold text-sky-400 block">{denemeType === 'TYT' ? 'Sosyal Bilimler' : 'Fen Bilimleri'}</span>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Doğru" value={scores.d2} onChange={(e) => setScores({ ...scores, d2: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                    <input type="number" placeholder="Yanlış" value={scores.y2} onChange={(e) => setScores({ ...scores, y2: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                  </div>
                  <span className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} block text-right font-mono`}>Net: {calcNet(scores.d2, scores.y2).toFixed(2)}</span>
                </div>

                {/* 3. Ders */}
                <div className={`${currentTheme.subCard} border ${currentTheme.border} p-3 rounded-xl space-y-2`}>
                  <span className="font-bold text-purple-400 block">{denemeType === 'TYT' ? 'Temel Matematik' : 'Türk Dili ve Ed. / Sos-1'}</span>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Doğru" value={scores.d3} onChange={(e) => setScores({ ...scores, d3: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                    <input type="number" placeholder="Yanlış" value={scores.y3} onChange={(e) => setScores({ ...scores, y3: e.target.value })} className={`w-full ${isLight ? 'bg-white' : 'bg-slate-900'} border ${currentTheme.border} rounded p-1 text-center`} />
                  </div>
                  <span className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'} block text-right font-mono`}>Net: {calcNet(scores.d3, scores.y3).toFixed(2)}</span>
                </div>

                {/* 4. Ders */}
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

        {/* 3. POMODORO / BLOK TABI - Arka Plan Sesleri ile Güncellendi */}
        {activeTab === 'pomodoro' && (
          <div className="space-y-6">
            <div className={`${currentTheme.card} p-6 rounded-2xl border ${currentTheme.border} text-center max-w-xl mx-auto space-y-6 shadow-2xl`}>
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

              {/* Arka Plan Sesleri Seçim Bölümü */}
              <BackgroundSoundController currentTheme={currentTheme} isLight={isLight} isRunning={isRunning} />

              <div className="pt-4 border-t border-slate-700/50 space-y-3">
                <h4 className={`text-xs font-bold ${currentTheme.text} uppercase tracking-wider`}>⚙️ Süre Ayarları</h4>
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
                <button onClick={() => applyCustomPomodoro(customWorkTime, customBreakTime, targetBlocks)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs">Ayarları Uygula ve Sıfırla</button>
              </div>
            </div>
          </div>
        )}

        {/* 4. KAYNAKLAR & HOCALAR TABI */}
        {activeTab === 'kaynaklar' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hocalar Yönetimi */}
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

              {/* Kaynaklar Yönetimi */}
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

// Arka Plan Sesleri Yönetim Bileşeni (Web Audio API ile Sentezlenmiş Ortam Sesleri)
function BackgroundSoundController({ currentTheme, isLight, isRunning }) {
  const [selectedSound, setSelectedSound] = useState('none');
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  useEffect(() => {
    let audioInterval = null;

    // Seçilen sese göre Web Audio API kullanarak arka plan sesleri üretiyoruz
    if (isSoundPlaying && selectedSound !== 'none') {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        if (selectedSound === 'rain') {
          // Yağmur Sesi (White/Pink Noise generator simülasyonu)
          const bufferSize = 2 * audioCtx.sampleRate;
          const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
          }

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

          audioInterval = {
            stop: () => {
              try { whiteNoise.stop(); audioCtx.close(); } catch(e){}
            }
          };
        } else if (selectedSound === 'study') {
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

          audioInterval = {
            stop: () => {
              try { noise.stop(); audioCtx.close(); } catch(e){}
            }
          };
        } else if (selectedSound === 'fire') {
          // Şömine Sesi (Çatırtı efekti)
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
          // Hafif Müzik / Akor Sesi
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

  return (
    <div className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.subCard} space-y-3 text-left`}>
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
      <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'} italic`}>
        * İstediğin ortam sesini seçerek odaklanma kaliteni artırabilirsin. Özellikle "Deneme Ortamı" sınav atmosferini simüle eder.
      </p>
    </div>
  );
}