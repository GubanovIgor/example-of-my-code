import React from 'react';
import { graphql, useFragment } from 'react-relay';
import { View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { PaymentHandlerForm_fragment$key } from 'queries/__generated__/PaymentHandlerForm_fragment.graphql';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';
import { styles } from './PaymentHandlerForm.styles';
import { InputField } from './components/InputField';
import { SelectField } from './components';

interface Props {
  paymentMethodRef: PaymentHandlerForm_fragment$key | null;
  onSubmit: (values: Record<string, string | { value: string }>) => void;
  isOnSubmitLoading: boolean;
  balance?: number;
}

const PaymentHandlerFormFragment = graphql`
  fragment PaymentHandlerForm_fragment on PaymentHandlerV2 {
    fields {
      __typename
      ...InputFieldWrapper_fragment
      ...SelectField_fragment
    }
  }
`;

export const PaymentHandlerForm = ({
  paymentMethodRef,
  onSubmit,
  balance,
  isOnSubmitLoading,
}: Props) => {
  const { t } = useTranslation();

  const fields = useFragment(
    PaymentHandlerFormFragment,
    paymentMethodRef,
  )?.fields;

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <View style={styles.paymentContainer}>
        {/* @ts-ignore */}
        {fields?.map((field, index) => {
          switch (field.__typename) {
            case 'InputField':
              return (
                <InputField balance={balance} key={index} fragmentRef={field} />
              );
            case 'SelectField':
              return <SelectField key={index} fragmentRef={field} />;

            default:
              return null;
          }
        })}
        <View style={styles.paymentButtonContainer}>
          <Button
            text={t('PROCEED_TO_PAYMENT')}
            containerStyles={styles.paymentButton}
            onPress={methods.handleSubmit(onSubmit)}
            isLoading={isOnSubmitLoading}
          />
        </View>
      </View>
    </FormProvider>
  );
};
