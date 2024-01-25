import React, { FC } from 'react';
import { FragmentRefs } from 'relay-runtime';
import { ProvidersList } from 'components/ProvidersList';

interface ProvidersPresenterProps {
  providers?: ReadonlyArray<{
    readonly ' $fragmentSpreads': FragmentRefs<'ProvidersListItem_fragment'>;
  }> | null;
}

export const ProvidersPresenter: FC<ProvidersPresenterProps> = ({
  providers,
}) => <ProvidersList hasHeader={false} providers={providers} />;
