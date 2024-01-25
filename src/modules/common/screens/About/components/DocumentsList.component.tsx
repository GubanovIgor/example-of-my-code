import { TEXT_VARIANTS } from 'config/theme';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import { openLink } from 'core/utils';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { useLocalisationStore } from 'store/localisationStore';

import { getDocs } from './DocumentsList.helpers';
import { styles } from './DocumentsList.styles';
import { IDoc } from './DocumentsList.types';

const getDocItemRenderer =
  (
    getDocPressHandler: (link: string) => VoidFunction,
    t: GetTranslationValue,
  ) =>
  (item: IDoc) => {
    const onPress = getDocPressHandler(item.link);
    return (
      <Pressable
        style={styles.itemContainer}
        onPress={onPress}
        key={item.titleKey}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[TEXT_VARIANTS.font14, styles.docName]}
        >
          {t(item.titleKey)}
        </Text>
      </Pressable>
    );
  };

export const DocumentsList: FC = () => {
  const { t } = useTranslation();

  const { currentLanguage } = useLocalisationStore();

  const getDocPressHandler = useCallback(
    (link: string) => () => {
      openLink(link);
    },
    [],
  );

  const docs = getDocs(currentLanguage.key);

  const renderDocItem = getDocItemRenderer(getDocPressHandler, t);

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={[TEXT_VARIANTS.font14Bold, styles.title]}>
          {t('DOCUMENTS')}
        </Text>
      </View>
      {docs?.map(renderDocItem)}
    </View>
  );
};
