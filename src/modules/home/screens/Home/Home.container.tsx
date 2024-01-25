import React, { FC, Suspense, useCallback, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { LoadingView } from 'components/LoadingView';
import { LazyLoadQueryOptions } from 'core/interfaces';
import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { HomeScreenQuery } from 'queries/__generated__/HomeScreenQuery.graphql';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';

import { PATHS } from 'constants/PATHS';

import { HomeContainerProps } from './Home.types';
import { HomePresenter } from './Home.presenter';

export const HomeQuery = graphql`
  query HomeScreenQuery {
    top: gamesByFilter(skip: 0, take: 6, tags: [TOP]) {
      items {
        ...HomeGameCard_fragment
      }
    }
    new: gamesByFilter(skip: 0, take: 6, tags: [NEW]) {
      items {
        ...HomeGameCard_fragment
      }
    }
    pop: gamesByFilter(skip: 0, take: 6, tags: [POP]) {
      items {
        ...HomeGameCard_fragment
      }
    }
    hot: gamesByFilter(skip: 0, take: 6, tags: [HOT]) {
      items {
        ...HomeGameCard_fragment
      }
    }
    providers: gameProvidersByFilter(take: 100) {
      items {
        ...ProvidersListItem_fragment
      }
    }
    ...CategoryItemList_fragment
    ...WinningNow_fragment
  }
`;

export const HomeSuspenseWrapper = () => {
  const [refreshedQueryOptions, setRefreshedQueryOptions] =
    useState<LazyLoadQueryOptions>();

  const onRefresh = () => {
    setRefreshedQueryOptions((prev) => ({
      fetchKey: Number(prev?.fetchKey || 0) + 1,
    }));
  };

  return (
    <Suspense fallback={<LoadingView />}>
      <CustomErrorBoundary onRefresh={onRefresh}>
        <HomeContainer queryOptions={refreshedQueryOptions} />
      </CustomErrorBoundary>
    </Suspense>
  );
};

export const HomeContainer: FC<HomeContainerProps> = ({ queryOptions }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const data = useLazyLoadQuery<HomeScreenQuery>(
    HomeQuery,
    {},
    { ...queryOptions, fetchPolicy: 'store-or-network' },
  );

  const handlePressAllProviders = useCallback(() => {
    navigation.navigate(PATHS.PROVIDERS);
  }, [navigation]);

  return (
    <HomePresenter
      handlePressAllProviders={handlePressAllProviders}
      data={data}
    />
  );
};
