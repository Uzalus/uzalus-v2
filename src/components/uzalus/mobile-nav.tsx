'use client';

import { Home, Grid3X3, Heart, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';

interface TabItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  label: string;
  badge?: number;
}

const tabs: TabItem[] = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'categories', icon: Grid3X3, label: 'Categories' },
  { id: 'favorites', icon: Heart, label: 'Favorites' },
  { id: 'cart', icon: ShoppingCart, label: 'Cart', badge: 4 },
  { id: 'account', icon: User, label: 'Account' },
];

export function MobileNav() {
  const [activeTab, setActiveTab] = useState<string>('home');

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

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center justify-center gap-0.5 relative w-14 h-full transition-colors"
              aria-label={tab.label}
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
                {tab.label}
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
