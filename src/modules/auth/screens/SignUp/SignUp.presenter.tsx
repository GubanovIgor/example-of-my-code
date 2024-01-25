import React, { FC } from 'react';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import { CustomTextCheckbox } from 'components/CustomTextCheckbox';
import { PhoneInput } from 'components/PhoneInput';
import { SPACING } from 'config/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomSelectorInput } from 'components/CustomSelectorInput';
import { FormTextInput } from 'components/FormTextInput';
import { TermsAndConditions } from 'components/TermsAndConditions';
import { Button } from 'components/Button';
import { EMAIL_HELP_TEXT, PHONE_INPUT_HELP_TEXT } from 'modules/auth/constants';

import { SignUpPresenterProps } from './SignUp.types';
import { styles } from './SignUp.styles';

export const SignUpPresenter: FC<SignUpPresenterProps> = ({
  formMethods,
  initialSelectedPhone,
  onSubmitHandler,
  onChangeCountry,
  isLoading,
  openSelectorModal,
  handlePressOnBirthDate,
  t,
  currency,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  return (
    <KeyboardAwareScrollView
      scrollEnabled
      enableOnAndroid
      enableAutomaticScroll
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.inputsContainer}>
        <PhoneInput
          initialPhoneCode={initialSelectedPhone}
          onChangeCountry={onChangeCountry}
          helpText={t(PHONE_INPUT_HELP_TEXT)}
          name="phone"
        />

        <CustomSelectorInput
          name="currency"
          chosenOption={currency}
          onPressHandler={openSelectorModal}
          styleProps={styles.currencyInput}
          placeholder={t('CURRENCY')}
        />

        <FormTextInput
          styleProps={{ marginTop: SPACING.M }}
          placeholder={t('EMAIL')}
          autoCapitalize="none"
          keyboardType="email-address"
          helpText={t(EMAIL_HELP_TEXT)}
          name="email"
        />

        <FormTextInput
          styleProps={{ marginTop: SPACING.M }}
          placeholder={t('ADDRESS')}
          name="address"
        />

        <FormTextInput
          styleProps={{ marginTop: SPACING.M }}
          placeholder={t('FIRST_NAME')}
          name="name"
        />

        <FormTextInput
          styleProps={{ marginTop: SPACING.M }}
          placeholder={t('LAST_NAME')}
          name="lastName"
        />

        <FormTextInput
          onPress={handlePressOnBirthDate}
          styleProps={{ marginTop: SPACING.M }}
          placeholder={t('DATE_OF_BIRTH')}
          name="dob"
          isEditable={false}
          isPickerField={true}
        />

        <FormTextInput
          styleProps={{ marginTop: SPACING.M }}
          placeholder={t('PASSWORD')}
          name="password"
          isSecure
        />

        <Controller
          control={control}
          name="terms"
          render={({ field: { onChange, value } }) => (
            <CustomTextCheckbox
              helpText={() => <TermsAndConditions />}
              onChange={onChange}
              isChecked={value}
              caption={errors?.terms?.message?.toString()}
            />
          )}
        />

        <Button
          text={t('REGISTER')}
          isLoading={isLoading}
          containerStyles={styles.registerButtonContainer}
          onPress={handleSubmit(onSubmitHandler)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
