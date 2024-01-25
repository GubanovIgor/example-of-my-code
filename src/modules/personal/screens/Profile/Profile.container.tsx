import React, { FC, Suspense, useState } from 'react';
import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { LoadingView } from 'components/LoadingView';
import { LazyLoadQueryOptions } from 'core/interfaces';
import { Linking } from 'react-native';
import { useLazyLoadQuery } from 'react-relay';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import { ProfileScreenQuery } from 'queries/__generated__/ProfileScreenQuery.graphql';

import { SUPPORT_URL } from 'constants/URLS';
import { PATHS } from 'constants/PATHS';

import { ProfilePresenter } from './Profile.presenter';
import { ProfileContainerProps } from './Profile.types';
import { ProfileInformationQuery } from './Profile.queries';

export const ProfileSuspenseWrapper = () => {
  const [refreshedQueryOptions, setRefreshedQueryOptions] =
    useState<LazyLoadQueryOptions>({
      fetchPolicy: 'store-or-network',
      fetchKey: 0,
    });

  const onRefresh = () => {
    setRefreshedQueryOptions((prev) => ({
      ...prev,
      fetchKey: Number(prev?.fetchKey || 0) + 1,
    }));
  };

  return (
    <Suspense fallback={<LoadingView />}>
      <CustomErrorBoundary onRefresh={onRefresh}>
        <ProfileContainer queryOptions={refreshedQueryOptions} />
      </CustomErrorBoundary>
    </Suspense>
  );
};

export const ProfileContainer: FC<ProfileContainerProps> = ({
  queryOptions,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const personalInformationData = useLazyLoadQuery<ProfileScreenQuery>(
    ProfileInformationQuery,
    {},
    queryOptions,
  );

  const onPressSupport = () => {
    Linking.openURL(`mailto: ${SUPPORT_URL}`);
  };

  const onPressChangePasword = () => {
    navigation.navigate(PATHS.CHANGE_PASSWORD);
  };

  const onPressVerification = () => {
    navigation.navigate(PATHS.VERIFICATION);
  };

  return (
    <ProfilePresenter
      onPressVerification={onPressVerification}
      onPressChangePasword={onPressChangePasword}
      onPressSupport={onPressSupport}
      personalInformationRef={personalInformationData}
    />
  );
};
