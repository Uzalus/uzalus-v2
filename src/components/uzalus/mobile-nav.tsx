'use client';

import { Home, Grid3X3, Heart, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n-context';

interface TabItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  labelKey: string;
  badge?: number;
}

const tabs: TabItem[] = [
  { id: 'home', icon: Home, labelKey: 'mob.home' },
  { id: 'categories', icon: Grid3X3, labelKey: 'mob.categories' },
  { id: 'favorites', icon: Heart, labelKey: 'mob.favorites' },
  { id: 'cart', icon: ShoppingCart, labelKey: 'mob.cart' },
  { id: 'account', icon: User, labelKey: 'mob.account' },
];

export default function MobileNav() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<string>('home');

  const handleTabClick = (tab: TabItem) => {
    setActiveTab(tab.id);
    if (tab.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab.id === 'categories') {
      const el = document.getElementById('categories');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-noir/95 backdrop-blur-lg border-t border-border"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const label = t(tab.labelKey);

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className="flex flex-col items-center justify-center gap-0.5 relative w-14 h-full transition-colors"
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon
                  size={20}
                  className={`transition-colors ${isActive ? 'text-gold' : 'text-muted-foreground'}`}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -end-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-gold' : 'text-muted-foreground'
                }`}
              >
                {label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-gold rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
