import React, { FC } from 'react';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import { CustomPickerValue, VoidFunction } from 'core/interfaces';
import { GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { PATHS } from 'constants/PATHS';

import { SearchInput } from '../Search/components';
import { CustomPickerList } from './components';

interface CustomPickerPresenterProps {
  data: CustomPickerValue[];
  onSearch: (value: string) => void;
  showSearch?: boolean;
  itemsAlign?: 'default' | 'center';
  adjustToContentHeight?: boolean;
  onClearSearch: VoidFunction;
  getSelectorItemHandler: (value: CustomPickerValue) => VoidFunction;
}

export const CustomPickerPresenter: FC<CustomPickerPresenterProps> = ({
  data,
  showSearch,
  adjustToContentHeight,
  itemsAlign,
  onSearch,
  onClearSearch,
  getSelectorItemHandler,
}) => (
  <BottomSheetWrapper
    adjustToContentHeight={adjustToContentHeight}
    screenKey={PATHS.CUSTOM_PICKER}
  >
    {showSearch && (
      <SearchInput onSearch={onSearch} onClearSearch={onClearSearch} />
    )}
    <CustomPickerList
      itemsAlign={itemsAlign}
      containerStyles={[showSearch && styles.listContainer]}
      options={data}
      getItemPressHandler={getSelectorItemHandler}
    />
  </BottomSheetWrapper>
);

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: GUTTER_SIZE * 2,
  },
});
