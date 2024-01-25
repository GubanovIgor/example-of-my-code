import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { PhoneOption } from 'core/interfaces/phoneOption';
import { navigationRef } from 'core/navigation/utils/navigate';
import { create } from 'zustand';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import jwtDecode from 'jwt-decode';

import { PATHS } from 'constants/PATHS';

import { getDeposits } from '../fetchQueryRequests/getDeposits';

interface IClaims {
  sub: string;
  is_anonymous: string;
  phone_number: string;
  exp: number;
  bncid: string;
  bnca2: string;
}

interface AuthStore {
  loginState: {
    accessToken: string;
    refreshToken: string;
  };
  registrationResult: {
    email: string;
    password: string;
    phone?: PhoneOption;
    phoneNumber?: string;
    userId?: string;
    isAnonymous?: boolean;
  };
  depositState: { isFirstDeposit?: boolean; firstDepositAmount: number };
  setFirstDepositAmount: (amount: number) => void;
  setLogin: (accessToken: string, refreshToken: string) => void;
  changePhoneNumber: (phone?: PhoneOption, phoneNumber?: string) => void;
  setRegistration: (
    email: string,
    password: string,
    phone: PhoneOption,
    phoneNumber: string,
  ) => void;
  setClaims: (isAnonymous: boolean, userId: string) => void;
  logout: () => void;
  setIsFirstDeposit: (env: RelayModernEnvironment) => void;
}

// in memory store for client side use only
export const useAuthStore = create<AuthStore>()(
  persist(
    devtools(
      immer((set) => ({
        loginState: { accessToken: '', refreshToken: '' },
        registrationResult: { email: '', password: '' },
        depositState: {
          isFirstDeposit: undefined,
          firstDepositAmount: 0,
        },
        async setLogin(accessToken: string, refreshToken: string) {
          set(({ loginState: s, registrationResult: r }) => {
            if (!accessToken) return;
            const claims = jwtDecode<IClaims>(accessToken);

            s.accessToken = accessToken;
            s.refreshToken = refreshToken;

            if (claims.is_anonymous === 'true') {
              r.isAnonymous = true;
              r.userId = claims.sub;
              r.phoneNumber = claims.phone_number.replace(
                r.phone?.code ?? '',
                '',
              );
            } else {
              r.isAnonymous = false;
              r.userId = claims.sub;
            }
          });
        },
        setRegistration(email, password, phone, phoneNumber) {
          set(({ registrationResult: s }) => {
            s.email = email;
            s.password = password;
            s.phone = phone;
            s.phoneNumber = phoneNumber;
          });
        },
        setClaims(isAnonymous, userId) {
          set(({ registrationResult: s }) => {
            s.isAnonymous = isAnonymous;
            s.userId = userId;
          });
        },
        logout() {
          set(({ loginState, registrationResult }) => {
            loginState.accessToken = '';
            loginState.refreshToken = '';
            registrationResult.isAnonymous = false;
            registrationResult.userId = '';
          });
          //@ts-ignore
          navigationRef?.current?.navigate(PATHS.HOME_STACK);
        },
        async setIsFirstDeposit(env) {
          const res = await getDeposits(env);

          const isFirstDeposit = !res?.paymentTransactions;

          set(() => ({
            depositState: {
              isFirstDeposit: isFirstDeposit,
            },
          }));
        },
        setFirstDepositAmount(amount: number) {
          set((s) => ({
            depositState: {
              ...s.depositState,
              firstDepositAmount: amount,
            },
          }));
        },
        changePhoneNumber(phone?: PhoneOption, phoneNumber?: string) {
          set((s) => ({
            registrationResult: {
              ...s.registrationResult,
              phone: { convertedMask: phone?.convertedMask, ...phone },
              phoneNumber,
            },
          }));
        },
      })),
      { name: 'AUTH' },
    ),
    { name: 'AsyncStorage', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
