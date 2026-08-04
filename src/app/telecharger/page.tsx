'use client';

import { useState } from 'react';

export default function TelechargerPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const downloadFile = async (filename: string, label: string) => {
    setDownloading(label);
    try {
      const res = await fetch(`/api/download?file=${filename}`);
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Erreur de téléchargement. Réessayez.');
    }
    setDownloading(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2" style={{ fontFamily: 'Cinzel, serif', color: '#D4AF37' }}>
          UZALUS V2
        </h1>
        <p className="text-center text-white/60 mb-10">Téléchargement des fichiers du projet</p>

        <div className="space-y-4">
          <button
            onClick={() => downloadFile('UZALUS_V2_SansVideo.zip', 'code')}
            disabled={downloading !== null}
            className="w-full p-5 rounded-xl border border-[#D4AF37]/30 bg-white/5 hover:bg-[#D4AF37]/10 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-lg">Code du site</p>
                <p className="text-white/50 text-sm mt-1">UZALUS_V2_SansVideo.zip (1.7 MB)</p>
                <p className="text-white/40 text-xs mt-1">Toutes les pages, composants, images, configuration</p>
              </div>
              <span className="text-[#D4AF37] text-2xl">{downloading === 'code' ? '...' : '>'}</span>
            </div>
          </button>

          <button
            onClick={() => downloadFile('video_hero.zip', 'video')}
            disabled={downloading !== null}
            className="w-full p-5 rounded-xl border border-[#D4AF37]/30 bg-white/5 hover:bg-[#D4AF37]/10 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-lg">Video Heros</p>
                <p className="text-white/50 text-sm mt-1">video_hero.zip (2.2 MB)</p>
                <p className="text-white/40 text-xs mt-1">A placer dans public/videos/hero.mp4</p>
              </div>
              <span className="text-[#D4AF37] text-2xl">{downloading === 'video' ? '...' : '>'}</span>
            </div>
          </button>

          <button
            onClick={() => downloadFile('UZALUS_V2_Complet.zip', 'complet')}
            disabled={downloading !== null}
            className="w-full p-5 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#D4AF37] text-lg">Tout en un</p>
                <p className="text-white/50 text-sm mt-1">UZALUS_V2_Complet.zip (17 MB)</p>
                <p className="text-white/40 text-xs mt-1">Code + images + video (tout inclus)</p>
              </div>
              <span className="text-[#D4AF37] text-2xl">{downloading === 'complet' ? '...' : '>'}</span>
            </div>
          </button>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-white/5 text-white/60 text-sm">
          <p className="font-bold text-white mb-2">Apres le telechargement :</p>
          <ol className="list-decimal ml-4 space-y-1">
            <li>Dezippe le dossier</li>
            <li>Ouvre un terminal dans le dossier</li>
            <li>Tape <code className="bg-white/10 px-2 py-0.5 rounded">npm install</code></li>
            <li>Tape <code className="bg-white/10 px-2 py-0.5 rounded">npm run dev</code></li>
            <li>Ouvre <code className="bg-white/10 px-2 py-0.5 rounded">localhost:3000</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
