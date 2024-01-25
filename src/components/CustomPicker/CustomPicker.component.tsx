import { COLORS, TEXT_VARIANTS } from 'config/theme';
import React from 'react';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ArrowToBottomIcon from 'assets/icons/arrowToBottom.svg';
import { CustomPickerValue, VoidFunction } from 'core/interfaces';

import { styles } from './CustomPicker.styles';

export interface CustomPickerProps {
  onPress: VoidFunction;
  containerStyles?: StyleProp<ViewStyle>;
  placeholder?: string;
  chosenOption?: CustomPickerValue;
}

export const CustomPicker = ({
  onPress,
  containerStyles,
  chosenOption,
  placeholder,
}: CustomPickerProps) => (
  <View>
    <TouchableOpacity
      style={[styles.container, containerStyles]}
      onPress={onPress}
    >
      <Text style={TEXT_VARIANTS.font14}>
        {chosenOption?.value || placeholder}
      </Text>
      <ArrowToBottomIcon fill={COLORS.TEXT_LIGHT} />
    </TouchableOpacity>
  </View>
);
