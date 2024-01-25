import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface GameList {
  [key: string]: string;
}

interface LastPlayedStore {
  lastGames: GameList;
  getLastGames: () => string[];
  setLastGame: (id: string) => void;
}

export const useLastPlayedStore = create<LastPlayedStore>()(
  persist(
    devtools(
      immer((set, get) => ({
        lastGames: {},
        getLastGames() {
          const { lastGames } = get();

          const lastGamesList = Object.values(lastGames);
          return lastGamesList.slice(-20);
        },
        setLastGame(id) {
          set((s) => {
            s.lastGames[id] = id;
          });
        },
      })),
      { name: 'LAST_PLAYED' },
    ),
    { name: 'AsyncStorage', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
