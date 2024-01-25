import { COLORS } from 'config/theme';
import { Alert, Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export const openLink = async (url: string) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'popover',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: COLORS.LIGHT_BACKGROUND,
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
      });
    } else Linking.openURL(url);
  } catch (error) {
    //@ts-ignore
    Alert.alert(error?.message || '');
  }
};
