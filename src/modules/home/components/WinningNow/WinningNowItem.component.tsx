import React, { FC } from 'react';
import { TEXT_VARIANTS } from 'config/theme';
import { IRandomWin } from 'modules/home/hooks/useGetRandomWinningItems';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useUserStore } from 'store/userStore';

import { styles } from './WinningNow.styles';

interface Props {
  info: IRandomWin;
}

export const WinningNowItem: FC<Props> = ({ info }) => {
  const { emphasedImageUrl, userName, value, name } = info || {};

  const currency = useUserStore((s) => s.userDetails.currencyDisplayShortSign);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <FastImage
          resizeMode="stretch"
          source={{ uri: emphasedImageUrl }}
          style={styles.gameImg}
        />
        <View style={styles.itemRightSide}>
          <View style={styles.row}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[TEXT_VARIANTS.font12Bold, styles.userName]}
            >
              {userName}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[TEXT_VARIANTS.font12Bold, styles.amount]}
            >
              {`${value} ${currency}`}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[TEXT_VARIANTS.font12Bold, styles.gameName]}
          >
            {name}
          </Text>
        </View>
      </View>
    </View>
  );
};
