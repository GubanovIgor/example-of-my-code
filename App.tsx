import React, { useEffect, useState } from 'react';
import { CustomGlobalModal } from 'components/CustomGlobalModal';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { useBranchSettingsStore } from 'store/branchSettingsStore';
import { useUserStore } from 'store/userStore';
import { useAuthStore } from 'store/authStore';
import { useNetwork } from 'core/hooks';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { MaintenanceUpdateWrapper } from 'components/MaintenanceUpdateWrapper';
import { StatusBar, LogBox } from 'react-native';
import codePush from 'react-native-code-push';
import { PushNotificationsWrapper } from 'components/PushNotificationsWrapper';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

import { RootNavigation } from './src/core/navigation/RootNavigation';
import { getClientEnvironment } from './src/relay';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTimePlugin);
//Warnings are appearing when push notifications are enabled on iOS Simulator, turning them off
LogBox.ignoreLogs(['messaging/unregistered', 'messaging_ios_auto']);

const clientEnv = getClientEnvironment();

const CODE_PUSH_OPTIONS = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};

const App = () => {
  useNetwork();
  const { getBranchSettings } = useBranchSettingsStore();
  const { getUserAccount, isError } = useUserStore();
  const [isInitialUserRequestSent, setIsInitialUserRequestSent] =
    useState(false);

  const { loginState } = useAuthStore((state) => ({
    loginState: state.loginState,
  }));

  useEffect(() => {
    getBranchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loginState?.accessToken && (!isInitialUserRequestSent || isError)) {
      getUserAccount();
      setIsInitialUserRequestSent(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isInitialUserRequestSent, loginState?.accessToken]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <PushNotificationsWrapper>
        <MaintenanceUpdateWrapper>
          <RelayEnvironmentProvider environment={clientEnv}>
            <RootNavigation />
            <CustomGlobalModal />
          </RelayEnvironmentProvider>
          <Toasts />
        </MaintenanceUpdateWrapper>
      </PushNotificationsWrapper>
    </SafeAreaProvider>
  );
};

export default codePush(CODE_PUSH_OPTIONS)(App);
