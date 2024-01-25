import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';
import { shallow } from 'zustand/shallow';
import jwtDecode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthStore } from 'store/authStore';
import getToken from 'core/utils/getToken';
import { formatDateString } from 'core/utils/formatDateString';
import { RootStackParamList } from 'core/interfaces/navigation';
import { UserRegistrationInput } from 'queries/__generated__/SignUpMutation.graphql';
import { useTranslation } from 'react-i18next';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import { useBranchSettingsStore } from 'store/branchSettingsStore';
import { CustomPickerValue } from 'core/interfaces';
import { PhoneOption } from 'core/interfaces/phoneOption';

import { PATHS } from 'constants/PATHS';

import { formatPhoneNumberByMask, getFormResolver } from './SignUp.helper';
import { SignUpForm } from './SignUp.types';
import { SignUpPresenter } from './SignUp.presenter';

const Mutation = graphql`
  mutation SignUpMutation($input: UserRegistrationInput!) {
    registerUser(userRegistration: $input) {
      state
      success
    }
  }
`;

export const SignUpContainer = () => {
  const { getCountriesPhoneOptions, getCurrencies } = useBranchSettingsStore(
    (s) => ({
      getCountriesPhoneOptions: s.getCountriesPhoneOptions,
      getCurrencies: s.getNormalizedPickerCurrencies,
    }),
  );

  const countriesOptions = getCountriesPhoneOptions();

  const [phoneCountryValue, setPhoneCountryValue] =
    useState<PhoneOption | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [commit] = useMutation(Mutation);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { t } = useTranslation();

  const { setClaims, setRegistration } = useAuthStore(
    (s) => ({
      email: s.registrationResult.email,
      password: s.registrationResult.password,
      setClaims: s.setClaims,
      setRegistration: s.setRegistration,
    }),
    shallow,
  );

  const formMethods = useForm<SignUpForm>({
    resolver: getFormResolver(phoneCountryValue, t),
  });

  useEffect(() => {
    if (phoneCountryValue || !countriesOptions?.length) return;

    setPhoneCountryValue(countriesOptions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesOptions]);

  const { setError: setFormError, getValues, setValue, watch } = formMethods;

  const [currency, setCurrency] = useState<CustomPickerValue>();

  const onSubmitHandler: SubmitHandler<SignUpForm> = async (values) => {
    if (!phoneCountryValue) return;

    const formattedPhoneNumber = formatPhoneNumberByMask(
      phoneCountryValue,
      values.phone.replaceAll('-', ''),
    );

    setIsLoading(true);
    const input: UserRegistrationInput = {
      email: values.email,
      password: values.password,
      address: values.address,
      firstName: values.name,
      lastName: values.lastName,
      birthday: formatDateString(values.dob),
      countryId: phoneCountryValue?.id,
      phoneNumber: phoneCountryValue?.code + values.phone.replaceAll('-', ''),
      currencyId: currency?.id,
    };

    commit({
      variables: { input },
      onError: (err) => {
        setIsLoading(false);
        const message = err.message;
        if (message.includes('ValidationError_DuplicatePhone')) {
          setFormError('phone', {
            message: String(t('SIGN_UP_SCHEMA.PHONE_USE')),
          });
        } else if (message.includes('ValidationError_DuplicateEMail')) {
          setFormError('email', {
            message: String(t('SIGN_UP_SCHEMA.EMAIL_USE')),
          });
        }
      },
      onCompleted: () => {
        setRegistration(
          values.email,
          values.password,
          { ...phoneCountryValue },
          formattedPhoneNumber,
        );
        getToken(getValues().email, getValues().password).then((result) => {
          setIsLoading(false);
          if (result.ok) {
            const claims = jwtDecode<{
              is_anonymous: boolean;
              sub: string;
            }>(result.token);

            setClaims(claims.is_anonymous, claims.sub);
            navigation.goBack();
            navigation.navigate(PATHS.SIGN_UP_CONFIRMATION);
          }
        });
      },
    });
  };

  const onChangeCountry = useCallback((value: PhoneOption) => {
    setPhoneCountryValue(value);
  }, []);

  const handleSelectorItem = useCallback((currencyData: CustomPickerValue) => {
    setCurrency(currencyData);
  }, []);

  const openSelectorModal = useCallback(() => {
    navigation.navigate(PATHS.CUSTOM_PICKER, {
      data: getCurrencies(),
      handleSelectorItem,
    });
  }, [getCurrencies, handleSelectorItem, navigation]);

  const onBirthDateChange = useCallback(
    (value: string) => {
      setValue('dob', value, { shouldValidate: true });
      navigation.pop();
    },
    [navigation, setValue],
  );

  const handlePressOnBirthDate = useCallback(() => {
    navigation.navigate(PATHS.DATE_PICKER, {
      currentValue: watch('dob'),
      onValueChange: onBirthDateChange,
    });
  }, [navigation, onBirthDateChange, watch]);

  return (
    <BottomSheetWrapper title={String(t('SIGN_UP'))} screenKey={PATHS.SIGN_UP}>
      <FormProvider {...formMethods}>
        <SignUpPresenter
          t={t}
          handlePressOnBirthDate={handlePressOnBirthDate}
          initialSelectedPhone={phoneCountryValue}
          currency={currency}
          isLoading={isLoading}
          formMethods={formMethods}
          onSubmitHandler={onSubmitHandler}
          onChangeCountry={onChangeCountry}
          openSelectorModal={openSelectorModal}
        />
      </FormProvider>
    </BottomSheetWrapper>
  );
};
