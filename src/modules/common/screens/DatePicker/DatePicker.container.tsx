import React, { FC } from 'react';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import { DatePicker } from 'components/DatePicker';
import { RootStackScreenProps } from 'core/interfaces/navigation';

import { PATHS } from 'constants/PATHS';

import { getDateDefaultValues } from './DatePicker.helpers';

export const DatePickerContainer: FC<
  RootStackScreenProps<PATHS.DATE_PICKER>
> = ({ route }) => {
  const { onValueChange, currentValue = '' } = route?.params || {};

  const dateValue = getDateDefaultValues(currentValue);

  return (
    <BottomSheetWrapper adjustToContentHeight screenKey={PATHS.DATE_PICKER}>
      <DatePicker value={dateValue} onValueChange={onValueChange} />
    </BottomSheetWrapper>
  );
};
