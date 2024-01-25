import React, { FC } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoadingView } from '../../../../components';
import { styles } from './GameSession.styles';
import { GameSessionPresenterProps } from './GameSession.types';

export const GameSessionPresenter: FC<GameSessionPresenterProps> = ({
  gameData,
}) => {
  const { loadInfo = '' } = gameData?.gameSession || {};
  const { top } = useSafeAreaInsets();
  const containerStyles = {
    top: top,
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <WebView
        startInLoadingState
        renderLoading={() => <LoadingView />}
        containerStyle={styles.webViewStyle}
        style={styles.webViewContainerStyle}
        source={{ uri: loadInfo || '' }}
      />
    </View>
  );
};
