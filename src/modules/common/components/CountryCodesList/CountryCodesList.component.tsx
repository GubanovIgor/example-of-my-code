import { FlashList } from '@shopify/flash-list';
import { TEXT_VARIANTS } from 'config/theme';
import { VoidFunction } from 'core/interfaces';
import { PhoneOption } from 'core/interfaces/phoneOption';
import React, { FC } from 'react';
import { Pressable, Text, View } from 'react-native';

import { styles } from './CountryCodesList.styles';

interface CountryCodesListProps {
  countryCodes: PhoneOption[];
  chosenValue?: PhoneOption | null;
  getOnValueChangeHandler: (value: PhoneOption) => VoidFunction;
}

const getCountryCodeRenderItem =
  (
    getOnValueChangeHandler: (value: PhoneOption) => VoidFunction,
    chosenValue?: PhoneOption | null,
  ) =>
  ({ item }: { item: PhoneOption }) => {
    const onPress = getOnValueChangeHandler(item);
    const textStyles = [
      TEXT_VARIANTS[item.code === chosenValue?.code ? 'font14Bold' : 'font14'],
      styles.itemText,
    ];

    return (
      <Pressable style={styles.phoneItemContainer} onPress={onPress}>
        {item.icon}
        <View style={styles.phoneAndCountryContainer}>
          <Text style={textStyles}>{item.code}</Text>
        </View>
        <Text style={textStyles}>{item.country}</Text>
      </Pressable>
    );
  };

export const CountryCodesList: FC<CountryCodesListProps> = ({
  countryCodes,
  chosenValue,
  getOnValueChangeHandler,
}) => {
  const renderItem = getCountryCodeRenderItem(
    getOnValueChangeHandler,
    chosenValue,
  );

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.contentContainer}
      data={countryCodes}
      renderItem={renderItem}
      estimatedItemSize={200}
    />
  );
};
