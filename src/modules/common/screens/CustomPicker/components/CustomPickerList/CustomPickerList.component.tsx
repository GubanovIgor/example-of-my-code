import { FlashList } from '@shopify/flash-list';
import { TEXT_VARIANTS } from 'config/theme';
import { CustomPickerValue, VoidFunction } from 'core/interfaces';
import React, { FC } from 'react';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './CustomPickerList.styles';

interface CustomPickerListProps {
  containerStyles?: StyleProp<ViewStyle>;
  options: CustomPickerValue[];
  itemsAlign?: 'default' | 'center';
  getItemPressHandler: (value: CustomPickerValue) => VoidFunction;
}

const getItemRenderer =
  (
    getItemPressHandler: (value: CustomPickerValue) => VoidFunction,
    itemsAlign?: 'default' | 'center',
  ) =>
  ({ item }: { item: CustomPickerValue }) => {
    const onPress = getItemPressHandler(item);

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <Text
          style={[
            TEXT_VARIANTS.font14,
            styles.itemValue,
            itemsAlign === 'center' && styles.itemCentered,
          ]}
        >
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  };

const keyExtractor = (item: CustomPickerValue) => item.id?.toString();

export const CustomPickerList: FC<CustomPickerListProps> = ({
  options,
  containerStyles,
  itemsAlign,
  getItemPressHandler,
}) => {
  const { bottom } = useSafeAreaInsets();

  const renderItem = getItemRenderer(getItemPressHandler, itemsAlign);

  return (
    <View
      style={[styles.container, containerStyles, { paddingBottom: bottom }]}
    >
      <FlashList
        data={options}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={200}
      />
    </View>
  );
};
