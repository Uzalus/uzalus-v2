# UZALUS V3 — E-Commerce Multicatégorie International

## 🚀 Installation

```bash
npm install
```

## ⚙️ Configuration

1. Copier `env.example` vers `.env.local`
2. Ajouter vos clés API CJ Dropshipping (`CJ_API_KEY`, `CJ_EMAIL`)
3. Ajouter votre clé Google AdSense (`NEXT_PUBLIC_ADSENSE_CLIENT_ID`)
4. Ajouter votre clé OpenAI pour le chat widget

## 💻 Développement

```bash
npm run dev
```

## 📦 Build Production

```bash
npm run build
npm start
```

## 🌐 Déploiement Vercel

1. Push le projet sur GitHub (branche `main`)
2. Connecter le repo sur [vercel.com](https://vercel.com)
3. Ajouter les variables d'environnement dans **Settings > Environment Variables**
4. Déployer

## 📂 Structure du Projet

```
src/
├── app/
│   ├── page.tsx          # Homepage principale
│   ├── layout.tsx         # Layout racine
│   ├── globals.css        # Styles globaux + thème noir-or
│   └── api/cj/            # API routes CJ Dropshipping
├── components/
│   ├── uzalus/            # Composants UZALUS
│   │   ├── navbar.tsx     # Navbar avec 18 catégories
│   │   ├── hero-redesigned.tsx  # Hero vidéo + photo
│   │   ├── shop-categories.tsx  # Grille des catégories
│   │   ├── category-page.tsx   # Page catégorie avec filtres
│   │   ├── flash-sales.tsx     # Ventes flash avec countdown
│   │   ├── trust-bar.tsx       # Barre de confiance
│   │   ├── footer.tsx          # Footer complet
│   │   ├── mobile-nav.tsx      # Navigation mobile
│   │   └── ...
│   └── ui/                # Composants UI (shadcn)
├── lib/
│   ├── shop-data.ts       # 18 catégories, niches, filtres spécifiques
│   ├── i18n.ts            # Traductions FR/EN/ES/AR
│   ├── i18n-context.tsx   # Context React pour i18n
│   └── cj-api.ts          # Client API CJ Dropshipping
└── hooks/
```

## 🎨 Thème

- **Couleurs**: Noir `#0B0B0B` / Or `#D4AF37`
- **Langues**: Français, English, Español, العربية (RTL)

## 📋 18 Catégories

1. Mode Homme (12 niches)
2. Mode Femme (13 niches)
3. Enfant (10 niches)
4. Chaussures (11 niches)
5. Maison & Déco (14 niches)
6. Accessoires (11 niches)
7. Téléphones & Tablettes (12 niches)
8. Parfums & Cosmétiques (11 niches)
9. Auto & Moto (22 niches)
10. Emballage (18 niches)
11. Électronique (15 niches)
12. Sport & Loisirs (12 niches)
13. Bricolage (14 niches)
14. Animaux (10 niches)
15. Enfants & Jouets (10 niches)
16. Bureau (10 niches)
17. Bagagerie (8 niches)
18. Alimentation (8 niches)