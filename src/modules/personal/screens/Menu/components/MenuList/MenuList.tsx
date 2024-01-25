import React, { FC } from 'react';
import { View } from 'react-native';

import { MenuListItem } from './MenuListItem';
import { MenuItem } from './types';

interface Props {
  data: MenuItem[];
}

export const MenuList: FC<Props> = ({ data }) => (
  <View>
    {data.map((item) => (
      <MenuListItem key={item.title} drawerItem={item} />
    ))}
  </View>
);
