import React, { ReactNode, forwardRef } from 'react';
import { TextInput, ViewStyle, TextInputProps, Text, View } from 'react-native';

import { COLORS, TEXT_VARIANTS } from '../../config/theme';
import { styles } from './CustomTextInput.styles';

interface Props extends Omit<TextInputProps, 'onChange'> {
  placeholder?: string;
  helpText?: string;
  styleProps?: ViewStyle;
  isSecure?: boolean;
  caption?: string;
  error?: { message: string };
  rightAccessory?: ReactNode;
  name?: string;
  customValue?: string;
  onChange?: (e: { target: { value: string } }) => void;
}
export const CustomTextInput = forwardRef<TextInput, Props>((props, ref) => {
  const {
    error,
    isSecure,
    onChange,
    helpText,
    styleProps,
    rightAccessory,
    ...rest
  } = props;

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          TEXT_VARIANTS.font14,
          Boolean(error) && styles.textInputDanger,
          styleProps,
        ]}
        {...rest}
        onChangeText={(text: string) => onChange?.({ target: { value: text } })}
        ref={ref}
        scrollEnabled={false}
        textAlign="left"
        placeholderTextColor={COLORS.PLACEHOLDER_LIGHT}
        underlineColorAndroid="transparent"
        secureTextEntry={isSecure}
      />
      {rightAccessory && rightAccessory}
      <Caption caption={error?.message} helpText={helpText} />
    </View>
  );
});

const Caption = ({
  caption,
  helpText,
}: {
  caption?: string;
  helpText?: string;
}) => {
  if (caption) {
    return (
      <Text style={[TEXT_VARIANTS.font10, styles.captionText]}>{caption}</Text>
    );
  }

  if (helpText) {
    return (
      <Text style={[TEXT_VARIANTS.font10, styles.helpText]}>{helpText}</Text>
    );
  }

  return <></>;
};
