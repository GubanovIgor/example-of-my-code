import { COLORS, TEXT_VARIANTS } from 'config/theme';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ArrowToBottomIcon from 'assets/icons/arrowToBottom.svg';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { styles } from './CustomSelectorInput.styles';
import { Props } from './CustomSelectorInput.types';

export const CustomSelectorInput = ({
  onPressHandler,
  styleProps,
  placeholder,
  placeholderStyleProp,
  name,
  chosenOption,
}: Props) => {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation();

  useEffect(() => {
    if (chosenOption?.value?.length) {
      setValue(name, chosenOption.value, { shouldValidate: true });
    }

    register(name, {
      required: String(t('THIS_FIELD_REQUIRED')),
    });
  }, [chosenOption, setValue, name, register, t]);

  const value = watch(name);

  const caption = errors[name]?.message as string | undefined;

  const renderPlaceholder = () => {
    if (value) {
      return (
        <View style={[styles.placeholderContainer, placeholderStyleProp]}>
          <Text style={TEXT_VARIANTS.font10}>{placeholder}</Text>
        </View>
      );
    }

    return (
      <View>
        <Text
          style={[TEXT_VARIANTS.font14, { color: COLORS.PLACEHOLDER_LIGHT }]}
        >
          {placeholder}
        </Text>
      </View>
    );
  };

  const onPress = () => {
    onPressHandler();
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.container,
          styleProps,
          Boolean(caption) && styles.inputDanger,
        ]}
        onPress={onPress}
      >
        {placeholder && renderPlaceholder()}
        <Text style={TEXT_VARIANTS.font14}>{value}</Text>
        <ArrowToBottomIcon fill={COLORS.TEXT_LIGHT} />
      </TouchableOpacity>
      {Boolean(caption) && (
        <Text style={[TEXT_VARIANTS.font10, styles.captionText]}>
          {caption}
        </Text>
      )}
    </View>
  );
};
