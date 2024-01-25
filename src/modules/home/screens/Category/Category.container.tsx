import React, { Suspense, useCallback, useState } from 'react';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'core/interfaces/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { LoadingView } from 'components/LoadingView';
import { ISubCategory } from 'core/interfaces/subCategory';
import { HandleSelectorItemProps } from 'core/interfaces/selectorModal';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { LazyLoadArgs } from 'core/interfaces';
import {
  CategoryScreenFilteredGamesQuery,
  CategoryScreenFilteredGamesQuery$variables,
} from 'queries/__generated__/CategoryScreenFilteredGamesQuery.graphql';

import { PATHS } from 'constants/PATHS';

import { CategoryPresenter } from './Category.presenter';

const SELECTOR_MOCKS = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const CategoryGamesQuery = graphql`
  query CategoryScreenFilteredGamesQuery(
    $tags: [GameTags!]
    $categoryId: ID
    $first: Int = 10
  ) {
    filteredGames: gamesByFilter(
      skip: 0
      take: 50
      tags: $tags
      first: $first
      categoryId: $categoryId
    ) {
      items {
        ...HomeGameCard_fragment
      }
    }
    ...Category_fragment
  }
`;

export const CategorySuspenseWrapper = (
  props: RootStackScreenProps<PATHS.CATEGORY>,
) => (
  <Suspense fallback={<LoadingView />}>
    <CategoryContainer {...props} />
  </Suspense>
);

const CategoryContainer = ({ route }: RootStackScreenProps<PATHS.CATEGORY>) => {
  const [subCategoryId, setSubCategoryId] = useState('');
  const { title, id, tag, subCategories } = route?.params?.categoryData || {};
  const { t } = useTranslation();

  const formMethods = useForm<{ filter: string; sorting: string }>();

  const [filters, setFilters] = useState({
    provider: '',
    sortingType: String(t('BY_POPULARITY')),
  });

  const [queryArgs, setQueryArgs] = useState<
    LazyLoadArgs<CategoryScreenFilteredGamesQuery$variables>
  >({
    options: { fetchKey: 0, fetchPolicy: 'network-only' },
    variables: {
      tags: tag && [tag],
      categoryId: id,
      first: 10,
    },
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const gamesData = useLazyLoadQuery<CategoryScreenFilteredGamesQuery>(
    CategoryGamesQuery,
    queryArgs?.variables,
    queryArgs.options,
  );

  const onRefresh = useCallback(() => {
    setQueryArgs((prev) => ({
      options: {
        fetchKey: Number(prev?.options?.fetchKey || 0) + 1,
        fetchPolicy: 'network-only',
      },
      variables: {
        tags: tag && [tag],
        categoryId: id,
        first: 3,
        subCategoryId: subCategoryId,
      },
    }));
  }, [id, subCategoryId, tag]);

  const handlePressSubCategory = useCallback(
    (subCategory: ISubCategory) => {
      setSubCategoryId(subCategory.id);
      onRefresh();
    },
    [onRefresh],
  );

  const handleSelectorItem = useCallback((data: HandleSelectorItemProps) => {
    const { value, selectorName } = data;

    if (selectorName) {
      setFilters((prev) => ({ ...prev, [selectorName]: value }));
    }
  }, []);

  const openProviderSelector = useCallback(() => {
    navigation.navigate(PATHS.SELECTOR_MODAL, {
      data: SELECTOR_MOCKS,
      handleSelectorItem,
      selectorName: 'provider',
    });
  }, [handleSelectorItem, navigation]);

  const openSortingTypeSelector = useCallback(() => {
    navigation.navigate(PATHS.SELECTOR_MODAL, {
      data: SELECTOR_MOCKS,
      handleSelectorItem,
      selectorName: 'sortingType',
    });
  }, [handleSelectorItem, navigation]);

  const handlerBackButton = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  return (
    <CategoryPresenter
      title={title || ''}
      filters={filters}
      handlerBackButton={handlerBackButton}
      gamesData={gamesData}
      formMethods={formMethods}
      t={t}
      subCategoriesData={subCategories}
      handlePressSubCategory={handlePressSubCategory}
      openProviderSelector={openProviderSelector}
      openSortingTypeSelector={openSortingTypeSelector}
    />
  );
};
