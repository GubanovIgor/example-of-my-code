import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import getToken from 'core/utils/getToken';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { useAuthStore } from 'store/authStore';
import { useUtilsStore } from 'store/utilsStore';
import { useTranslation } from 'react-i18next';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import { getClientEnvironment } from 'relay/index';

import { PATHS } from 'constants/PATHS';

import { getFormResolver } from './SignIn.helper';
import { SignInPresenter } from './SignIn.presenter';
import { SignInForm } from './SignIn.types';

export const SignInContainer = () => {
  const { t } = useTranslation();

  const formMethods = useForm<SignInForm>({
    resolver: getFormResolver(t),
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { setLogin, setIsFirstDeposit } = useAuthStore((s) => ({
    setLogin: s.setLogin,
    setIsFirstDeposit: s.setIsFirstDeposit,
  }));

  const { setModalData } = useUtilsStore((s) => ({
    setModalData: s.setCustomModalData,
  }));

  const onSubmitHandler: SubmitHandler<SignInForm> = async (
    values: SignInForm,
  ) => {
    setIsLoading(true);
    try {
      const response = await getToken(values.username, values.password);
      if (!response.ok)
        return setModalData({ isVisible: true, message: response.error || '' });
      setLogin(response?.token, response.refreshToken);
      setIsFirstDeposit(getClientEnvironment());

      navigation.pop();
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressRecoveryPassword = () => {
    navigation.navigate(PATHS.PASSWORD_RECOVERY);
  };

  const handlePressSignUp = () => {
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate(PATHS.SIGN_UP);
    }, 250);
  };

  return (
    <BottomSheetWrapper screenKey={PATHS.SIGN_IN} title={t('LOGIN')}>
      <FormProvider {...formMethods}>
        <SignInPresenter
          t={t}
          handlePressSignUp={handlePressSignUp}
          handlePressRecoveryPassword={handlePressRecoveryPassword}
          isLoading={isLoading}
          onSubmitHandler={onSubmitHandler}
          formMethods={formMethods}
        />
      </FormProvider>
    </BottomSheetWrapper>
  );
};
