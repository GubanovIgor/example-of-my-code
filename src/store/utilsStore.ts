import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { GUTTER_SIZE } from 'config/theme';

import { HEADER_HEIGHT, SCREEN_HEIGHT } from 'constants/DIMENSIONS';

interface CustomModaData {
  message: string;
  isVisible: boolean;
  type?: 'success' | 'error';
}

interface UtilsStore {
  //Modal related
  customModalData: CustomModaData;
  setCustomModalData: (data: CustomModaData) => void;
  //BottomSheet related
  screensGestureResponseDistances: Record<string, number>;
  setScreenGestureResponseDistance: (key: string, height: number) => void;
}

export const useUtilsStore = create<UtilsStore>()(
  devtools(
    immer((set) => ({
      customModalData: { message: '', isVisible: false, type: 'error' },
      screensGestureResponseDistances: {},
      setCustomModalData(data: CustomModaData) {
        set(({}) => ({
          customModalData: data,
        }));
      },
      setScreenGestureResponseDistance(key: string, height: number) {
        set(({}) => ({
          screensGestureResponseDistances: {
            ...this.screensGestureResponseDistances,
            [key]: SCREEN_HEIGHT - height + HEADER_HEIGHT + GUTTER_SIZE * 5,
          },
        }));
      },
    })),
    { name: 'UTILS' },
  ),
);
