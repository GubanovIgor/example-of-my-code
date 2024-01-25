import React, { RefObject } from 'react';
import { View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { LoadingView } from 'components/LoadingView';
import { ErrorView } from 'components/ErrorView';
import { GetTranslationValue } from 'core/interfaces';

import { styles } from './WebView.styles';

interface Props {
  uri: string;
  t: GetTranslationValue;
  onNavigationStateChange?: (value: WebViewNavigation) => void;
  webViewRef: RefObject<WebView<{}>>;
  isError: boolean;
  onRefresh: () => void;
  onError: () => void;
}

export const WebViewPresenter = ({
  uri,
  t,
  isError = false,
  onNavigationStateChange,
  webViewRef,
  onRefresh,
  onError,
}: Props) => {
  if (isError) {
    return (
      <ErrorView
        onRefresh={onRefresh}
        t={t}
        errorMsg={t('SOMETHING_WENT_WRONG')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        onNavigationStateChange={onNavigationStateChange}
        startInLoadingState
        renderLoading={() => <LoadingView />}
        containerStyle={styles.webViewStyle}
        style={styles.webViewContainerStyle}
        source={{ uri }}
        onError={onError}
        ref={webViewRef}
      />
    </View>
  );
};
