import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTimer } from 'core/hooks';
import { RootStackParamList } from 'core/interfaces/navigation';
import getToken from 'core/utils/getToken';
import { PasswordRecovery_generateSmsMutation } from 'queries/__generated__/PasswordRecovery_generateSmsMutation.graphql';
import {
  PasswordRecovery_resetMutation,
  PasswordRecovery_resetMutation$data,
} from 'queries/__generated__/PasswordRecovery_resetMutation.graphql';
import React, { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-relay';
import { useAuthStore } from 'store/authStore';
import { useUtilsStore } from 'store/utilsStore';
import { useTranslation } from 'react-i18next';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import { getClientEnvironment } from 'relay/index';

import { PATHS } from 'constants/PATHS';

import { getFormResolver } from './PasswordRecovery.helper';
import { PasswordRecoveryPresenter } from './PasswordRecovery.presenter';
import { PasswordRecoveryForm } from './PasswordRecovery.types';
import {
  GenerateSmsMutation,
  PasswordRecoveryMutation,
} from './PasswordRecovery.queries';

export const PasswordRecoveryContainer = () => {
  const [isCodeInputAvailable, setIsCodeInputAvailable] = useState(false);

  const { t } = useTranslation();

  const formMethods = useForm<PasswordRecoveryForm>({
    resolver: getFormResolver(isCodeInputAvailable, t),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { timeLeft, resetTimer, stopTimer, startTimer } = useTimer(10);
  const [resetPasswordData, setResetPasswordData] =
    useState<PasswordRecovery_resetMutation$data>();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { setLogin, setIsFirstDeposit } = useAuthStore((s) => ({
    setLogin: s.setLogin,
    setIsFirstDeposit: s.setIsFirstDeposit,
  }));

  const { setModalData } = useUtilsStore((s) => ({
    setModalData: s.setCustomModalData,
  }));

  const [commit, isResetReqLoading] =
    useMutation<PasswordRecovery_resetMutation>(PasswordRecoveryMutation);
  const [generateSmsCode, isGenerateSmsReqLoading] =
    useMutation<PasswordRecovery_generateSmsMutation>(GenerateSmsMutation);

  const isLoaderShown = useMemo(
    () => isResetReqLoading || isGenerateSmsReqLoading || isLoading,
    [isGenerateSmsReqLoading, isLoading, isResetReqLoading],
  );

  const onSubmitHandler: SubmitHandler<PasswordRecoveryForm> = async (
    values,
  ) => {
    if (!values?.code) {
      return commit({
        variables: {
          input: values.phone,
        },
        onCompleted: (data) => {
          setResetPasswordData(data);
          startTimer();
          setIsCodeInputAvailable(true);
        },
        onError: (error) => {
          setModalData({ isVisible: true, message: error?.message || '' });
        },
      });
    }
    setIsLoading(true);

    try {
      const loginRes = await getToken(
        'none',
        'none',
        values?.code,
        resetPasswordData?.resetPassword?.userId,
      );

      if (!loginRes.ok)
        return setModalData({
          isVisible: true,
          message: loginRes?.error || '',
        });
      setLogin(loginRes?.token, loginRes?.refreshToken);
      setIsFirstDeposit(getClientEnvironment());
      navigation.getParent()?.goBack();
      navigation.navigate(PATHS.RESET_PASSWORD, {
        resetToken: resetPasswordData?.resetPassword?.resetToken,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onPhoneFocus = () => {
    formMethods.setValue('code', '');
    stopTimer();
    setIsCodeInputAvailable(false);
  };

  const onPressResendCode = () => {
    generateSmsCode({
      variables: {
        userId: resetPasswordData?.resetPassword?.userId,
      },
      onCompleted: () => {
        resetTimer();
      },
    });
  };

  return (
    <BottomSheetWrapper
      screenKey={PATHS.PASSWORD_RECOVERY}
      title={t('PASSWORD_RECOVERY.TITLE')}
      isBackButton
    >
      <PasswordRecoveryPresenter
        t={t}
        onPressResendCode={onPressResendCode}
        timeLeft={timeLeft}
        onPhoneFocus={onPhoneFocus}
        isCodeInputAvailable={isCodeInputAvailable}
        onSubmitHandler={onSubmitHandler}
        formMethods={formMethods}
        isLoaderShown={isLoaderShown}
      />
    </BottomSheetWrapper>
  );
};
