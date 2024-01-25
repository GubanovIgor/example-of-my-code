import { Button } from 'components/Button';
import { COLORS, FONTS, GUTTER_SIZE, TEXT_VARIANTS } from 'config/theme';
import { VoidFunction } from 'core/interfaces';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/DIMENSIONS';

import { IVersion } from '../MaintenanceUpdateWrapper.types';

interface Props {
  info?: IVersion;
  onUpdate: VoidFunction;
  onClose: VoidFunction;
}

export const VersionUpdateInfo: FC<Props> = ({ info, onUpdate, onClose }) => {
  const { t } = useTranslation();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#211052', '#CD3F36']}
      angle={320}
      useAngle
      angleCenter={{ x: 0.8, y: 0.1 }}
      style={[
        styles.container,
        { paddingTop: top + GUTTER_SIZE * 4, paddingBottom: bottom },
      ]}
    >
      <FastImage
        source={require('assets/images/appUpdate.png')}
        resizeMode="contain"
        style={{ width: SCREEN_WIDTH - 60, height: SCREEN_HEIGHT / 2 }}
      />
      <View style={styles.infoContainer}>
        <Text style={[TEXT_VARIANTS.font24Bold]}>{t('APP_UPDATE.TITLE')}</Text>
        <Text style={[TEXT_VARIANTS.font14, styles.description]}>
          {t('APP_UPDATE.DESC')}
        </Text>

        <Button onPress={onUpdate} text={t('APP_UPDATE.UPDATE_BTN')} />
        {info?.status !== 'FORCE' && (
          <Button
            variant="transparent"
            containerStyles={styles.laterBtn}
            textStyles={styles.laterText}
            onPress={onClose}
            text={t('APP_UPDATE.LATER_BTN')}
          />
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    alignItems: 'center',
    paddingHorizontal: GUTTER_SIZE * 3,
    width: '100%',
  },
  laterText: {
    color: COLORS.TEXT_GRAY,
    fontFamily: FONTS.mainFont,
  },
  laterBtn: {
    marginTop: GUTTER_SIZE * 2,
  },
  description: {
    marginHorizontal: GUTTER_SIZE * 3,
    marginBottom: GUTTER_SIZE * 10,
    marginTop: GUTTER_SIZE * 6,
    textAlign: 'center',
  },
});
