'use client';

import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/uzalus/navbar';
import { Footer } from '@/components/uzalus/footer';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import MobileNav from '@/components/uzalus/mobile-nav';
import {
  FileText,
  Image as ImageIcon,
  Music,
  Languages,
  QrCode,
  Scissors,
  ArrowLeft,
} from 'lucide-react';

const tools = [
  { name: 'PDF → Word', desc: 'Convertir un fichier PDF en document Word', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Word → PDF', desc: 'Convertir un document Word en fichier PDF', icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10' },
  { name: 'Compresser PDF', desc: 'Réduire la taille de vos fichiers PDF', icon: FileText, color: 'text-red-400', bg: 'bg-red-500/10' },
  { name: 'Fusionner PDF', desc: 'Assembler plusieurs PDF en un seul', icon: Scissors, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { name: 'Diviser PDF', desc: 'Extraire des pages d\'un PDF', icon: Scissors, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { name: 'JPG → PDF', desc: 'Convertir vos images en PDF', icon: ImageIcon, color: 'text-teal-400', bg: 'bg-teal-500/10' },
  { name: 'PDF → JPG', desc: 'Convertir vos PDF en images', icon: ImageIcon, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { name: 'Traduction', desc: 'Traduire du texte dans plusieurs langues', icon: Languages, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { name: 'MP4 → MP3', desc: "Extraire l\'audio d\'une vidéo", icon: Music, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { name: "Supprimer arrière-plan", desc: 'Retirer l\'arrière-plan de vos images', icon: ImageIcon, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { name: 'Générer QR Code', desc: 'Créer un QR Code personnalisé', icon: QrCode, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
];

export default function ToolsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-noir pb-20 md:pb-0">
      <Navbar onCartClick={() => {}} onProfileClick={() => {}} />

      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm text-gold hover:text-gold-light font-semibold mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Retour à l\'accueil
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl sm:text-4xl font-bold gold-text mb-2">
              UZALUS TOOLS
            </h1>
            <p className="text-sm text-muted-foreground">
              Des outils gratuits et puissants pour simplifier votre quotidien
            </p>
          </div>

          {/* Tools grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="group p-6 rounded-2xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(212,175,55,0.06)]"
                >
                  <div className={`w-14 h-14 rounded-xl ${tool.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={28} className={tool.color} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1.5 group-hover:text-gold transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tool.desc}
                  </p>
                  <div className="mt-4">
                    <span className="text-[10px] uppercase tracking-wider text-gold/60 font-semibold">
                      Bientôt disponible
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
      <MobileNav />
    </div>
  );
}
