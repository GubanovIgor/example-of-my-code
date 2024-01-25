import { VoidFunction } from 'core/interfaces';
import React, { FC } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import ArrowRightIcon from 'assets/icons/arrowRight.svg';
import { COLORS, GUTTER_SIZE, TEXT_VARIANTS } from 'config/theme';
import { Separator } from 'components/Separator';

import { DefaultCard } from '../DefaultCard';

interface Props {
  title: string;
  onPress: VoidFunction;
  description?: string;
  separatorStyles?: StyleProp<ViewStyle>;
  hasSeparator?: boolean;
}

export const ActionRow: FC<Props> = ({
  title,
  onPress,
  description = '',
  hasSeparator = true,
  separatorStyles,
}) => (
  <Pressable onPress={onPress}>
    <View style={styles.innerContainer}>
      <Text style={[TEXT_VARIANTS.font14Bold, styles.title]}>{title}</Text>
      <ArrowRightIcon />
    </View>
    {Boolean(description) && <DefaultCard content={description} />}
    {hasSeparator && (
      <Separator stylesProp={[styles.separator, separatorStyles]} />
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: GUTTER_SIZE * 3,
  },
  title: {
    color: COLORS.TEXT_LIGHT,
  },
  separator: { marginHorizontal: 0, borderColor: COLORS.OPTIONS_BACKGROUND },
});
