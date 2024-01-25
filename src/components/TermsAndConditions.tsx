import { SPACING, TEXT_VARIANTS } from 'config/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { PATHS } from 'constants/PATHS';
import { SCREEN_WIDTH } from 'constants/DIMENSIONS';
import {
  TERMS_AND_CONDITIONS_ANDROID,
  TERMS_AND_CONDITIONS_IOS,
} from 'constants/TERMS_AND_CONDITIONS';

export const TermsAndConditions = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const source =
    Platform.OS === 'ios'
      ? TERMS_AND_CONDITIONS_IOS
      : { uri: TERMS_AND_CONDITIONS_ANDROID };

  const onLinkPress = () => {
    navigation.navigate(PATHS.PDF_VIEWER, {
      source,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[TEXT_VARIANTS.font10, styles.text]}>
        {t('CONFIRM_ADULT_SEND_NEWS')}
      </Text>
      <TouchableOpacity onPress={onLinkPress}>
        <Text style={[TEXT_VARIANTS.font10, styles.text, styles.link]}>
          {t('GENERAL_TERMS_AND_CONDITIONS')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - SPACING.M * 2 - 24,
    paddingLeft: SPACING.S,
  },
  text: {
    lineHeight: 15,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
