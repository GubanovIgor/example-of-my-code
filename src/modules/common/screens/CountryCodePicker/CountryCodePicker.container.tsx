import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from 'core/interfaces/navigation';
import { PhoneOption } from 'core/interfaces/phoneOption';
import React, { FC, useState } from 'react';
import { useBranchSettingsStore } from 'store/branchSettingsStore';
import { useTranslation } from 'react-i18next';

import { PATHS } from 'constants/PATHS';

import { CountryCodePickerPresenter } from './CountryCodePicker.presenter';

export const CountryCodePickerContainer: FC<
  RootStackScreenProps<PATHS.COUNTRY_CODE_PICKER>
> = ({ route }) => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const {
    getCountriesPhoneOptions,
    getBranchSettings,
    isFetchingError,
    isFetching,
  } = useBranchSettingsStore((s) => ({
    getBranchSettings: s.getBranchSettings,
    getCountriesPhoneOptions: s.getCountriesPhoneOptions,
    isFetchingError: s.isFetchingError,
    isFetching: s.isFetching,
  }));

  const countries = getCountriesPhoneOptions();
  const { chosenValue, onValueChange } = route?.params || [];
  const [filteredCountryCodes, setFilteredCountryCodes] = useState(countries);

  const handleSearchCountryCode = (text: string) => {
    const newFilteredCountryCodes = countries.filter(
      (phone) =>
        phone.code.toLowerCase().includes(text.toLowerCase()) ||
        phone.country.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCountryCodes(newFilteredCountryCodes);
  };

  const handleClearSearch = () => {
    setFilteredCountryCodes(countries);
  };

  const getOnValueChangeHandler = (value: PhoneOption) => () => {
    if (!onValueChange) return;
    onValueChange(value);
    navigation.goBack();
  };

  const onRefreshBranchSettings = () => {
    getBranchSettings();
  };

  return (
    <CountryCodePickerPresenter
      getOnValueChangeHandler={getOnValueChangeHandler}
      handleSearchCountryCode={handleSearchCountryCode}
      handleClearSearch={handleClearSearch}
      chosenValue={chosenValue}
      isFetching={isFetching}
      isFetchingError={isFetchingError}
      t={t}
      onRefresh={onRefreshBranchSettings}
      countryCodes={filteredCountryCodes}
    />
  );
};
