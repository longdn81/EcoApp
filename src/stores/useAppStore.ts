import { create } from 'zustand';

export type ThemePreference = 'system' | 'light' | 'dark';

export interface AppState {
  // Demo counter state
  counter: number;
  increment: () => void;
  decrement: () => void;
  resetCounter: () => void;

  // Theme preference
  themePreference: ThemePreference;
  setThemePreference: (theme: ThemePreference) => void;

  // Favorites collection (e.g. for posts / items)
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;

  // Notification state
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: Math.max(0, state.counter - 1) })),
  resetCounter: () => set({ counter: 0 }),

  themePreference: 'system',
  setThemePreference: (themePreference) => set({ themePreference }),

  favoriteIds: [],
  toggleFavorite: (id) =>
    set((state) => {
      const exists = state.favoriteIds.includes(id);
      return {
        favoriteIds: exists
          ? state.favoriteIds.filter((favId) => favId !== id)
          : [...state.favoriteIds, id],
      };
    }),
  isFavorite: (id) => get().favoriteIds.includes(id),

  notificationsEnabled: true,
  toggleNotifications: () =>
    set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
}));

