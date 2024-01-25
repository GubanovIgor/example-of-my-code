import React, { FC, useState } from 'react';
import { Button } from 'components/Button';
import { TEXT_VARIANTS } from 'config/theme';
import { VoidFunction } from 'core/interfaces';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { getFiveItemsFromRange } from './FastAmounts.helpers';
import { styles } from './FastAmounts.styles';

const PRESENT_IMAGE_PATH = require('assets/images/deposit/present-small.png');
const FREE_SPINS_IMAGE_PATH = require('assets/images/deposit/200-fs-small.png');

interface Props {
  amountValidation: { minValue: number; maxValue: number };
  balance?: number;
  onChooseAmount: (value: string) => void;
  isFirstDeposit?: boolean;
  onChangeFirstDepositAmount?: (text: string) => void;
}

const getAmountButtonRenderer =
  (
    getOnChooseAmountHandler: (value: string, index: number) => VoidFunction,
    isFirstDeposit?: boolean,
    chosenAmountIndex?: number | null,
  ) =>
  (item: number, index: number) => {
    const onPress = getOnChooseAmountHandler(item.toString(), index);

    return (
      <View key={index}>
        {index === 0 && isFirstDeposit && (
          <FastImage
            source={PRESENT_IMAGE_PATH}
            style={styles.smallPresent}
            resizeMode="stretch"
          />
        )}
        {index !== 0 && isFirstDeposit && (
          <FastImage
            source={FREE_SPINS_IMAGE_PATH}
            style={styles.smallFreeSpins}
            resizeMode="stretch"
          />
        )}
        <Button
          text={item.toString()}
          textStyles={TEXT_VARIANTS.font14}
          containerStyles={[
            isFirstDeposit
              ? styles.firstDepositAmountButton
              : styles.amountButton,
            chosenAmountIndex === index &&
              isFirstDeposit &&
              styles.activeBorder,
          ]}
          onPress={onPress}
        />
      </View>
    );
  };

export const FastAmounts: FC<Props> = ({
  balance,
  amountValidation,
  onChooseAmount,
  isFirstDeposit,
  onChangeFirstDepositAmount,
}) => {
  const fastAmounts = getFiveItemsFromRange(
    amountValidation.minValue,
    Math.min(amountValidation.maxValue, balance ?? amountValidation.maxValue),
  );

  const [chosenAmountIndex, setChosenAmountIndex] = useState<number | null>(
    null,
  );

  const getOnChooseAmountHandler = (value: string, index: number) => () => {
    setChosenAmountIndex(index);
    onChooseAmount(value);
    if (onChangeFirstDepositAmount) onChangeFirstDepositAmount(value);
  };

  const renderAmountButton = getAmountButtonRenderer(
    getOnChooseAmountHandler,
    isFirstDeposit,
    chosenAmountIndex,
  );

  return (
    <View style={styles.container}>{fastAmounts?.map(renderAmountButton)}</View>
  );
};
