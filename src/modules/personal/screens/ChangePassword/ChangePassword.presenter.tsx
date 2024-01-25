import React, { FC } from 'react';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import { FormTextInput } from 'components/FormTextInput';
import { Button } from 'components/Button';
import { SubHeader } from 'components/SubHeader';

import { ChangePasswordForm } from './ChangePassword.types';
import { styles } from './ChangePassword.styles';

interface ChangePasswordPresenterProps {
  t: GetTranslationValue;
  formMethods: UseFormReturn<ChangePasswordForm, any>;
  handlePressSave: (data: ChangePasswordForm) => void;
  handlePressForgotPassword: VoidFunction;
  isLoading: boolean;
}

export const ChangePasswordPresenter: FC<ChangePasswordPresenterProps> = ({
  t,
  formMethods,
  isLoading,
  handlePressSave,
  handlePressForgotPassword,
}) => {
  const { handleSubmit } = formMethods;

  return (
    <>
      <SubHeader
        shouldUseInsets={true}
        isBackButton
        title={t('CHANGE_PASSWORD')}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <FormProvider {...formMethods}>
          <FormTextInput
            isSecure
            name="currentPassword"
            placeholder={t('CURRENT_PASSWORD')}
            isEditable={!isLoading}
            activeLabelColor={COLORS.BACKGROUND}
          />

          <Text
            onPress={handlePressForgotPassword}
            style={[TEXT_VARIANTS.font10, styles.forgotYourText]}
          >
            {t('FORGOT_YOUR')}
            <Text style={styles.passwordText}>{` ${t('PASSWORD')}`}</Text>?
          </Text>
          <FormTextInput
            isSecure
            name="password"
            activeLabelColor={COLORS.BACKGROUND}
            placeholder={t('PASSWORD_RECOVERY.NEW_PASSWORD')}
            isEditable={!isLoading}
            styleProps={styles.inputTopMargin}
          />
          <Text style={[TEXT_VARIANTS.font10, styles.rulesText]}>
            {`${t('PASSWORD_CHANGE_RULES.RULE1')}\n`}
            {`${t('PASSWORD_CHANGE_RULES.RULE2')}\n`}
            {`${t('PASSWORD_CHANGE_RULES.RULE3')}\n`}
            {`${t('PASSWORD_CHANGE_RULES.RULE4')}\n`}
          </Text>
          <FormTextInput
            isSecure
            name="newPassword"
            activeLabelColor={COLORS.BACKGROUND}
            placeholder={t('PASSWORD_RECOVERY.REPEAT_PASSWORD')}
            isEditable={!isLoading}
            styleProps={styles.inputTopMargin}
          />
        </FormProvider>
        <View style={styles.saveBtnContainer}>
          <Button
            text={t('SAVE')}
            containerStyles={styles.saveBtn}
            onPress={handleSubmit(handlePressSave)}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </>
  );
};
