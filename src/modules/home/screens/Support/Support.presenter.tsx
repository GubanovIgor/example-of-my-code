import { Separator } from 'components/Separator';
import React from 'react';
import {
  Linking,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Logo from 'assets/icons/logo.svg';
import { GUTTER_SIZE, TEXT_VARIANTS } from 'config/theme';
import { Button } from 'components/Button';
import MaskedView from '@react-native-masked-view/masked-view';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubHeader } from 'components/SubHeader';
import { noop } from 'lodash';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';
import { HR_URL, PARTNER_URL, SUPPORT_URL } from 'constants/URLS';

import { styles } from './Support.styles';

const LOGO_WIDTH = SCREEN_WIDTH / 3.3;
const LOGO_HEIGHT = LOGO_WIDTH / 2.2;

const BG_PATH = require('assets/images/help/background-logo.png');
const IMAGE_PATH = require('assets/images/help/bg-support.png');

interface Props {
  title: string;
}

export const SupportPresenter = ({ title }: Props) => {
  const onPressEmail = (url: string) => {
    Linking.openURL(`mailto:${url}`);
  };

  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <SubHeader title={title} isBackButton shouldUseInsets />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.container, { paddingBottom: bottom }]}
      >
        <MaskedView
          style={styles.mask}
          maskElement={
            <Text style={[TEXT_VARIANTS.font58Bold, styles.maskText]}>
              {t('SUPPORT_SCREEN.TITLE')}
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
        <View style={styles.titleWrapper}>
          <Text style={[TEXT_VARIANTS.font20Bold, styles.textTitileWrapper]}>
            {t('SUPPORT_SCREEN.SUB_TITLE')}
          </Text>
        </View>
        <Text style={[TEXT_VARIANTS.font14, styles.text]}>
          {t('SUPPORT_SCREEN.SUPPORT_NON_VOICE_CHANNELS')}
        </Text>
        <Button
          text={t('SUPPORT_SCREEN.ONLINE_CHAT')}
          onPress={noop}
          containerStyles={styles.button}
        />
        <TouchableOpacity
          onPress={() => onPressEmail(SUPPORT_URL)}
          style={styles.supportEmailWrapper}
        >
          <Text style={TEXT_VARIANTS.font14}>
            {t('SUPPORT_SCREEN.OR_VIA_EMAIL')}
          </Text>
          <Text style={[TEXT_VARIANTS.font14, styles.supportEmail]}>
            {SUPPORT_URL}
          </Text>
        </TouchableOpacity>
        <Text style={[TEXT_VARIANTS.font14Bold, styles.otherEmailsTitle]}>
          {t('SUPPORT_SCREEN.OTHER_EMAILS')}
        </Text>
        <Text
          onPress={() => onPressEmail(HR_URL)}
          style={[
            TEXT_VARIANTS.font14,
            styles.email,
            { marginTop: GUTTER_SIZE * 4 },
          ]}
        >
          {HR_URL}
        </Text>
        <Text
          onPress={() => onPressEmail(PARTNER_URL)}
          style={[
            TEXT_VARIANTS.font14,
            styles.email,
            { marginTop: GUTTER_SIZE },
          ]}
        >
          {PARTNER_URL}
        </Text>
      </ScrollView>
    </>
  );
};
