import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { styles } from './SubCategory.styles';
import { SubCategoryPresenterProps } from './SubCategory.types';

export const SubCategoryPresenter: FC<SubCategoryPresenterProps> = ({
  title,
}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </View>
);
