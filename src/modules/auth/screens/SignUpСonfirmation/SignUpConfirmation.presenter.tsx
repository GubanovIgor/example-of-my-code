import React, { FC } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PhoneInput } from 'components/PhoneInput';
import EditIcon from 'assets/icons/edit.svg';
import { VerifyCodeInput } from 'components/VerifyCodeInput';
import { SPACING, TEXT_VARIANTS } from 'config/theme';
import { Button } from 'components/Button';

import { SignUpConfirmationPresenterProps } from './SignUpConfirmation.types';
import { styles } from './SignUpConfirmation.styles';
import { CODE_MASK, PHONE_INPUT_HELP_TEXT } from '../../constants';

export const SignUpConfirmationPresenter: FC<
  SignUpConfirmationPresenterProps
> = ({
  formMethods,
  onChangeCountry,
  onChangeVerifyCode,
  verifyCode,
  onPressResendCode,
  onPressLogin,
  timeLeft,
  isPhoneEditable,
  onSavePhone,
  onEditPhone,
  isLoading,
  initialPhoneCode,
  t,
  phoneNumber,
}) => {
  const { handleSubmit } = formMethods;

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.inputsContainer}>
          <PhoneInput
            customValue={phoneNumber}
            initialPhoneCode={initialPhoneCode || null}
            onChangeCountry={onChangeCountry}
            helpText={t(PHONE_INPUT_HELP_TEXT)}
            isPhoneEditable={isPhoneEditable}
            name="phone"
            rightIcon={() =>
              isPhoneEditable ? (
                <TouchableOpacity
                  style={styles.editIconContainer}
                  onPress={handleSubmit(onSavePhone)}
                >
                  <Text style={[TEXT_VARIANTS.font12Bold]}>{t('SAVE')}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.editIconContainer}
                  onPress={onEditPhone}
                >
                  <EditIcon />
                </TouchableOpacity>
              )
            }
          />

          <VerifyCodeInput
            mask={CODE_MASK}
            value={verifyCode}
            onChangeText={onChangeVerifyCode}
            styleProps={{ marginTop: SPACING.M }}
            rightIcon={() => (
              <TouchableOpacity
                style={[
                  styles.resendCodeContainer,
                  Boolean(timeLeft) && styles.disabledCodeContainer,
                ]}
                disabled={Boolean(timeLeft)}
                onPress={onPressResendCode}
              >
                <Text style={[TEXT_VARIANTS.font12Bold]}>
                  {t('RESEND')}
                  {Boolean(timeLeft) && ` ${timeLeft}`}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.confirmButtonContainer}>
            <Button
              containerStyles={styles.confirmButton}
              isLoading={isLoading}
              text={t('CONFIRM')}
              onPress={onPressLogin}
              isDisabled={verifyCode?.length !== CODE_MASK.length}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
