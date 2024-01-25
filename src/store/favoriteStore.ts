import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface GameList {
  [key: string]: string;
}

interface FavoriteStore {
  games: GameList;
  getGame: (by: string) => string | undefined;
  getGames: () => string[];
  setGame: (id: string, isDelete?: boolean) => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    devtools(
      immer((set, get) => ({
        games: {},
        getGame(by) {
          const { games } = get();
          return games[by];
        },
        getGames() {
          const { games } = get();
          return Object.values(games);
        },
        setGame(id, isDelete) {
          set((s) => {
            if (isDelete) {
              delete s.games[id];
              return;
            }
            s.games[id] = id;
          });
        },
      })),
      { name: 'FAVORITE' },
    ),
    { name: 'AsyncStorage', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
