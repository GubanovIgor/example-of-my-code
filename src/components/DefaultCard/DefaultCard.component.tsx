import { COLORS, GUTTER_SIZE, TEXT_VARIANTS } from 'config/theme';
import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  content: string | ReactNode;
}

const getContentRenderer = (content: string | ReactNode) => {
  if (typeof content === 'string')
    return (
      <Text style={[TEXT_VARIANTS.font12, styles.content]}>{content}</Text>
    );

  return content;
};

export const DefaultCard: FC<Props> = ({ content }) => {
  const renderContent = getContentRenderer(content);

  return <View style={styles.container}>{renderContent}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.TERTIARY,
    borderRadius: 12,
    paddingHorizontal: GUTTER_SIZE * 4,
    paddingVertical: GUTTER_SIZE * 3,
  },
  content: { textTransform: 'none' },
});
