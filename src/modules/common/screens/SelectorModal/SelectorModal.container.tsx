import React, { useCallback, useEffect, useState } from 'react';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'core/interfaces/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';

import { PATHS } from 'constants/PATHS';

import { SelectorModalPresenter } from './SelectorModal.presenter';
import { Item } from './SelectorModal.types';

export const SelectorModalSuspenseWrapper = (
  props: RootStackScreenProps<PATHS.SELECTOR_MODAL>,
) => (
  <BottomSheetWrapper screenKey={PATHS.SELECTOR_MODAL}>
    <SelectorModalContainer {...props} />
  </BottomSheetWrapper>
);

const SelectorModalContainer = ({
  route: {
    params: { data, handleSelectorItem, selectorName },
  },
}: RootStackScreenProps<PATHS.SELECTOR_MODAL>) => {
  const [options, setOptions] = useState<Item[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    setOptions([...data]);
  }, [data]);

  const onSearch = (value: string) => {
    let dataCopy = JSON.parse(JSON.stringify(data));

    dataCopy = dataCopy.map((item: Item) => {
      let itemCopy = JSON.parse(JSON.stringify(item));
      itemCopy.data = itemCopy.data.filter((title: string) =>
        title.includes(value),
      );

      return itemCopy;
    });

    setOptions(dataCopy);
  };

  const onClearSearch = () => {};

  const selectorItemHandler = useCallback(
    (value: string) => () => {
      handleSelectorItem({ value, selectorName });
      navigation.pop();
    },
    [handleSelectorItem, navigation, selectorName],
  );

  return (
    <SelectorModalPresenter
      handleSelectorItem={selectorItemHandler}
      selectorOptions={options}
      onSearch={onSearch}
      onClearSearch={onClearSearch}
    />
  );
};
