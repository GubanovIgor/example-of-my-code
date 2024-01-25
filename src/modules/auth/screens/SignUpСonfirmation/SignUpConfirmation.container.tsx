import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, graphql } from 'react-relay';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { RootStackParamList } from 'core/interfaces/navigation';
import getToken from 'core/utils/getToken';
import { useAuthStore } from 'store/authStore';
import { ChangeUserPhoneMutation } from 'relay/ChangeUserPhone';
import { PhoneOption } from 'core/interfaces/phoneOption';
import { RESEND_CODE_DELAY } from 'modules/auth/constants';
import { useUtilsStore } from 'store/utilsStore';
import { useTranslation } from 'react-i18next';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import { getClientEnvironment } from 'relay/index';
import { useBranchSettingsStore } from 'store/branchSettingsStore';

import { PATHS } from 'constants/PATHS';

import { SignUpConfirmationPresenter } from './SignUpConfirmation.presenter';
import { SignUpConfirmationForm } from './SignUpConfirmation.types';
import { getFormResolver } from './SignUpConfirmation.helper';

let timer = setInterval(() => {}, 1000);

const Mutation = graphql`
  mutation SignUpConfirmationMutation($userId: Long!) {
    generateSmsCode(userId: $userId)
  }
`;

export const SignUpConfirmationContainer = () => {
  const [timeLeft, setTimeLeft] = useState(RESEND_CODE_DELAY);
  const [verifyCode, setVerifyCode] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    phoneNumber,
    userId,
    phone,
    setLogin,
    setIsFirstDeposit,
    changePhoneNumber,
  } = useAuthStore((s) => ({
    ...s.registrationResult,
    setLogin: s.setLogin,
    setIsFirstDeposit: s.setIsFirstDeposit,
    changePhoneNumber: s.changePhoneNumber,
  }));

  const { getCountriesPhoneOptions } = useBranchSettingsStore((s) => s);

  const countriesOptions = getCountriesPhoneOptions();

  const { setModalData } = useUtilsStore((s) => ({
    setModalData: s.setCustomModalData,
  }));

  const { t } = useTranslation();

  const [phoneCountryValue, setPhoneCountryValue] = useState<
    PhoneOption | undefined
  >(undefined);
  const [isPhoneEditable, setIsPhoneEditable] = useState(false);
  const [changeUserPhone] = useMutation(ChangeUserPhoneMutation);
  const [sendSMS] = useMutation(Mutation);
  const timerRef = React.useRef(timeLeft);
  const formMethods = useForm<SignUpConfirmationForm>({
    resolver: getFormResolver(phoneCountryValue, t),
    defaultValues: {
      phone: phoneNumber,
    },
  });
  const { setError: setFormError } = formMethods;

  const startTimer = () => {
    timer = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timer);
        return false;
      } else {
        setTimeLeft(timerRef.current);
      }
    }, 1000);
  };

  const sendCode = useCallback(() => {
    setIsLoading(true);
    sendSMS({
      variables: { userId: Number(userId) },
      onError: () => {
        setIsLoading(false);
      },
      onCompleted: () => {
        setIsLoading(false);
      },
    });
  }, [sendSMS, userId]);

  useEffect(() => {
    sendCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const countryOption = countriesOptions.find(
      (option) => option.iso === phone?.iso,
    );

    if (phoneCountryValue || !countryOption) return;

    setPhoneCountryValue(countryOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesOptions]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer);
  }, []);

  const onChangeCountry = (value: PhoneOption) => {
    setPhoneCountryValue(value);
  };

  const onPressResendCode = () => {
    setTimeLeft(RESEND_CODE_DELAY);
    timerRef.current = RESEND_CODE_DELAY;
    startTimer();
    sendCode();
  };

  const onEditPhone = () => {
    setIsPhoneEditable(true);
  };

  const onSavePhone: SubmitHandler<SignUpConfirmationForm> = async (values) => {
    setIsLoading(true);
    changeUserPhone({
      variables: {
        userId: Number(userId),
        phoneNumber: phoneCountryValue?.code + values.phone.replaceAll('-', ''),
      },
      onError: (error) => {
        setIsLoading(false);
        const message = error.message;
        if (message.includes('ValidationError_DuplicatePhone')) {
          setFormError('phone', {
            message: String(t('SIGN_UP_SCHEMA.PHONE_USE')),
          });
        }
      },
      onCompleted: () => {
        setIsLoading(false);
        changePhoneNumber(phoneCountryValue, values.phone.replaceAll('X', ''));
        onPressResendCode();
      },
    });
    setIsPhoneEditable(false);
  };

  const onPressLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getToken('none', 'none', verifyCode, userId);
      if (!result.ok)
        return setModalData({
          isVisible: true,
          message: t(`FORM_ERROR.${result?.error.toUpperCase()}`) || '',
        });

      setLogin(result.token, result.refreshToken);
      setIsFirstDeposit(getClientEnvironment());
      navigation.popToTop();
    } finally {
      setIsLoading(false);
    }
  }, [
    verifyCode,
    userId,
    setModalData,
    t,
    setLogin,
    setIsFirstDeposit,
    navigation,
  ]);

  return (
    <BottomSheetWrapper
      screenKey={PATHS.SIGN_UP_CONFIRMATION}
      title={String(t('VERIFICATION'))}
    >
      <FormProvider {...formMethods}>
        <SignUpConfirmationPresenter
          phoneNumber={phoneNumber}
          initialPhoneCode={phoneCountryValue || countriesOptions[0]}
          t={t}
          isPhoneEditable={isPhoneEditable}
          timeLeft={timeLeft}
          onChangeCountry={onChangeCountry}
          onChangeVerifyCode={setVerifyCode}
          verifyCode={verifyCode}
          onPressLogin={onPressLogin}
          onPressResendCode={onPressResendCode}
          onEditPhone={onEditPhone}
          onSavePhone={onSavePhone}
          isLoading={isLoading}
          formMethods={formMethods}
        />
      </FormProvider>
    </BottomSheetWrapper>
  );
};
