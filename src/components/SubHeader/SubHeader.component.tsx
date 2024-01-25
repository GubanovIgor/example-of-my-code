import React, { FC, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ArrowToLeftIcon from 'assets/icons/arrowToLeft.svg';
import { TEXT_VARIANTS } from 'config/theme';
import { RootStackParamList } from 'core/interfaces/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './SubHeader.styles';

interface ISubHeaderProps {
  title?: string | null;
  isBackButton?: boolean;
  shouldUseInsets?: boolean;
}

export const SubHeader: FC<ISubHeaderProps> = ({
  title,
  isBackButton = false,
  shouldUseInsets = true,
}) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePressBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  return (
    <View style={[styles.container, shouldUseInsets && { marginTop: top }]}>
      {isBackButton && (
        <TouchableOpacity
          onPress={handlePressBack}
          style={styles.btn}
          hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
        >
          <ArrowToLeftIcon />
        </TouchableOpacity>
      )}
      {Boolean(title) && (
        <Text style={[TEXT_VARIANTS.font16, styles.title]}>{title}</Text>
      )}
    </View>
  );
};
