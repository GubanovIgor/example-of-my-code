import { TEXT_VARIANTS } from 'config/theme';
import React, { ReactNode } from 'react';
import { Text } from 'react-native';

import { styles } from './CollapsibleCard.styles';
import { Border } from './CollapsibleCard.types';

export const getDescriptionRenderer = (description: string | ReactNode) => {
  if (!description) return null;

  if (typeof description === 'string')
    return (
      <Text style={[TEXT_VARIANTS.font14, styles.description]}>
        {description}
      </Text>
    );

  return description;
};

export const getStyles = (border?: Border) => {
  if (border)
    return [
      styles.container,
      border === 'top' ? styles.topBorders : styles.bottomBorders,
    ];

  return styles.container;
};
