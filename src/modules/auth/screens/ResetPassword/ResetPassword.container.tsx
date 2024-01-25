import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SubmitHandler, useForm } from 'react-hook-form';
import { graphql, useMutation } from 'react-relay';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'core/interfaces/navigation';
import { useUtilsStore } from 'store/utilsStore';
import { useTranslation } from 'react-i18next';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';

import { PATHS } from 'constants/PATHS';

import { getFormResolver } from './ResetPassword.helper';
import { ResetPasswordPresenter } from './ResetPassword.presenter';
import { ResetPasswordForm } from './ResetPassword.types';

const Mutation = graphql`
  mutation ResetPassword_resetMutation(
    $resetToken: String!
    $newPassword: String!
  ) {
    setPassword(resetToken: $resetToken, newPassword: $newPassword)
  }
`;

export const ResetPasswordContainer: FC<
  RootStackScreenProps<PATHS.RESET_PASSWORD>
> = ({ route }) => {
  const { resetToken } = route?.params || {};
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const formMethods = useForm<ResetPasswordForm>({
    resolver: getFormResolver(t),
  });

  const { setModalData } = useUtilsStore((s) => ({
    setModalData: s.setCustomModalData,
  }));

  const [commit, isLoading] = useMutation(Mutation);

  const onSubmitHandler: SubmitHandler<ResetPasswordForm> = async (values) => {
    commit({
      variables: {
        resetToken,
        newPassword: values.password,
      },
      onCompleted: () => {
        navigation.pop();
        navigation.navigate(PATHS.RESET_PASSWORD_SUCCESS);
      },
      onError: (error) => {
        setModalData({ isVisible: true, message: error?.message || '' });
      },
    });
  };

  return (
    <BottomSheetWrapper
      screenKey={PATHS.RESET_PASSWORD}
      title={String(t('PASSWORD_RECOVERY.NEW_PASSWORD'))}
    >
      <ResetPasswordPresenter
        t={t}
        isLoading={isLoading}
        onSubmitHandler={onSubmitHandler}
        formMethods={formMethods}
      />
    </BottomSheetWrapper>
  );
};
