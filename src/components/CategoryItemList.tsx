import React from 'react';
import { StyleSheet, View } from 'react-native';
import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';
import { CategoryItemList_fragment$key } from 'queries/__generated__/CategoryItemList_fragment.graphql';
import { FlashList } from '@shopify/flash-list';

import { CategoryItem } from './CategoryItem';
import { normalizeCategories } from './CategoryItem/CategoryItem.helpers';
import { ICategoryData } from './CategoryItem/CategoryItem.component';

interface ICategoryItemListProps {
  fragmentRef: CategoryItemList_fragment$key;
}

const fragment = graphql`
  fragment CategoryItemList_fragment on Query {
    categories {
      id
      name
      imageUrl
      subCategories {
        id
        name
      }
    }
  }
`;

//@ts-ignore
export const keyExtractor = (item: ICategoryData) => item.name;

export const CategoryItemList = ({ fragmentRef }: ICategoryItemListProps) => {
  const { categories } = useFragment(fragment, fragmentRef);

  const normalizedCategories = normalizeCategories(categories);

  const renderItem = ({ item }: { item: ICategoryData }) => (
    <CategoryItem categoryData={item} />
  );

  return (
    <View style={styles.container}>
      <FlashList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={normalizedCategories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flexGrow: 0,
  },
});
