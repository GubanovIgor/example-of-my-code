import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import { showToast } from 'core/utils';
import {
  LimitType,
  ResponsibleGamingLimitsMutation,
  ResponsibleGamingLimitsMutation$variables,
} from 'queries/__generated__/ResponsibleGamingLimitsMutation.graphql';
import {
  ResponsibleGamingLockMutation,
  ResponsibleGamingLockMutation$variables,
} from 'queries/__generated__/ResponsibleGamingLockMutation.graphql';
import {
  ResponsibleGamingMaxLimitMutation,
  ResponsibleGamingMaxLimitMutation$variables,
} from 'queries/__generated__/ResponsibleGamingMaxLimitMutation.graphql';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-relay';
import { useAuthStore } from 'store/authStore';

import { PATHS } from 'constants/PATHS';

import {
  LockMutation,
  SaveMaxSessionLimitMutation,
  SaveTrioLimitsMutation,
} from '../ResponsibleGaming.queries';
import { SelfLimits } from '../ResponsibleGaming.types';

export const useResponsbileGamingCases = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const { logout } = useAuthStore((state) => state);

  const [saveTrioLimits, isSaveTrioLimitsLoading] =
    useMutation<ResponsibleGamingLimitsMutation>(SaveTrioLimitsMutation);

  const [saveMaxLimit, isSavingMaxLimit] =
    useMutation<ResponsibleGamingMaxLimitMutation>(SaveMaxSessionLimitMutation);

  const [lockUser, isLockingUser] =
    useMutation<ResponsibleGamingLockMutation>(LockMutation);

  const getLimitObjectKeyByType = (type: LimitType) => {
    switch (type) {
      case 'DEPOSIT':
        return 'depositLimits';
      case 'LOSS':
        return 'lossLimits';

      default:
        return 'stakeLimits';
    }
  };

  const handleResponse = (isError?: boolean) => {
    showToast(
      t(isError ? 'SOMETHING_WENT_WRON' : 'CHANGES_BEEN_SAVED'),
      isError,
    );
  };

  const handleSaveTrioLimits = (
    input: ResponsibleGamingLimitsMutation$variables,
    onCompleted: Dispatch<SetStateAction<SelfLimits | undefined>>,
  ) => {
    const limitObjectKey = getLimitObjectKeyByType(input.type);
    saveTrioLimits({
      variables: {
        ...input,
        trioLimits: {
          perDay: Number(input.trioLimits?.perDay),
          perWeek: Number(input?.trioLimits?.perWeek),
          perMonth: Number(input?.trioLimits?.perMonth),
        },
      },
      onCompleted: (data) => {
        limitObjectKey &&
          onCompleted((prev) => ({
            ...prev,
            [limitObjectKey]: data?.saveTrioLimits,
          }));

        handleResponse();
      },
      onError: () => {
        handleResponse(true);
      },
    });
  };

  const handleSaveMaxLimit = (
    input: ResponsibleGamingMaxLimitMutation$variables,
    onCompleted: Dispatch<SetStateAction<SelfLimits | undefined>>,
  ) => {
    saveMaxLimit({
      variables: { maxSessionTime: Number(input.maxSessionTime) },
      onCompleted: (data) => {
        onCompleted((prev) => ({
          ...prev,
          maxSessionTimeLimit: data?.saveMaxSessionTime,
        }));

        handleResponse();
      },
      onError: () => {
        handleResponse(true);
      },
    });
  };

  const handleLockUser = (input: ResponsibleGamingLockMutation$variables) => {
    lockUser({
      variables: input,
      onCompleted: () => {
        logout();

        //@ts-ignore
        navigation.navigate(PATHS.HOME);
      },
      onError: () => {
        handleResponse(true);
      },
    });
  };

  return {
    handleSaveTrioLimits,
    handleSaveMaxLimit,
    handleLockUser,
    isLockingUser,
    isSavingMaxLimit,
    isSaveTrioLimitsLoading,
  };
};
