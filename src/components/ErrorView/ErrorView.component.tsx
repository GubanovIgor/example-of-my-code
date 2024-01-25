import React, { FC } from 'react';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import { ScrollView, Text, View } from 'react-native';
import { TEXT_VARIANTS } from 'config/theme';

import { Button } from '../Button';
import FetchErrorImg from '../../assets/icons/fetchError.svg';
import { styles } from './ErrorView.styles';

interface Props {
  onRefresh: VoidFunction;
  t: GetTranslationValue;
  hideButton?: boolean;
  errorMsg?: string;
  showBtnLoader?: boolean;
}
export const ErrorView: FC<Props> = ({
  onRefresh,
  errorMsg,
  t,
  hideButton = false,
  showBtnLoader = false,
}) => (
  <ScrollView contentContainerStyle={styles.container}>
    <FetchErrorImg />
    <Text
      numberOfLines={3}
      ellipsizeMode="tail"
      style={[TEXT_VARIANTS.font14, styles.errorMsg]}
    >
      {errorMsg}
    </Text>
    {!hideButton && (
      <View style={styles.refreshBtn}>
        <Button
          isLoading={showBtnLoader}
          onPress={onRefresh}
          text={t('REFRESH')}
        />
      </View>
    )}
  </ScrollView>
);
