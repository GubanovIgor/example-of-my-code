import { LanguageCard } from 'components/LanguageCard';
import { LanguageSelectorSheet } from 'components/LanguageSelectorSheet';
import { LogOutButton } from 'components/LogOutButton';
import { Separator } from 'components/Separator';
import { SubHeader } from 'components/SubHeader';
import { GUTTER_SIZE, TEXT_VARIANTS } from 'config/theme';
import { GetTranslationValue, ILanguage, VoidFunction } from 'core/interfaces';
import React, { FC, RefObject } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { Modalize } from 'react-native-modalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from 'store/authStore';

import { Balances, MenuList } from './components';
import {
  getSignedInStateDrawerItems,
  getSignedOutStateDrawerItems,
} from './Menu.constants';
import { styles } from './Menu.styles';

interface Props {
  isAuth: boolean;
  languagesSelectorRef: RefObject<Modalize>;
  currentLanguage: ILanguage;
  t: GetTranslationValue;
  onPressShowLanguages: VoidFunction;
}

export const MenuPresenter: FC<Props> = ({
  isAuth,
  currentLanguage,
  languagesSelectorRef,
  t,
  onPressShowLanguages,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { isAnonymous } = useAuthStore((s) => s.registrationResult);

  return (
    <View
      style={[styles.container, { paddingBottom: bottom + GUTTER_SIZE * 3 }]}
    >
      <SubHeader title={t('MENU')} isBackButton />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {isAuth && !isAnonymous && <Balances />}
        <View style={styles.horizontalPadding}>
          {isAuth && !isAnonymous && (
            <>
              <MenuList data={getSignedInStateDrawerItems(t)} />
              <Separator stylesProp={styles.separator} />
            </>
          )}
          <MenuList data={getSignedOutStateDrawerItems(t)} />
          <LanguageCard
            langTitle={currentLanguage?.name}
            langKey={currentLanguage?.key}
            onPress={onPressShowLanguages}
          />
          {isAuth && <Separator stylesProp={styles.separator} />}
          {(isAuth || isAnonymous) && <LogOutButton />}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={[styles.row]}>
          <Text style={TEXT_VARIANTS.font14}>{t('APP_VERSION')}</Text>
          <Text
            style={[TEXT_VARIANTS.font14Bold, styles.appVersion]}
          >{`${getVersion()} (${getBuildNumber()})`}</Text>
        </View>
      </View>
      <LanguageSelectorSheet sheetRef={languagesSelectorRef} />
    </View>
  );
};
