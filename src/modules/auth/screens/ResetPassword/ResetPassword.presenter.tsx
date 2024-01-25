import React, { FC } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FormProvider } from 'react-hook-form';
import { SPACING } from 'config/theme';
import { FormTextInput } from 'components/FormTextInput';
import { Button } from 'components/Button';

import { ResetPasswordPresenterProps } from './ResetPassword.types';
import { styles } from './ResetPassword.styles';

export const ResetPasswordPresenter: FC<ResetPasswordPresenterProps> = ({
  formMethods,
  isLoading,
  onSubmitHandler,
  t,
}) => {
  const { handleSubmit } = formMethods;

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.inputsContainer}>
          <FormProvider {...formMethods}>
            <FormTextInput
              name="password"
              isSecure
              placeholder={t('PASSWORD_RECOVERY.NEW_PASSWORD')}
            />
            <FormTextInput
              name="repeatPassword"
              isSecure
              styleProps={{ marginTop: SPACING.M }}
              placeholder={t('PASSWORD_RECOVERY.REPEAT_PASSWORD')}
            />
          </FormProvider>
          <Button
            text={t('SAVE')}
            isLoading={isLoading}
            containerStyles={styles.button}
            onPress={handleSubmit(onSubmitHandler)}
          />
        </View>
      </ScrollView>
    </>
  );
};
