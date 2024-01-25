import React, { FC, ReactNode, useState } from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import ArrowToBottomIcon from 'assets/icons/arrowToBottom.svg';
import ArrowToTopIcon from 'assets/icons/arrowToTop.svg';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import { Separator } from 'components/Separator';

import { styles } from './CollapsibleCard.styles';
import { getDescriptionRenderer, getStyles } from './CollapsibleCard.helpers';
import { Border } from './CollapsibleCard.types';

interface Props {
  title: string;
  renderCollapsible?: ReactNode;
  border?: Border;
  description?: string | ReactNode;
  containerStyleProp: ViewStyle;
  key: string;
}

export const CollapsibleCard: FC<Props> = ({
  title,
  border,
  renderCollapsible,
  description,
  containerStyleProp,
  key,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const containerStyle = getStyles(border);

  const onPress = () => {
    setIsCollapsed((prevValue) => !prevValue);
  };

  const renderDescription = getDescriptionRenderer(description);

  return (
    <View style={[containerStyle, containerStyleProp]} key={key}>
      <Pressable onPress={onPress} style={styles.titleContainer}>
        <Text
          style={[
            TEXT_VARIANTS.font18Bold,
            isCollapsed ? styles.title : styles.activeTitle,
          ]}
        >
          {title}
        </Text>
        {isCollapsed ? (
          <ArrowToBottomIcon
            fill={isCollapsed ? COLORS.TEXT_GRAY : COLORS.TEXT_LIGHT}
          />
        ) : (
          <ArrowToTopIcon />
        )}
      </Pressable>

      {Boolean(!isCollapsed && renderCollapsible) && (
        <View style={styles.collapsibleView}>
          {renderDescription}
          {renderCollapsible}
          {border !== 'bottom' && <Separator stylesProp={styles.separator} />}
        </View>
      )}
    </View>
  );
};
