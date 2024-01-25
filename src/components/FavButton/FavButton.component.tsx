import { TEXT_VARIANTS } from 'config/theme';
import { VoidFunction } from 'core/interfaces';
import React, { FC } from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { styles } from './FavButton.styles';

interface FavButtonProps {
  onPress: VoidFunction;
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const FavButton: FC<FavButtonProps> = ({
  onPress,
  text,
  containerStyle,
}) => (
  <TouchableOpacity
    style={[styles.container, containerStyle]}
    onPress={onPress}
  >
    <Text style={[TEXT_VARIANTS.font12, styles.text]}>{text}</Text>
  </TouchableOpacity>
);
