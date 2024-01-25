import React, { memo } from 'react';
import { View, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TEXT_VARIANTS } from 'config/theme';
import { RootStackParamList } from 'core/interfaces/navigation';
import Logo from 'assets/icons/logo.svg';
import DrawerIcon from 'assets/icons/drawer.svg';
import SearchIcon from 'assets/icons/search.svg';
import PlusIcon from 'assets/icons/plus.svg';
import { useAuthStore } from 'store/authStore';
import { useTranslation } from 'react-i18next';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';

import { PATHS } from 'constants/PATHS';

import { BalanceDisplay } from '../BalanceDisplay';
import { Button } from '../Button';
import { styles } from './Header.styles';

type HeaderProps = {
  headerPropStyles?: {
    backgroundColor: string;
  };
};

const getDepositButtonRenderer = (
  t: GetTranslationValue,
  onPress: VoidFunction,
) => (
  <>
    <BalanceDisplay />
    <Button
      text={t('DEPOSIT')}
      onPress={onPress}
      frontIcon={() => <PlusIcon />}
      textStyles={styles.depositBtnText}
      containerStyles={styles.depositButton}
    />
  </>
);

const getUnauthorizedButtonsRenderer = (
  t: GetTranslationValue,
  onPressLogIn: VoidFunction,
  onPresSignUp: VoidFunction,
  onPressVerify: VoidFunction,
  isAnonymous?: boolean,
) => (
  <>
    {!isAnonymous && (
      <Button
        text={t('LOGIN')}
        variant="outlined"
        containerStyles={styles.mediumBtn}
        textStyles={{ ...TEXT_VARIANTS.font12 }}
        onPress={onPressLogIn}
      />
    )}

    <Button
      text={isAnonymous ? t('VERIFY') : t('JOIN')}
      containerStyles={styles.mediumBtn}
      textStyles={{ ...TEXT_VARIANTS.font12Bold }}
      onPress={isAnonymous ? onPressVerify : onPresSignUp}
    />
  </>
);

export const Header = memo(({ headerPropStyles }: HeaderProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const { isAuth, isAnonymous } = useAuthStore((s) => ({
    isAuth: Boolean(s.loginState.accessToken),
    isAnonymous: s.registrationResult.isAnonymous,
  }));
  const onPressDeposit = () => {
    navigation.navigate(PATHS.BALANCE);
  };

  const onPressSignUp = () => {
    navigation.navigate(PATHS.SIGN_UP);
  };

  const onPressLogIn = () => {
    navigation.navigate(PATHS.SIGN_IN);
  };

  const onPressBurgerMenu = () => {
    navigation.navigate(PATHS.MENU_STACK);
  };

  const onPressLogo = () => {
    //@ts-ignore
    navigation.navigate(PATHS.HOME);
  };

  const onPressSearch = () => {
    navigation.navigate(PATHS.SEARCH);
  };

  const onPressVerify = () => {
    navigation.navigate(PATHS.SIGN_UP_CONFIRMATION);
  };

  const renderDepositButton = getDepositButtonRenderer(t, onPressDeposit);

  const renderUnauthorizedButtons = getUnauthorizedButtonsRenderer(
    t,
    onPressLogIn,
    onPressSignUp,
    onPressVerify,
    isAnonymous,
  );

  return (
    <SafeAreaView
      style={[styles.headerContainer, headerPropStyles]}
      edges={['top']}
    >
      <Pressable onPress={onPressLogo}>
        <Logo />
      </Pressable>

      <View style={styles.headerRightContainer}>
        {isAuth && !isAnonymous
          ? renderDepositButton
          : renderUnauthorizedButtons}

        <TouchableOpacity
          onPress={onPressSearch}
          style={styles.searchIconContainer}
        >
          <SearchIcon />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressBurgerMenu}>
          <DrawerIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});
