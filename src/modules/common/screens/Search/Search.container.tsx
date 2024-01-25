import React, { FC, Suspense, useCallback, useState } from 'react';
import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { LoadingView } from 'components/LoadingView';
import { LazyLoadArgs } from 'core/interfaces';
import { graphql, useLazyLoadQuery } from 'react-relay';
import {
  SearchScreenGamesQuery,
  SearchScreenGamesQuery$variables,
} from 'queries/__generated__/SearchScreenGamesQuery.graphql';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import { HomeGameCard_fragment$data } from 'queries/__generated__/HomeGameCard_fragment.graphql';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';

import { PATHS } from 'constants/PATHS';

import { SearchInput } from './components';
import { SearchContainerProps } from './Search.types';
import { SearchPresenter } from './Search.presenter';

export const Query = graphql`
  query SearchScreenGamesQuery($name: String!) {
    gamesRecommended {
      items {
        ...HomeGameCard_fragment
      }
    }
    searchData: gamingSearch(name: $name) {
      games {
        ...HomeGameCard_fragment
      }
      providers {
        ...ProvidersListItem_fragment
      }
    }
  }
`;

export const SearchSuspenseWrapper = () => {
  const [queryArgs, setQueryArgs] = useState<
    LazyLoadArgs<SearchScreenGamesQuery$variables>
  >({
    options: { fetchKey: 0 },
    variables: { name: '' },
  });

  const [isInSearch, setIsInSearch] = useState(false);

  const onRefresh = (text?: string) => {
    setQueryArgs((prev) => ({
      options: {
        fetchKey: Number(prev?.options?.fetchKey || 0) + 1,
      },
      variables: !text ? { name: '' } : { ...prev?.variables, name: text },
    }));
  };

  const handleOnSearch = (text?: string) => {
    onRefresh(text);

    text && !isInSearch && setIsInSearch(true);
  };

  const debouncedSearchFunction = debounce((text: string) => {
    handleOnSearch(text);
  }, 500);

  const handleOnClearSearch = () => {
    handleOnSearch();
    setIsInSearch(false);
  };

  return (
    <BottomSheetWrapper screenKey={PATHS.SEARCH}>
      <SearchInput
        onClearSearch={handleOnClearSearch}
        onSearch={debouncedSearchFunction}
      />
      <Suspense fallback={<LoadingView />}>
        <CustomErrorBoundary onRefresh={onRefresh}>
          <SearchContainer isInSearch={isInSearch} queryArgs={queryArgs} />
        </CustomErrorBoundary>
      </Suspense>
    </BottomSheetWrapper>
  );
};

const SearchContainer: FC<SearchContainerProps> = ({
  queryArgs,
  isInSearch,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { t } = useTranslation();

  const gamesData = useLazyLoadQuery<SearchScreenGamesQuery>(
    Query,
    queryArgs?.variables,
    queryArgs?.options,
  );

  const handleNavigationBasedOnToken = useCallback(
    (game?: HomeGameCard_fragment$data) => {
      navigation.navigate(PATHS.GAME_PREVIEW, { game });
    },
    [navigation],
  );

  const getGamePressHandler = useCallback(
    (game: HomeGameCard_fragment$data) => () => {
      handleNavigationBasedOnToken(game);
    },
    [handleNavigationBasedOnToken],
  );

  const handlePressRandomGame = () => {
    handleNavigationBasedOnToken(MOCKED_GAME);
  };

  return (
    <SearchPresenter
      t={t}
      isInSearch={isInSearch}
      handlePressRandomGame={handlePressRandomGame}
      getGamePressHandler={getGamePressHandler}
      gamesData={gamesData}
    />
  );
};
