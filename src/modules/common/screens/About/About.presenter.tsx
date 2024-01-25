import { ActionRow } from 'components/ActionRow';
import { SubHeader } from 'components/SubHeader';
import { VoidFunction } from 'core/interfaces';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import SoftswissLogo from 'assets/icons/softswiss.svg';
import { Separator } from 'components/Separator';

import { PATHS } from 'constants/PATHS';

import { styles } from './About.styles';
import { DocumentsList } from './components';

interface Props {
  handlePressActionRow: (routeName: string) => VoidFunction;
}

export const AboutPresenter: FC<Props> = ({ handlePressActionRow }) => {
  const { t } = useTranslation();

  return (
    <>
      <SubHeader isBackButton title={t('ABOUT')} />
      <ScrollView contentContainerStyle={styles.container}>
        <ActionRow
          onPress={handlePressActionRow(PATHS.FAQ)}
          hasSeparator={false}
          title={t('FOOTER.FAQ')}
        />
        <ActionRow
          onPress={handlePressActionRow(PATHS.ABOUT_COMPANY)}
          hasSeparator={false}
          title={t('FOOTER.COMPANY')}
        />
        <ActionRow
          onPress={handlePressActionRow(PATHS.SUPPORT)}
          separatorStyles={styles.separator}
          title={t('FOOTER.SUPPORT')}
        />
        <DocumentsList />
        <Separator stylesProp={styles.bottomSeparator} />
        <View style={styles.row}>
          <FastImage
            resizeMode="contain"
            source={require('assets/providersLogos/curacao.png')}
            style={styles.circleIcon}
          />
          <FastImage
            resizeMode="contain"
            source={require('assets/providersLogos/beGamble.png')}
            style={styles.beGambleLogo}
          />
          <SoftswissLogo />
          <FastImage
            resizeMode="contain"
            source={require('assets/images/ageRestriction.png')}
            style={styles.circleIcon}
          />
        </View>
        <View style={[styles.row, styles.bottomIconsContainer]}>
          <FastImage
            resizeMode="contain"
            source={require('assets/providersLogos/rgc.png')}
            style={styles.rgcLogo}
          />
          <FastImage
            resizeMode="contain"
            source={require('assets/providersLogos/gameCare.png')}
            style={styles.gameCareLogo}
          />
          <FastImage
            resizeMode="contain"
            source={require('assets/providersLogos/interact.png')}
            style={styles.interactLogo}
          />
        </View>
      </ScrollView>
    </>
  );
};
