import React, { FC } from 'react';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import { PhoneOption } from 'core/interfaces/phoneOption';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import { ErrorView } from 'components/ErrorView';

import { PATHS } from 'constants/PATHS';

import { CountryCodesList } from '../../components';
import { SearchInput } from '../Search/components';

interface CountryCodePickerPresenterProps {
  isFetchingError: boolean;
  isFetching: boolean;
  onRefresh: VoidFunction;
  t: GetTranslationValue;
  countryCodes: PhoneOption[];
  chosenValue?: PhoneOption | null;
  handleClearSearch: VoidFunction;
  handleSearchCountryCode: (value: string) => void;
  getOnValueChangeHandler: (value: PhoneOption) => VoidFunction;
}

export const CountryCodePickerPresenter: FC<
  CountryCodePickerPresenterProps
> = ({
  countryCodes,
  chosenValue,
  onRefresh,
  isFetching,
  isFetchingError,
  t,
  handleClearSearch,
  handleSearchCountryCode,
  getOnValueChangeHandler,
}) => (
  <BottomSheetWrapper screenKey={PATHS.COUNTRY_CODE_PICKER}>
    {isFetchingError ? (
      <ErrorView
        errorMsg={t('DEFAULT_ERROR_DESC')}
        t={t}
        showBtnLoader={isFetching}
        onRefresh={onRefresh}
      />
    ) : (
      <>
        <SearchInput
          autoFocus
          placeholder="Search by country code or name"
          onClearSearch={handleClearSearch}
          onSearch={handleSearchCountryCode}
        />
        <CountryCodesList
          getOnValueChangeHandler={getOnValueChangeHandler}
          chosenValue={chosenValue}
          countryCodes={countryCodes}
        />
      </>
    )}
  </BottomSheetWrapper>
);
