import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILanguage } from 'core/interfaces';
import i18next from 'i18next';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface LocalisationStore {
  languages: ILanguage[];
  currentLanguage: ILanguage;
  setCurrentLanguage: (lang: ILanguage) => void;
}

const LOCAL_LANGUAGES = [
  { key: 'en', name: 'English' },
  { key: 'pt', name: 'Portuguese' },
];

export const useLocalisationStore = create<LocalisationStore>()(
  persist(
    devtools(
      immer((set) => ({
        languages: LOCAL_LANGUAGES,
        currentLanguage: LOCAL_LANGUAGES[0],
        setCurrentLanguage(lang) {
          set(() => ({
            currentLanguage: lang,
          }));
          i18next.changeLanguage(lang?.key);
        },
      })),
      { name: 'LOCALISATION' },
    ),
    { name: 'AsyncStorage', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
