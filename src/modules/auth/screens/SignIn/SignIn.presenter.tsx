import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SPACING, TEXT_VARIANTS } from 'config/theme';
import { FormTextInput } from 'components/FormTextInput';
import { Button } from 'components/Button';

import { styles } from './SignIn.styles';
import { SignInPresenterProps } from './SignIn.types';

export const SignInPresenter: FC<SignInPresenterProps> = ({
  formMethods,
  isLoading,
  onSubmitHandler,
  handlePressRecoveryPassword,
  handlePressSignUp,
  t,
}) => {
  const { handleSubmit } = formMethods;

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={styles.inputsContainer}>
        <FormTextInput placeholder={t('USERNAME.FIELD')} name="username" />

        <FormTextInput
          placeholder={t('PASSWORD')}
          name="password"
          isSecure
          styleProps={{ marginTop: SPACING.M }}
        />

        <Text
          onPress={handlePressRecoveryPassword}
          style={[TEXT_VARIANTS.font10, styles.forgotYourText]}
        >
          {`${t('FORGOT_YOUR')} `}
          <Text style={styles.underlineText}>{`${t('PASSWORD')}?`}</Text>
        </Text>
        <Button
          text={t('LOGIN')}
          isLoading={isLoading}
          containerStyles={styles.loginBtn}
          onPress={handleSubmit(onSubmitHandler)}
        />
        <Text
          onPress={handlePressSignUp}
          style={[TEXT_VARIANTS.font10, styles.notRegisteredYet]}
        >
          {`${t('NOT_REGISTERED_YET')} `}
          <Text style={styles.underlineTextSignUp}>{t('SIGN_UP')}</Text>
        </Text>
      </View>
    </ScrollView>
  );
};
