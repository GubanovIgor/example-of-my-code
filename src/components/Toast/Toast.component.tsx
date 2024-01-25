import React, { FC } from 'react';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import { Text, View } from 'react-native';
import { Toast as ToastData } from '@backpackapp-io/react-native-toast';

import { styles } from './Toast.styles';

interface Props {
  isError?: boolean;
  toast: ToastData;
}

export const Toast: FC<Props> = ({ toast, isError }) => (
  <View style={styles.container}>
    <View
      style={[
        styles.line,
        {
          backgroundColor: isError ? COLORS.TEXT_DANGER : COLORS.PRIMARY,
        },
      ]}
    />
    <Text style={[TEXT_VARIANTS.font14, styles.message]}>
      {toast?.message?.toString()}
    </Text>
  </View>
);
