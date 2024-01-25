import { useNavigation } from '@react-navigation/native';
import { Button } from 'components/Button';
import { ModalizeWrapper } from 'components/ModalizeWrapper';
import { TEXT_VARIANTS } from 'config/theme';
import { getCurrencyWithAmount } from 'core/helpers';
import { VoidFunction } from 'core/interfaces';
import React, { FC, RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { GameResult } from '../GameSession.types';
import { styles } from './PlayTimeWarning.styles';

interface Props {
  gameResult?: GameResult;
  sheetRef: RefObject<Modalize>;
  onPressConfirm: VoidFunction;
  timePlayed: string;
}

export const PlayerTimeWarning: FC<Props> = ({
  gameResult,
  sheetRef,
  timePlayed,
  onPressConfirm,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handlePressOption = (value?: boolean) => () => {
    sheetRef?.current?.close();
    if (!value) return navigation.goBack();

    onPressConfirm();
  };

  const currencyShortSign = gameResult?.currency?.shortSign;
  const currencySymbol = gameResult?.currency?.symbol;

  return (
    <ModalizeWrapper closeOnOverlayTap={false} ref={sheetRef}>
      <View>
        <View style={styles.textContainer}>
          <Text style={[TEXT_VARIANTS.font20Bold, styles.title]}>
            Dear user,
          </Text>
          <Text style={[TEXT_VARIANTS.font16, styles.infoText]}>
            {t('GAME_WARNING_POPUP', {
              time: timePlayed,
              won: getCurrencyWithAmount({
                amount: gameResult?.won,
                shortSign: currencyShortSign,
                symbol: currencySymbol,
              }),
              loss: getCurrencyWithAmount({
                amount: gameResult?.lost,
                shortSign: currencyShortSign,
                symbol: currencySymbol,
              }),
            })}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            text={t('NO')}
            onPress={handlePressOption()}
            variant="outlined"
            textStyles={[TEXT_VARIANTS.font14, styles.btnText]}
            containerStyles={styles.button}
          />

          <Button
            text={t('YES')}
            onPress={handlePressOption(true)}
            containerStyles={[styles.button, styles.buttonLeftMargin]}
          />
        </View>
      </View>
    </ModalizeWrapper>
  );
};
