import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'core/interfaces/navigation';
import React, { useRef, useState } from 'react';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useTranslation } from 'react-i18next';

import { PATHS } from 'constants/PATHS';

import { WebViewPresenter } from './WebView.presenter';

export const WebViewContainer = ({
  route,
}: RootStackScreenProps<PATHS.WEB_VIEW>) => {
  const webViewRef = useRef<WebView>(null);
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const onRefresh = () => {
    setIsError(false);
    webViewRef?.current?.reload();
  };

  const onError = () => {
    setIsError(true);
  };

  const onNavigationStateChange = (webViewNavigation: WebViewNavigation) => {
    const { url } = webViewNavigation || {};
    if (!url?.includes('open=depositSuccess')) return;

    navigation.pop();
    navigation.navigate(PATHS.DEPOSIT_SUCCESS);
  };

  return (
    <BottomSheetWrapper
      shouldHaveDraggableLine={false}
      shouldHaveHeader={false}
      screenKey={PATHS.WEB_VIEW}
    >
      <WebViewPresenter
        uri={route.params.uri}
        onNavigationStateChange={onNavigationStateChange}
        webViewRef={webViewRef}
        t={t}
        onRefresh={onRefresh}
        onError={onError}
        isError={isError}
      />
    </BottomSheetWrapper>
  );
};
