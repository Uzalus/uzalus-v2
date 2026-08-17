'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  pid: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (pid: string) => void;
  updateQuantity: (pid: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      open: function () { set({ isOpen: true }); },
      close: function () { set({ isOpen: false }); },
      toggle: function () { set(function (s) { return { isOpen: !s.isOpen }; }); },

      addItem: function (item) {
        set(function (state) {
          const existing = state.items.find(function (i) { return i.pid === item.pid; });
          if (existing) {
            return {
              items: state.items.map(function (i) {
                return i.pid === item.pid
                  ? { ...i, quantity: i.quantity + 1 }
                  : i;
              }),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: function (pid) {
        set(function (state) {
          return { items: state.items.filter(function (i) { return i.pid !== pid; }) };
        });
      },

      updateQuantity: function (pid, quantity) {
        if (quantity <= 0) {
          get().removeItem(pid);
          return;
        }
        set(function (state) {
          return {
            items: state.items.map(function (i) {
              return i.pid === pid ? { ...i, quantity: quantity } : i;
            }),
          };
        });
      },

      clearCart: function () { set({ items: [] }); },

      totalItems: function () {
        return get().items.reduce(function (sum, i) { return sum + i.quantity; }, 0);
      },

      totalPrice: function () {
        return get().items.reduce(function (sum, i) { return sum + i.price * i.quantity; }, 0);
      },
    }),
    {
      name: 'uzalus-cart',
      partialize: function (state) { return { items: state.items }; },
    }
  )
);

/* ---------- Wishlist store ---------- */

interface WishlistState {
  items: string[]; // pids
  toggle: (pid: string) => void;
  isLiked: (pid: string) => boolean;
  count: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: function (pid) {
        set(function (s) {
          const exists = s.items.includes(pid);
          return {
            items: exists
              ? s.items.filter(function (id) { return id !== pid; })
              : [...s.items, pid],
          };
        });
      },
      isLiked: function (pid) { return get().items.includes(pid); },
      count: function () { return get().items.length; },
    }),
    { name: 'uzalus-wishlist' }
  )
);
