import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { COLORS, SPACING, TEXT_VARIANTS } from 'config/theme';
import { PhoneOption } from 'core/interfaces/phoneOption';
import ArrowToBottomIcon from 'assets/icons/arrowToBottom.svg';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import { useFormContext } from 'react-hook-form';
import { HookFormValidation } from 'core/interfaces/formsValidation';
import { formatWithMask, Mask } from 'react-native-mask-input';

import { internationalPhones } from 'constants/INTERNATIONAL_PHONES';
import { PATHS } from 'constants/PATHS';

import { styles } from './PhoneInput.styles';
import {
  convertPhoneNumberMaskToPlaceholder,
  getPhoneMaskValue,
  MASK_SYMBOL,
} from './PhoneInput.helper';

interface PhoneInputProps {
  caption?: string;
  helpText?: string;
  rightIcon?: () => JSX.Element;
  onChangeCountry: (value: PhoneOption) => void;
  initialPhoneCode?: PhoneOption | null;
  isPhoneEditable?: boolean;
  name?: string;
  customValue?: string;
  isRequired?: boolean;
  validationRules?: HookFormValidation;
}

const getCountrySelectorRenderer = (
  onPress: VoidFunction,
  t: GetTranslationValue,
  selectedPhone?: PhoneOption | null,
  isPhoneEditable?: boolean,
) => {
  const selectedPhoneIcon = internationalPhones.find(
    (phone) => phone.iso === selectedPhone?.iso,
  )?.icon;

  return (
    <Pressable
      style={styles.phoneSelector}
      onPress={isPhoneEditable ? onPress : null}
    >
      <Text style={[styles.phonePlaceholder, TEXT_VARIANTS.font10]}>
        {t('COUNTRY')}
      </Text>
      {selectedPhoneIcon || null}
      <Text style={[TEXT_VARIANTS.font14, styles.countryCode]}>
        {selectedPhone?.code}
      </Text>
      <ArrowToBottomIcon fill={COLORS.TEXT_LIGHT} />
    </Pressable>
  );
};

const getCaptionRenderer = (caption?: string, helpText?: string) => {
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
};

const getMaskedText = (text: string, mask?: Mask) => {
  const { obfuscated } = formatWithMask({
    text: text,
    mask: mask,
    obfuscationCharacter: MASK_SYMBOL,
  });

  return obfuscated;
};

export const PhoneInput = ({
  helpText,
  onChangeCountry,
  rightIcon,
  initialPhoneCode,
  isPhoneEditable = true,
  name = '',
  customValue,
  isRequired = true,
  validationRules,
}: PhoneInputProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isPhoneSetRef = useRef(false);

  const [isFocused, setIsFocused] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(initialPhoneCode);
  const [initialMask, setInitialMask] = useState<Mask | undefined>([]);

  const {
    watch,
    setValue,
    register,
    formState: { errors },
    trigger,
    clearErrors,
  } = useFormContext() || {};

  const value = watch(name);

  useEffect(() => {
    if (customValue) {
      const phoneNumberMask = getPhoneMaskValue(initialPhoneCode);
      setInitialMask(phoneNumberMask);

      const maskedText = getMaskedText(customValue, phoneNumberMask);

      setValue(name, maskedText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isPhoneSetRef.current) return;

    let phoneNumberMask;

    if (!selectedPhone && initialPhoneCode) {
      phoneNumberMask = getPhoneMaskValue(initialPhoneCode);
      setInitialMask(phoneNumberMask);
      isPhoneSetRef.current = true;
      setSelectedPhone(initialPhoneCode);
    }
  }, [initialPhoneCode, selectedPhone, setValue, name, value]);

  const caption = errors[name]?.message as string | undefined;

  const { t } = useTranslation();

  const selectCountry = (item: PhoneOption) => {
    const phoneNumberMask = getPhoneMaskValue(item);
    setInitialMask(phoneNumberMask);
    onChangeCountry(item);
    setSelectedPhone(item);
    clearErrors();

    setValue(name, '');
  };

  const handlePressCountrySelector = () => {
    navigation.navigate(PATHS.COUNTRY_CODE_PICKER, {
      chosenValue: selectedPhone,
      onValueChange: selectCountry,
    });
  };

  const renderCountrySelector = getCountrySelectorRenderer(
    handlePressCountrySelector,
    t,
    selectedPhone,
    isPhoneEditable,
  );

  const renderCaption = getCaptionRenderer(caption, helpText);

  const handleInputChange = async (text: string) => {
    const maskedText = getMaskedText(text, initialMask);

    if (errors) {
      clearErrors();
    }

    setValue(name, maskedText, {
      shouldDirty: true,
    });
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    trigger(name);
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.phoneSelectorContainer, { marginRight: SPACING.M }]}>
        {renderCountrySelector}
      </View>

      <View style={styles.inputContainer}>
        {Boolean(value || isFocused) && (
          <View style={styles.placeholderContainer}>
            <Text style={TEXT_VARIANTS.font10}>{t('PHONE.FIELD')}</Text>
          </View>
        )}
        {/* We double TextInput and make hidden the top one to avoid flickering during field formatting */}
        <TextInput
          {...register(name, {
            required: isRequired ? t('THIS_FIELD_REQUIRED').toString() : false,
            ...validationRules,
          })}
          style={[TEXT_VARIANTS.font14, styles.hiddenPhoneInput]}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChangeText={handleInputChange}
          placeholderTextColor={COLORS.PLACEHOLDER_LIGHT}
          editable={isPhoneEditable}
          selectTextOnFocus={isPhoneEditable}
          caretHidden={true}
        />
        <TextInput
          style={[
            styles.phoneInput,
            TEXT_VARIANTS.font14,
            Boolean(caption) && styles.phoneInputDanger,
          ]}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          placeholder={convertPhoneNumberMaskToPlaceholder(initialMask)}
          placeholderTextColor={COLORS.PLACEHOLDER_LIGHT}
          editable={isPhoneEditable}
          selectTextOnFocus={isPhoneEditable}
        />
        {rightIcon !== undefined && rightIcon()}
        {renderCaption}
      </View>
    </View>
  );
};
