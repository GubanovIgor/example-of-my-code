import React, { ReactNode, useEffect, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextInputProps,
  StyleProp,
  Pressable,
  Platform,
} from 'react-native';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { HookFormValidation } from 'core/interfaces/formsValidation';
import { VoidFunction } from 'core/interfaces';
import { noop } from 'lodash';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

import { COLORS, GUTTER_SIZE, SPACING, TEXT_VARIANTS } from '../config/theme';

interface ICustomInputProps extends TextInputProps {
  placeholder?: string;
  helpText?: string | null;
  styleProps?: StyleProp<ViewStyle>;
  isSecure?: boolean;
  caption?: string;
  error?: { message: string };
  rightAccessory?: ReactNode;
  name?: string;
  customValue?: string;
  validationRules?: HookFormValidation;
  isRequired?: boolean;
  isEditable?: boolean;
  isPickerField?: boolean;
  onCustomFocus?: VoidFunction;
  onCustomChangeText?: (text: string) => void;
  activeLabelColor?: string;
  onChangeFirstDepositAmount?: (text: string) => void;
  isFirstDeposit?: boolean;
  onPress?: VoidFunction;
}

export const FormTextInput = (props: ICustomInputProps) => {
  const {
    placeholder,
    helpText,
    styleProps,
    isSecure = false,
    rightAccessory,
    name = '',
    validationRules,
    onCustomChangeText,
    onPress,
    customValue,
    isRequired = true,
    isEditable = true,
    isPickerField = false,
    onCustomFocus,
    activeLabelColor = COLORS.LIGHT_BACKGROUND,
    onChangeFirstDepositAmount,
    isFirstDeposit,
    ...rest
  } = props;

  const { t } = useTranslation();

  const [isFocused, setIsFocused] = useState(false);

  const {
    watch,
    setValue,
    register,
    formState: { errors },
    trigger,
    clearErrors,
  } = useFormContext() || {};

  useEffect(() => {
    if (customValue) {
      setValue(name, customValue);
    }
  }, [customValue, name, setValue]);

  const value = watch(name);

  const caption = errors[name]?.message as string | undefined;

  const onChange = (text: string) => {
    if (onChangeFirstDepositAmount) onChangeFirstDepositAmount(text);

    if (errors) {
      clearErrors(name);
    }

    setValue(name, text, {
      shouldDirty: true,
    });
  };

  const onFocus = () => {
    setIsFocused(true);
    onCustomFocus && onCustomFocus();
  };

  const onBlur = () => {
    trigger(name);
    setIsFocused(false);
  };

  const onTouchStart = () => {
    if (Platform.OS === 'android') return;

    onPress && onPress();
  };

  return (
    <Pressable
      disabled={Boolean(!onPress)}
      onPress={onPress || noop}
      style={[styles.container, styleProps]}
    >
      <View>
        <TextInput
          {...register(name, {
            required: isRequired ? t('THIS_FIELD_REQUIRED').toString() : false,
            ...validationRules,
          })}
          {...rest}
          style={[
            styles.textInput,
            TEXT_VARIANTS.font14,
            !isEditable && !isPickerField && styles.notEditableInput,
            Boolean(caption) && styles.textInputDanger,
          ]}
          scrollEnabled={false}
          onTouchStart={onTouchStart}
          textAlign="left"
          onBlur={onBlur}
          onFocus={onFocus}
          editable={isEditable}
          placeholderTextColor={COLORS.PLACEHOLDER_LIGHT}
          placeholder={placeholder}
          underlineColorAndroid="transparent"
          secureTextEntry={isSecure}
          value={value}
          onChangeText={onCustomChangeText || onChange}
        />
        {rightAccessory && rightAccessory}
      </View>
      {Boolean(value || isFocused) && (
        <View
          style={[
            styles.placeholderContainer,
            {
              backgroundColor: isFirstDeposit
                ? COLORS.FIRST_DEPOSIT_END_GRADIENT_BG
                : activeLabelColor,
            },
          ]}
        >
          <Text
            style={[
              TEXT_VARIANTS.font10,
              errors?.[name] && styles.placeholderErrorText,
            ]}
          >
            {placeholder}
          </Text>
        </View>
      )}
      <Caption caption={caption} helpText={helpText || ''} />
    </Pressable>
  );
};

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

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - GUTTER_SIZE * 5,
  },
  textInput: {
    height: 40,
    paddingHorizontal: SPACING.L,
    borderWidth: 1,
    borderColor: COLORS.ON_PRIMARY,
    borderRadius: 12,
  },
  notEditableInput: {
    borderColor: COLORS.WHITE_60,
    color: COLORS.WHITE_60,
  },
  helpText: {
    marginLeft: SPACING.L,
    marginTop: SPACING.XS,
  },
  captionText: {
    marginLeft: SPACING.L,
    marginTop: SPACING.XS,
    color: COLORS.TEXT_DANGER,
  },
  textInputDanger: {
    backgroundColor: COLORS.INPUT_ERROR_BG,
  },
  placeholderContainer: {
    position: 'absolute',
    top: -8,
    left: 10,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    paddingHorizontal: GUTTER_SIZE,
    paddingVertical: GUTTER_SIZE - 2,
    borderRadius: 4,
    zIndex: 2,
  },
  placeholderErrorText: {
    color: COLORS.TEXT_DANGER,
  },
});
