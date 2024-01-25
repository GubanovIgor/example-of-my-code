import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle, Text } from 'react-native';
import MaskInput from 'react-native-mask-input';
import { COLORS, SPACING, TEXT_VARIANTS } from 'config/theme';

interface DateOfBirthInputProps {
  value: string;
  onChangeText: (value: string) => void;
  caption: string | undefined;
  styleProps?: ViewStyle;
  placeholder: string;
}

export const DateOfBirthInput = ({
  caption,
  value,
  styleProps,
  placeholder,
  onChangeText,
}: DateOfBirthInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.container, styleProps]}>
      {Boolean(value || isFocused) && (
        <View style={styles.placeholderContainer}>
          <Text style={TEXT_VARIANTS.font10}>{placeholder}</Text>
        </View>
      )}

      <MaskInput
        style={[
          styles.dateOfBirthInput,
          TEXT_VARIANTS.font14,
          Boolean(caption) && styles.dateOfBirthInputDanger,
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChangeText={onChangeText}
        placeholder={!isFocused ? placeholder : '__.__.____'}
        placeholderTextColor={COLORS.PLACEHOLDER_LIGHT}
        mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
      {Boolean(caption) && (
        <Text style={[TEXT_VARIANTS.font10, styles.captionText]}>
          {caption}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dateOfBirthInput: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.L,
  },
  dateOfBirthInputDanger: {
    backgroundColor: COLORS.DANGER_BACKGROUND,
  },
  placeholderContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    padding: SPACING.XS,
    borderRadius: 4,
    zIndex: 2,
  },
  captionText: {
    marginLeft: SPACING.L,
    marginTop: SPACING.XS,
    color: COLORS.TEXT_DANGER,
  },
});
