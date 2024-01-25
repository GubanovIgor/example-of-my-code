import React, { FC, Suspense, useState } from 'react';
import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { LoadingView } from 'components/LoadingView';
import { LazyLoadQueryOptions } from 'core/interfaces';
import { RootStackScreenProps } from 'core/interfaces/navigation';
import { SubHeader } from 'components/SubHeader';
import { HomeScreenQuery } from 'queries/__generated__/HomeScreenQuery.graphql';
import { useLazyLoadQuery } from 'react-relay';
import { useTranslation } from 'react-i18next';

import { PATHS } from 'constants/PATHS';

import { ProvidersPresenter } from './Providers.presenter';
import { HomeQuery } from '../Home/Home.container';

interface ProvidersContainerProps
  extends RootStackScreenProps<PATHS.PROVIDERS> {
  queryOptions?: LazyLoadQueryOptions;
}

export const ProvidersSuspenseWrapper = (
  props: RootStackScreenProps<PATHS.PROVIDERS>,
) => {
  const { t } = useTranslation();
  const [refreshedQueryOptions, setRefreshedQueryOptions] =
    useState<LazyLoadQueryOptions>();

  const onRefresh = () => {
    setRefreshedQueryOptions((prev) => ({
      fetchKey: Number(prev?.fetchKey || 0) + 1,
    }));
  };

  return (
    <Suspense fallback={<LoadingView />}>
      <SubHeader shouldUseInsets={false} title={t('PROVIDERS')} isBackButton />
      <CustomErrorBoundary onRefresh={onRefresh}>
        <ProviderContainer {...props} queryOptions={refreshedQueryOptions} />
      </CustomErrorBoundary>
    </Suspense>
  );
};

export const ProviderContainer: FC<ProvidersContainerProps> = ({
  queryOptions,
}) => {
  const data = useLazyLoadQuery<HomeScreenQuery>(HomeQuery, {}, queryOptions);

  return <ProvidersPresenter providers={data?.providers?.items} />;
};
