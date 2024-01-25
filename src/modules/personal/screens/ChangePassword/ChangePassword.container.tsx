import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import { ChangePasswordScreenMutation } from 'queries/__generated__/ChangePasswordScreenMutation.graphql';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { graphql, useMutation } from 'react-relay';
import { showToast } from 'core/utils';

import { PATHS } from 'constants/PATHS';

import { getFormResolver } from './ChangePassword.helpers';
import { ChangePasswordPresenter } from './ChangePassword.presenter';
import { ChangePasswordForm } from './ChangePassword.types';

const Mutation = graphql`
  mutation ChangePasswordScreenMutation(
    $oldPassword: String!
    $newPassword: String!
  ) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

export const ChangePasswordContainer = ({}) => {
  const { t } = useTranslation();
  const [commit, loading] = useMutation<ChangePasswordScreenMutation>(Mutation);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const formMethods = useForm<ChangePasswordForm>({
    resolver: getFormResolver(t),
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const handlePressSave = (data: ChangePasswordForm) => {
    commit({
      variables: {
        oldPassword: data.currentPassword,
        newPassword: data.password,
      },
      onCompleted: () => {
        formMethods.reset({
          currentPassword: '',
          password: '',
          newPassword: '',
        });
        showToast(t('PASSWORD_RECOVERY.NEW_PASSWORD_SET'));
      },
      onError: () => {
        showToast(t('SOMETHING_WENT_WRONG'), true);
      },
    });
  };

  const handlePressForgotPassword = () => {
    navigation.navigate(PATHS.SIGN_IN);
  };

  return (
    <ChangePasswordPresenter
      handlePressSave={handlePressSave}
      handlePressForgotPassword={handlePressForgotPassword}
      formMethods={formMethods}
      isLoading={loading}
      t={t}
    />
  );
};
