import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ISubCategory } from 'core/interfaces/subCategory';
import { FlashList } from '@shopify/flash-list';

import { SubCategoryItem } from './SubCategoryItem';

interface ISubCategoryItemListProps {
  data: ISubCategory[];
  stylesProp?: StyleProp<ViewStyle>;
  handlePressSubCategory: (data: ISubCategory) => void;
}

export const SubCategoryItemList = ({
  data,
  stylesProp,
  handlePressSubCategory,
}: ISubCategoryItemListProps) => {
  const renderItem = ({ item }: { item: ISubCategory }) => (
    <SubCategoryItem
      subCategoryData={item}
      handlePressSubCategory={handlePressSubCategory}
    />
  );

  return (
    <FlashList
      style={stylesProp}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={200}
    />
  );
};
