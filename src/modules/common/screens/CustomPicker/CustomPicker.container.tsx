import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CustomPickerValue } from 'core/interfaces';
import { RootStackScreenProps } from 'core/interfaces/navigation';

import { PATHS } from 'constants/PATHS';

import { CustomPickerPresenter } from './CustomPicker.presenter';

export const CustomPickerContainer: FC<
  RootStackScreenProps<PATHS.CUSTOM_PICKER>
> = ({ route }) => {
  const {
    data,
    handleSelectorItem,
    itemsAlign = 'default',
    showSearch = true,
    adjustToContentHeight,
  } = route?.params || {};

  const navigation = useNavigation();
  const [options, setOptions] = useState(data);

  const getSelectorItemHandler = (value: CustomPickerValue) => () => {
    if (!handleSelectorItem) return;

    handleSelectorItem(value);
    navigation.goBack();
  };

  const handleSearch = (text: string) => {
    if (!text) setOptions(data);

    const filteredOptions = data?.filter((item) => item.value.includes(text));

    setOptions(filteredOptions);
  };

  const onClearSearch = () => {
    setOptions(data);
  };

  return (
    <CustomPickerPresenter
      itemsAlign={itemsAlign}
      showSearch={showSearch}
      onSearch={handleSearch}
      onClearSearch={onClearSearch}
      data={options}
      adjustToContentHeight={adjustToContentHeight}
      getSelectorItemHandler={getSelectorItemHandler}
    />
  );
};
