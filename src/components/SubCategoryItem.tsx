import React from 'react';
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TEXT_VARIANTS } from 'config/theme';
import { ISubCategory } from 'core/interfaces/subCategory';

import { Button } from './Button';

interface ISubCategoryItemProps {
  subCategoryData: ISubCategory;
  handlePressSubCategory: (value: ISubCategory) => void;
}

export const SubCategoryItem = ({
  subCategoryData,
  handlePressSubCategory,
}: ISubCategoryItemProps) => {
  const { name } = subCategoryData;

  return (
    <Button
      text={name}
      variant="outlined"
      textStyles={styles.filterName}
      containerStyles={styles.container}
      onPress={() => handlePressSubCategory(subCategoryData)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: SPACING.M,
    paddingHorizontal: SPACING.M,
    width: 'auto',
    height: 26,
    borderRadius: 12,
    borderColor: COLORS.LIGHT_GRAY_BORDER,
  },
  filterName: {
    ...TEXT_VARIANTS.font12,
  },
});
