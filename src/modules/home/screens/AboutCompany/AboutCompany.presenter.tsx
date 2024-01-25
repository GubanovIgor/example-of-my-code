import { Separator } from 'components/Separator';
import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import Logo from 'assets/icons/logo.svg';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import MaskedView from '@react-native-masked-view/masked-view';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubHeader } from 'components/SubHeader';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

import { styles } from './AboutCompany.styles';

const LOGO_WIDTH = SCREEN_WIDTH / 3.3;
const LOGO_HEIGHT = LOGO_WIDTH / 2.2;

const BG_PATH = require('assets/images/help/background-logo.png');
const IMAGE_PATH = require('assets/images/help/bg-about.png');

interface Props {
  title: string;
}

export const AboutCompanyPresenter = ({ title }: Props) => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <SubHeader isBackButton title={title} shouldUseInsets />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.container, { paddingBottom: bottom }]}
      >
        <MaskedView
          style={styles.mask}
          maskElement={
            <Text style={[TEXT_VARIANTS.font58Bold, styles.maskText]}>
              {title}
            </Text>
          }
        >
          <FastImage
            source={IMAGE_PATH}
            style={styles.img}
            resizeMode="stretch"
          />
        </MaskedView>
        <FastImage source={BG_PATH} style={styles.bg} resizeMode="center" />
        <Separator stylesProp={styles.separator} />
        <Logo style={styles.logo} width={LOGO_WIDTH} height={LOGO_HEIGHT} />
        <Text style={[TEXT_VARIANTS.font20Bold, styles.subTitle]}>
          {t('ABOUT_SCREEN.SUB_TITLE')}
        </Text>
        <Text style={[TEXT_VARIANTS.font14, styles.text]}>
          {t('ABOUT_SCREEN.P1')}
        </Text>
        <Text style={[TEXT_VARIANTS.font14, styles.text]}>
          {t('ABOUT_SCREEN.P2')}
        </Text>
        <Text style={[TEXT_VARIANTS.font14, styles.text]}>
          {t('ABOUT_SCREEN.P3')}
        </Text>
        <Text style={[TEXT_VARIANTS.font14, styles.text]}>
          {t('ABOUT_SCREEN.P4')}
        </Text>
        <View style={styles.finalWordsWrapper}>
          <Text style={TEXT_VARIANTS.font20Bold}>
            {t('ABOUT_SCREEN.Example')}
          </Text>
          <Text style={[TEXT_VARIANTS.font20Bold, { color: COLORS.PRIMARY }]}>
            {t('ABOUT_SCREEN.THE_REST_IS_ON_US')}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};
