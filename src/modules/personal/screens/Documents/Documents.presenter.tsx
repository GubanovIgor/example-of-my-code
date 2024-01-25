import { TEXT_VARIANTS } from 'config/theme';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import React, { FC } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';

import { styles } from './Documents.styles';
import { IDoc } from './Documents.types';

interface Props {
  docs: IDoc[];
  getDocPressHandler: (link: string) => VoidFunction;
  t: GetTranslationValue;
}

const getDocItemRenderer =
  (
    getDocPressHandler: (link: string) => VoidFunction,
    t: GetTranslationValue,
  ) =>
  (item: IDoc) => {
    const onPress = getDocPressHandler(item.link);
    return (
      <Pressable onPress={onPress} key={item.titleKey}>
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

export const DocumentsPresenter: FC<Props> = ({
  docs,
  getDocPressHandler,
  t,
}) => {
  const renderDocItem = getDocItemRenderer(getDocPressHandler, t);

  return (
    <ScrollView style={styles.container}>{docs?.map(renderDocItem)}</ScrollView>
  );
};
