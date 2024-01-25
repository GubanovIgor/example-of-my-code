import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, GUTTER_SIZE, TEXT_VARIANTS } from 'config/theme';
import { RootStackParamList } from 'core/interfaces/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { MenuItem } from './types';

interface Props {
  drawerItem: MenuItem;
}

export const MenuListItem = ({ drawerItem }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { title, icon, name, navigationOptions } = drawerItem;

  const handleNavigation = () => {
    // @ts-ignore
    navigation.navigate(name, navigationOptions);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigation}>
      {icon()}
      <Text style={[TEXT_VARIANTS.font16, styles.title]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: GUTTER_SIZE * 10,
  },
  title: {
    color: COLORS.TEXT_LIGHT,
    textTransform: 'uppercase',
    marginLeft: GUTTER_SIZE * 4,
  },
});
