import React, { FC } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ModalBackButton from 'assets/icons/modalBackButton.svg';
import { TEXT_VARIANTS } from 'config/theme';
import { SubCategoryItemList } from 'components/SubCategoryItemList';
import { GamesSection } from 'components/GamesSection';
import { usePaginationFragment, graphql } from 'react-relay';

import { CategoryPresenterProps } from './Category.types';
import { styles } from './Category.styles';

const paginationQuery = graphql`
  fragment Category_fragment on Query
  @argumentDefinitions(after: { type: "String" })
  @refetchable(queryName: "FriendsListPaginationQuery") {
    gamesByFilterCursor(
      first: $first
      after: $after
      tags: $tags
      categoryId: $categoryId
    ) @connection(key: "Category_fragment__gamesByFilterCursor") {
      edges {
        cursor
        node {
          ...HomeGameCard_fragment
        }
      }
    }
  }
`;

export const CategoryPresenter: FC<CategoryPresenterProps> = ({
  title,
  handlerBackButton,
  gamesData,
  subCategoriesData,
  handlePressSubCategory,
}) => {
  const { data, loadNext, isLoadingNext } = usePaginationFragment(
    paginationQuery,
    gamesData,
  );

  const convertGamesDataForGamesSection = (data) =>
    data.gamesByFilterCursor.edges.map((el) => el.node);

  const onEndReached = () => {
    loadNext(10);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlerBackButton}>
          <ModalBackButton />
        </TouchableOpacity>
        <Text style={[TEXT_VARIANTS.font28, styles.headerTitle]}>{title}</Text>
      </View>
      {/* <FormProvider {...formMethods}>
        <View style={styles.filterSection}>
          <CustomSelectorInput
            onPressHandler={openProviderSelector}
            name="filter"
            chosenOption={filters.provider}
            styleProps={styles.selectorInput}
            placeholder={String(t('PROVIDER'))}
            placeholderStyleProp={{ backgroundColor: COLORS.BACKGROUND }}
          />
          <CustomSelectorInput
            name="sorting"
            onPressHandler={openSortingTypeSelector}
            chosenOption={filters.sortingType}
            styleProps={styles.selectorInput}
          />
        </View>
      </FormProvider> */}

      {subCategoriesData && (
        <View style={styles.subCategoriesSection}>
          <SubCategoryItemList
            data={subCategoriesData}
            handlePressSubCategory={handlePressSubCategory}
          />
        </View>
      )}

      <GamesSection
        isPagination
        isLoadingNext={isLoadingNext}
        onEndReached={onEndReached}
        games={convertGamesDataForGamesSection(data)}
        isToRightIcon={false}
      />
    </View>
  );
};
