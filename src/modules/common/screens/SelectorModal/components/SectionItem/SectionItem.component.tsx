import { TEXT_VARIANTS } from 'config/theme';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Props } from './SectionItem.types';
import { styles } from './SectionItem.styles';

export const SectionItem = ({ handleSelectorItem, item }: Props) => {
  const onPressHandler = handleSelectorItem(item);

  return (
    <TouchableOpacity
      style={styles.sectionItemContainer}
      onPress={onPressHandler}
    >
      <Text style={[TEXT_VARIANTS.font12, styles.sectionItemText]}>{item}</Text>
    </TouchableOpacity>
  );
};
