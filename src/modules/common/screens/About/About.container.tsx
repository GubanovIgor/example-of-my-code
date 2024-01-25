import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';

import { AboutPresenter } from './About.presenter';

export const AboutContainer: FC = ({}) => {
  const navigation = useNavigation();

  const handlePressActionRow = (routeName: string) => () => {
    navigation.navigate(routeName as never);
  };

  return <AboutPresenter handlePressActionRow={handlePressActionRow} />;
};
