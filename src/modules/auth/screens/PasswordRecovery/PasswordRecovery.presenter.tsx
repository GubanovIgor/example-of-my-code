import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Controller, FormProvider } from 'react-hook-form';
import { FormTextInput } from 'components/FormTextInput';
import { TEXT_VARIANTS, SPACING } from 'config/theme';
import { VerifyCodeInput } from 'components/VerifyCodeInput';
import { CODE_MASK } from 'modules/auth/constants';
import { Button } from 'components/Button';

import { PasswordRecoveryPresenterProps } from './PasswordRecovery.types';
import { styles } from './PasswordRecovery.styles';

export const PasswordRecoveryPresenter: FC<PasswordRecoveryPresenterProps> = ({
  onSubmitHandler,
  onPhoneFocus,
  onPressResendCode,
  t,
  formMethods,
  timeLeft,
  isLoaderShown,
  isCodeInputAvailable,
}) => {
  const { handleSubmit, control } = formMethods;

  const subTitle = `${t('PASSWORD_RECOVERY.CANT_REMEMBER_PASSWORD')}\n${t(
    'PASSWORD_RECOVERY.PLEASE_ENTER_PHONE',
  )}`;

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.inputsContainer}>
          <Text style={[TEXT_VARIANTS.font14, styles.subTitle]}>
            {subTitle}
          </Text>
          <FormProvider {...formMethods}>
            <FormTextInput
              name="phone"
              onCustomFocus={onPhoneFocus}
              keyboardType="phone-pad"
              placeholder={t('PHONE.FIELD')}
              helpText={t('PHONE.LABEL')}
            />
            {isCodeInputAvailable && (
              <Controller
                control={control}
                name="code"
                render={({ field: { onChange, value } }) => (
                  <VerifyCodeInput
                    mask={CODE_MASK}
                    value={value}
                    onChangeText={onChange}
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
                )}
              />
            )}
          </FormProvider>
          <Button
            isLoading={isLoaderShown}
            containerStyles={styles.button}
            onPress={handleSubmit(onSubmitHandler)}
            text={isCodeInputAvailable ? t('CONFIRM') : t('NEXT')}
          />
        </View>
      </ScrollView>
    </>
  );
};
