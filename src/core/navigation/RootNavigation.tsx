import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import {
  CountryCodePickerScreen,
  CustomPickerScreen,
  SearchScreen,
  SelectorModalScreen,
  WebViewScreen,
  PDFViewerScreen,
  DatePickerScreen,
} from 'modules/common';
import {
  PasswordRecoveryScreen,
  ResetPasswordScreen,
  ResetPasswordSuccessScreen,
  SignInScreen,
  SignUpConfirmationScreen,
  SignUpScreen,
} from 'modules/auth';
import RNBootSplash from 'react-native-bootsplash';
import { useLocalisationStore } from 'store/localisationStore';
import { shallow } from 'zustand/shallow';
import { useUtilsStore } from 'store/utilsStore';
import { BalanceScreen, VerificationScreen } from 'modules/personal';
import { PaymentFormScreen } from 'modules/personal/screens/Balance/components/DepositPayment';
import { DepositSuccess } from 'modules/personal/screens/Balance/components/DepositSuccess';
import { WithdrawalSuccess } from 'modules/personal/screens/Balance/components/WithdrawalSuccess';
import { GamePreviewScreen } from 'modules/home';

import { PATHS } from 'constants/PATHS';
import { DEFAULT_GESTURE_RESPONSE_DISTANCE } from 'constants/DIMENSIONS';

import { COLORS } from '../../config/theme';
import { RootStackParamList } from '../interfaces/navigation';
import { navigationRef } from './utils/navigate';
import { getBottomSheetScreenOptions } from './helpers';
import { HomeStack, MenuStack } from './Stacks';
import { getScreenHeader } from './helpers/getScreenHeader';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.BACKGROUND,
  },
};

export const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  const bottomSheetScreenOptions = getBottomSheetScreenOptions();

  const { currentLanguage, setCurrentLanguage } = useLocalisationStore(
    (state) => ({
      setCurrentLanguage: state.setCurrentLanguage,
      currentLanguage: state.currentLanguage,
    }),
    shallow,
  );

  const { gestureDistances } = useUtilsStore(
    (state) => ({
      gestureDistances: state.screensGestureResponseDistances,
    }),
    shallow,
  );

  const onNavigationReady = () => {
    //This fixed white screen glitch
    setTimeout(() => {
      setCurrentLanguage(currentLanguage);
      RNBootSplash.hide();
    }, 0);
  };

  return (
    <NavigationContainer
      theme={MyTheme}
      ref={navigationRef}
      onReady={onNavigationReady}
    >
      <Stack.Navigator
        initialRouteName={PATHS.HOME_STACK}
        screenOptions={({ route }) => ({
          header: () => getScreenHeader(route),
          drawerItemStyle: {
            display: 'none',
          },
        })}
      >
        <Stack.Screen name={PATHS.HOME_STACK} component={HomeStack} />
        <Stack.Screen
          name={PATHS.SEARCH}
          component={SearchScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.SEARCH] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.MENU_STACK}
          component={MenuStack}
          options={{
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen
          name={PATHS.WEB_VIEW}
          component={WebViewScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.WEB_VIEW] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.PDF_VIEWER}
          component={PDFViewerScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance: DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.COUNTRY_CODE_PICKER}
          component={CountryCodePickerScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.COUNTRY_CODE_PICKER] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.GAME_PREVIEW}
          component={GamePreviewScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.GAME_PREVIEW] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.DATE_PICKER}
          component={DatePickerScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={PATHS.SIGN_UP}
          component={SignUpScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.SIGN_UP] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.SELECTOR_MODAL}
          component={SelectorModalScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.SELECTOR_MODAL] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.CUSTOM_PICKER}
          component={CustomPickerScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.CUSTOM_PICKER] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.BALANCE}
          key={PATHS.BALANCE}
          component={BalanceScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.BALANCE] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.VERIFICATION}
          key={PATHS.VERIFICATION}
          component={VerificationScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.VERIFICATION] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.DEPOSIT_PAYMENT}
          key={PATHS.DEPOSIT_PAYMENT}
          component={PaymentFormScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.DEPOSIT_PAYMENT] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.DEPOSIT_SUCCESS}
          key={PATHS.DEPOSIT_SUCCESS}
          component={DepositSuccess}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.DEPOSIT_SUCCESS] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.WITHDRAWAL_SUCCESS}
          key={PATHS.WITHDRAWAL_SUCCESS}
          component={WithdrawalSuccess}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.WITHDRAWAL_SUCCESS] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.SIGN_UP_CONFIRMATION}
          component={SignUpConfirmationScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.SIGN_UP_CONFIRMATION] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />

        <Stack.Screen
          name={PATHS.SIGN_IN}
          component={SignInScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.SIGN_IN] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.PASSWORD_RECOVERY}
          component={PasswordRecoveryScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.PASSWORD_RECOVERY] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />

        <Stack.Screen
          name={PATHS.RESET_PASSWORD}
          component={ResetPasswordScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.RESET_PASSWORD] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
        <Stack.Screen
          name={PATHS.RESET_PASSWORD_SUCCESS}
          component={ResetPasswordSuccessScreen}
          options={{
            ...bottomSheetScreenOptions,
            gestureResponseDistance:
              gestureDistances[PATHS.RESET_PASSWORD_SUCCESS] ||
              DEFAULT_GESTURE_RESPONSE_DISTANCE,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
