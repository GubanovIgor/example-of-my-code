import React, { FC } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { useAuthStore } from 'store/authStore';

import { styles } from './ImageSubHeader.styles';

const CHEST_IMAGE_PATH = require('assets/images/deposit/chest.png');
const DEPOSIT_BONUS_IMAGE_PATH = require('assets/images/deposit/100-deposit-bonus.png');
const FREE_SPINS_IMAGE_PATH = require('assets/images/deposit/200-fs.png');
const PRESENT_IMAGE_PATH = require('assets/images/deposit/present.png');
const DEPOSIT_BONUS_BIG_IMAGE_PATH = require('assets/images/deposit/100-deposit-bonus-big.png');

const MIN_DEPOSIT_AMOUNT_FOR_FREE_SPINS = 50;

interface ISubHeaderProps {
  shouldUseInsets?: boolean;
}

export const ImageSubHeader: FC<ISubHeaderProps> = ({
  shouldUseInsets = true,
}) => {
  const { top } = useSafeAreaInsets();
  const { firstDepositAmount } = useAuthStore((s) => s.depositState);

  return (
    <View style={[styles.container, shouldUseInsets && { marginTop: top }]}>
      {firstDepositAmount >= MIN_DEPOSIT_AMOUNT_FOR_FREE_SPINS ? (
        <>
          <FastImage
            source={CHEST_IMAGE_PATH}
            style={styles.chest}
            resizeMode="stretch"
          />
          <FastImage
            source={DEPOSIT_BONUS_IMAGE_PATH}
            style={styles.bonus}
            resizeMode="stretch"
          />
          <FastImage
            source={FREE_SPINS_IMAGE_PATH}
            style={styles.freeSpins}
            resizeMode="stretch"
          />
        </>
      ) : (
        <>
          <FastImage
            source={PRESENT_IMAGE_PATH}
            style={styles.present}
            resizeMode="stretch"
          />
          <FastImage
            source={DEPOSIT_BONUS_BIG_IMAGE_PATH}
            style={styles.bonusBig}
            resizeMode="stretch"
          />
        </>
      )}
    </View>
  );
};
