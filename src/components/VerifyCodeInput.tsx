import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import MaskInput from 'react-native-mask-input';

import { COLORS, SPACING, TEXT_VARIANTS } from '../config/theme';

interface VerifyCodeInputProps {
  value: string | undefined;
  onChangeText: Dispatch<SetStateAction<string | undefined>>;
  rightIcon?: () => JSX.Element | undefined;
  styleProps?: ViewStyle;
  mask: RegExp[];
}

export const VerifyCodeInput = ({
  value,
  onChangeText,
  rightIcon,
  styleProps,
  mask,
}: VerifyCodeInputProps) => (
  <View style={[styles.container, styleProps]}>
    <MaskInput
      style={[styles.verifyCodeInput, TEXT_VARIANTS.font14]}
      value={value}
      onChangeText={onChangeText}
      placeholder="_ _ _ _ _ _"
      placeholderTextColor={COLORS.PLACEHOLDER_LIGHT}
      mask={mask}
    />
    {rightIcon !== undefined && rightIcon()}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  verifyCodeInput: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.L,
  },
});
