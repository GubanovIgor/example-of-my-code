import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserAccountQuery as Query } from 'core/queries';
import { immer } from 'zustand/middleware/immer';
import { fetchQuery } from 'relay-runtime';
import { getClientEnvironment } from 'relay/index';
import {
  UserAccountQuery,
  UserAccountQuery$data,
} from 'queries/__generated__/UserAccountQuery.graphql';

interface IUserDetails {
  currencyDisplayShortSign?: string;
}

interface UserStore {
  isError: boolean;
  userAccountRef: UserAccountQuery$data | null;
  userDetails: IUserDetails;
  setUserDetails: (arg: Partial<IUserDetails>) => void;
  getUserAccount: () => void;
  balance?: number;
  setBalance: (balance?: number) => void;
  routeName: string | null;
  setRouteName: (routeName: string | null) => void;
}

let fetchErrorCount = 0;

const MAX_FETCH_COUNT = 3;
const TIMEOUT_AFTER_ERROR = 2000;

export const useUserStore = create<UserStore>()(
  devtools(
    immer((set) => ({
      isError: false,
      userAccountRef: null,
      userDetails: { currencyDisplayShortSign: '' },
      setUserDetails(arg) {
        set((s) => ({ userDetails: { ...s.userDetails, ...arg } }));
      },
      balance: undefined,
      setBalance(balance) {
        set(() => ({
          balance,
        }));
      },
      routeName: null,
      setRouteName(routeName) {
        set(() => ({
          routeName: routeName,
        }));
      },
      async getUserAccount() {
        try {
          const res = await fetchQuery<UserAccountQuery>(
            getClientEnvironment(),
            Query,
            {},
          ).toPromise();

          set(() => ({
            isError: false,
            userAccountRef: res,
          }));
        } catch (error) {
          if (fetchErrorCount === MAX_FETCH_COUNT) return;

          setTimeout(() => {
            fetchErrorCount++;
            set(() => ({
              isError: true,
            }));
          }, TIMEOUT_AFTER_ERROR);
        }
      },
    })),
    { name: 'USER' },
  ),
);
