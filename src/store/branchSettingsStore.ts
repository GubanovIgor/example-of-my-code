import { BranchSettings, CustomPickerValue } from 'core/interfaces';
import { BranchSettingsQuery as Query } from 'core/queries';
import { BranchSettingsQuery } from 'queries/__generated__/BranchSettingsQuery.graphql';
import { fetchQuery } from 'relay-runtime';
import { getClientEnvironment } from 'relay/index';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import _ from 'lodash';
import { PhoneOption } from 'core/interfaces/phoneOption';

import { INTERNATIONAL_PHONES } from 'constants/INTERNATIONAL_PHONES';

interface BranchSettingsStore {
  branchSettings?: BranchSettings;
  isFetchingError: boolean;
  isFetching: boolean;
  getBranchSettings: () => void;
  getCountriesPhoneOptions: () => PhoneOption[];
  getNormalizedPickerCurrencies: () => CustomPickerValue[];
  getCurrencySignById: (id: string) => string;
}

export const useBranchSettingsStore = create<BranchSettingsStore>()(
  devtools(
    immer((set, get) => ({
      isFetching: false,
      isFetchingError: false,
      branchSettings: undefined,
      async getBranchSettings() {
        set(() => ({ isFetching: true }));
        try {
          const res = await fetchQuery<BranchSettingsQuery>(
            getClientEnvironment(),
            Query,
            {},
          ).toPromise();

          set(() => ({
            isFetchingError: false,
            branchSettings: res?.branchSettings,
          }));
        } catch (error) {
          set(() => ({
            isFetchingError: true,
          }));
        } finally {
          set(() => ({ isFetching: false }));
        }
      },
      getCurrencySignById(_id: string) {
        const { branchSettings } = get();

        //TODO move this back to === id, when there will be currency from branchSettings, for now USD
        const foundCurrency = branchSettings?.currencies?.find(
          (currency) => currency.internalId === 5,
        );

        return foundCurrency?.shortSign || '';
      },
      getNormalizedPickerCurrencies() {
        const { branchSettings } = get();
        const currencies: CustomPickerValue[] =
          branchSettings?.currencies?.map((currency) => ({
            id: currency.internalId,
            value: `${currency.shortSign} (${currency.name})`,
          })) || [];

        return currencies;
      },
      getCountriesPhoneOptions() {
        const { branchSettings } = get();
        const clientCountriesPhoneOptions: PhoneOption[] = [];

        INTERNATIONAL_PHONES.filter((option) => {
          branchSettings?.countries?.find((c) => {
            if (c.shortSign !== option.iso) return;
            clientCountriesPhoneOptions.push({ ...option, id: c.internalId });
          });
        });

        return clientCountriesPhoneOptions;
      },
    })),
    { name: 'BRANCH_SETTINGS' },
  ),
);
