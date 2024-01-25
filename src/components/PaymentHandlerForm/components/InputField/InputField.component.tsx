import React, { useEffect, useState } from 'react';
import { FormTextInput } from 'components/FormTextInput';
import { InputField_fragment$key } from 'queries/__generated__/InputField_fragment.graphql';
import { graphql, useFragment } from 'react-relay';
import { useUserStore } from 'store/userStore';
import { useFormContext } from 'react-hook-form';
import { InputFieldWrapper_fragment$key } from 'queries/__generated__/InputFieldWrapper_fragment.graphql';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from 'store/authStore';

import { styles } from './InputField.syles';
import { FastAmounts } from '../FastAmounts';
import {
  convertValidationRules,
  getCustomValue,
  getParentValue,
} from './InputField.helpers';

const InputFragment = graphql`
  fragment InputField_fragment on InputField {
    __typename
    key
    name
    fieldId
    parentFieldKey
    validationRules {
      ... on LengthValidationRule {
        __typename
        minLength
        maxLength
        message
      }
      ... on RangeValidationRule {
        __typename
        minValue
        maxValue
        message
      }
      ... on RegexValidationRule {
        __typename
        pattern
        message
      }
      ... on MaskValidationRule {
        __typename
        mask
      }
    }
  }
`;

const wrapperFragment = graphql`
  fragment InputFieldWrapper_fragment on InputField {
    ...InputField_fragment
    name
    key
    parentFieldKey
  }
`;

export const InputFieldWrapper = ({
  fragmentRef,
  ...rest
}: {
  balance?: number;
  fragmentRef: InputFieldWrapper_fragment$key;
}) => {
  const data = useFragment(wrapperFragment, fragmentRef);
  const { watch, unregister } = useFormContext();

  useEffect(() => {
    if (!data.key) return;
    return () => {
      if (data.key) {
        unregister(data.key, { keepError: false });
      }
    };
  }, [data.key, unregister]);

  const parentValue = getParentValue(
    data?.parentFieldKey && watch(data.parentFieldKey),
  );

  return parentValue === data.name || parentValue === null ? (
    <InputField {...rest} fragmentRef={data} />
  ) : null;
};

export const InputField = ({
  fragmentRef,
  balance,
}: {
  balance?: number;
  fragmentRef: InputField_fragment$key;
}) => {
  const { t } = useTranslation();
  const data = useFragment(InputFragment, fragmentRef);
  const validationRules = convertValidationRules(data.validationRules);
  const [customValue, setCustomValue] = useState<string | undefined>(
    getCustomValue(validationRules?.min?.value, balance),
  );
  const { currencyShortSign } = useUserStore((state) => ({
    currencyShortSign: state.userDetails?.currencyDisplayShortSign,
  }));

  const { setFirstDepositAmount, isFirstDeposit } = useAuthStore((s) => ({
    setFirstDepositAmount: s.setFirstDepositAmount,
    isFirstDeposit: s.depositState.isFirstDeposit,
  }));

  const onChangeFirstDepositAmount = (text: string) => {
    if (isFirstDeposit) {
      setFirstDepositAmount(parseInt(text, 10));
    }
  };

  if (data.key === 'amount') {
    const amountValidation = data.validationRules?.filter(
      (rule) => rule?.__typename === 'RangeValidationRule',
    )?.[0] as { minValue: number; maxValue: number };

    return (
      <>
        <FormTextInput
          onChangeFirstDepositAmount={onChangeFirstDepositAmount}
          validationRules={validationRules}
          styleProps={styles.field}
          customValue={customValue}
          name={data.key || ''}
          placeholder={data.name || ''}
          helpText={t('MIN_MAX_RANGE_TEXT', {
            min: amountValidation.minValue,
            max: `${amountValidation.maxValue} ${currencyShortSign}`,
          })}
          isFirstDeposit={isFirstDeposit}
        />
        <FastAmounts
          amountValidation={amountValidation}
          balance={balance}
          onChooseAmount={setCustomValue}
          isFirstDeposit={isFirstDeposit}
          onChangeFirstDepositAmount={onChangeFirstDepositAmount}
        />
      </>
    );
  }

  return (
    <FormTextInput
      validationRules={validationRules}
      styleProps={styles.field}
      name={data.key || ''}
      placeholder={data.name || ''}
    />
  );
};
