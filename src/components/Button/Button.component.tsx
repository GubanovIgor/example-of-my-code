import React, { ReactNode } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { LoadingSpinner } from '../LoadingSpinner';
import { styles } from './Button.styles';

type ButtonVariant = 'contained' | 'outlined' | 'transparent';

interface Props {
  text: string;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  variant?: ButtonVariant;
  isLoading?: boolean;
  isDisabled?: boolean;
  frontIcon?: () => ReactNode;
  backIcon?: () => ReactNode;
  onPress: () => void;
}

const getButtonStyles = (
  variant: ButtonVariant,
  containerStyles: StyleProp<ViewStyle>,
  isDisabled?: boolean,
) => [styles[variant], isDisabled ? styles.disabled : {}, containerStyles];

export const Button = ({
  text,
  variant = 'contained',
  isLoading,
  isDisabled,
  textStyles,
  containerStyles,
  frontIcon,
  backIcon,
  onPress,
}: Props) => {
  const buttonStyles = getButtonStyles(variant, containerStyles, isDisabled);

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={isDisabled || isLoading}
    >
      {frontIcon !== undefined && frontIcon()}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Text style={[styles.text, textStyles]}>{text}</Text>
      )}
      {backIcon !== undefined && backIcon()}
    </TouchableOpacity>
  );
};
