import React, { FC, ReactNode } from 'react';
import { TEXT_VARIANTS } from 'config/theme';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import EmptyBoxIcon from 'assets/icons/emptyBox.svg';
import { VoidFunction } from 'core/interfaces';

import { styles } from './NoDataView.styles';
import { Button } from '../Button';

interface Props {
  customDescription?: ReactNode;
  title?: string;
  containerStyles?: StyleProp<ViewStyle>;
  description?: string;
  buttonTitle?: string;
  onPress?: VoidFunction;
}

export const NoDataView: FC<Props> = ({
  customDescription,
  title,
  description,
  containerStyles,
  buttonTitle = '',
  onPress,
}) => (
  <View style={[styles.container, containerStyles]}>
    {customDescription ? (
      customDescription
    ) : (
      <View style={styles.subContainer}>
        <EmptyBoxIcon />
        <Text style={[TEXT_VARIANTS.font20Bold, styles.text]}>{title}</Text>
        {Boolean(description) && (
          <Text style={[TEXT_VARIANTS.font16, styles.description]}>
            {description}
          </Text>
        )}
      </View>
    )}
    {onPress && (
      <View style={styles.buttonContainer}>
        <Button text={buttonTitle} onPress={onPress} />
      </View>
    )}
  </View>
);
